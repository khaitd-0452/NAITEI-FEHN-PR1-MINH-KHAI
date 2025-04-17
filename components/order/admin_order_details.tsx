"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Address, Order, OrderItem, Product, User } from "@/lib/types";
import {
  formatVndThousands,
  statusStyle,
  translateOrderStatusTS,
} from "@/lib/utils";
import Image from "next/image";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

type OrderDetailsData = Order & {
  address: Address;
  orderItems: OrderItem[];
  user: User;
};
interface AdminOrderDetailsProps {
  orderId: string;
  triggerButton?: React.ReactNode;
  onUpdate?: () => void;
}

export default function AdminOrderDetails({
  orderId,
  triggerButton,
  onUpdate,
}: AdminOrderDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [orderData, setOrderData] = useState<OrderDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isOpen && orderId && !orderData) {
      const fetchDetails = async () => {
        setIsLoading(true);
        setError(null);
        setOrderData(null);
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_API_URL}/orders/${orderId}?_expand=address&_expand=user&_embed=order_items` // <<< Thêm _expand=user
          );

          if (!res.data || !res.data.id) {
            throw new Error(`Không tìm thấy đơn hàng với ID ${orderId}.`);
          }

          const rawOrderData = res.data;
          const embeddedItems = rawOrderData.order_items || [];

          const productFetchPromises = embeddedItems.map(
            async (item: any): Promise<OrderItem | null> => {
              let fetchedProductData: Product | null = null;
              try {
                const productRes = await axios.get(
                  `${process.env.NEXT_PUBLIC_SERVER_API_URL}/products/${item.productId}`
                );
                if (productRes.data) {
                  const rawProduct = productRes.data;
                  fetchedProductData = {
                    id: rawProduct.id,
                    name: rawProduct.name,
                    image:
                      rawProduct.images?.[0]?.url || "/images/placeholder.jpg",
                    price: rawProduct.price,
                    description: rawProduct.description || "",
                    color: rawProduct.color || "",
                    productInfo: rawProduct.product_info || "",
                    size: rawProduct.size || "",
                    tags: rawProduct.tags || [],
                    point: rawProduct.point || 0,
                    highlights: rawProduct.highlights || "",
                    category: rawProduct.category || "",
                    subCategory: rawProduct.sub_category || "",
                    createdAt: rawProduct.created_at || "",
                    updatedAt: rawProduct.updated_at || "",
                    stock: rawProduct.stock || 0,
                  };
                }
              } catch (productError) {
                console.error(
                  `Lỗi khi tải sản phẩm ${item.productId}:`,
                  productError
                );
                return null;
              }
              return {
                id: item.id,
                productId: item.productId,
                orderId: item.orderId,
                quantity: item.quantity,
                createdAt: item.created_at,
                updatedAt: item.updated_at,
                product: fetchedProductData!,
              };
            }
          );

          const orderItemsWithProducts = (
            await Promise.all(productFetchPromises)
          ).filter((item) => item !== null) as OrderItem[];

          const total_price = orderItemsWithProducts.reduce(
            (acc, item) => acc + (item.product?.price || 0) * item.quantity,
            0
          );

          const finalData: OrderDetailsData = {
            id: rawOrderData.id as string,
            code: rawOrderData.id.slice(0, 8).toUpperCase(),
            date: rawOrderData.created_at,
            quantity: orderItemsWithProducts.length,
            total: formatVndThousands(total_price),
            stt: "N/A",
            status: rawOrderData.status,
            paymentMethod: rawOrderData.payment_method as string,
            detailUrl: `/orders/${rawOrderData.id}`,
            address: rawOrderData.address as Address,
            orderItems: orderItemsWithProducts,
            user: rawOrderData.user as User,
          };

          setOrderData(finalData);
        } catch (err: any) {
          console.error("Lỗi khi tải chi tiết đơn hàng:", err);
          setError(err.message || "Không thể tải chi tiết đơn hàng.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchDetails();
    }
  }, [isOpen, orderId, orderData]);

  const handleStatusUpdate = async (newStatus: "shipped" | "cancelled") => {
    if (!orderData) return;
    setIsUpdating(true);
    setError(null);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}/orders/${orderId}`,
        {
          status: newStatus,
        }
      );
      setOrderData((prev) => (prev ? { ...prev, status: newStatus } : null));
      onUpdate?.();
      toast.success(`Cập nhật trạng thái thành công!`);
    } catch (err: any) {
      console.error(`Lỗi cập nhật trạng thái thành ${newStatus}:`, err);
      setError(
        `Lỗi cập nhật trạng thái: ${err.message || "Lỗi không xác định"}`
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const canCancel = orderData?.status === "pending";
  const canApprove = orderData?.status === "pending";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {/* Use provided trigger or default button */}
        {triggerButton || (
          <Button variant="outline" size="sm">
            Xem chi tiết
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl md:max-w-4xl  max-h-[90vh] ">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Chi tiết Đơn hàng #
            {orderData?.code || orderId.slice(0, 8).toUpperCase()}
          </DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết và quản lý trạng thái đơn hàng.
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2">Đang tải dữ liệu...</span>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex flex-col justify-center items-center h-64 text-destructive">
            <AlertCircle className="h-8 w-8 mb-2" />
            <span>{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="mt-4"
            >
              Đóng
            </Button>
          </div>
        )}

        {orderData && !isLoading && !error && (
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm border-b pb-4">
              <div>
                <span className="font-medium w-32 inline-block">
                  Mã đơn hàng:
                </span>{" "}
                {orderData.code}
              </div>
              <div>
                <span className="font-medium w-32 inline-block">Ngày đặt:</span>{" "}
                {new Date(orderData.date).toLocaleDateString("vi-VN")}
              </div>
              <div>
                <span className="font-medium w-32 inline-block">
                  Trạng thái:
                </span>{" "}
                <span className={statusStyle(orderData.status)}>
                  {translateOrderStatusTS(orderData.status)}
                </span>
              </div>
              <div>
                <span className="font-medium w-32 inline-block">
                  Thanh toán:
                </span>{" "}
                {orderData.paymentMethod}
              </div>
              <div className="sm:col-span-2">
                <span className="font-medium w-32 inline-block">
                  Tổng tiền:
                </span>{" "}
                <span className="font-bold text-lg text-red-600">
                  {orderData.total}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-x-4 gap-y-2 text-sm ">
              <div className="text-sm border-b pb-4">
                <h3 className="text-lg font-semibold mb-2">
                  Địa chỉ giao hàng
                </h3>
                <div className="space-y-1">
                  <p>
                    <span className="inline-block w-24 font-medium">
                      Họ tên:
                    </span>{" "}
                    {orderData.address.first_name} {orderData.address.last_name}
                  </p>
                  <p>
                    <span className="inline-block w-24 font-medium">
                      Điện thoại:
                    </span>{" "}
                    {orderData.address.phone}
                  </p>
                  {orderData.address.company && (
                    <p>
                      <span className="inline-block w-24 font-medium">
                        Công ty:
                      </span>{" "}
                      {orderData.address.company}
                    </p>
                  )}
                  <p>
                    <span className="inline-block w-24 font-medium align-top">
                      Địa chỉ:
                    </span>
                    <span className="inline-block max-w-[calc(100%-6rem)]">
                      {`${orderData.address.address}, ${orderData.address.city}, ${orderData.address.country}, ${orderData.address.zipcode}`}
                    </span>
                  </p>
                </div>
              </div>
              <div className="text-sm border-b pb-4">
                <h3 className="text-lg font-semibold mb-2">
                  Thông tin khách hàng
                </h3>
                <div className="space-y-1">
                  <p>
                    <span className="inline-block w-24 font-medium">
                      Họ tên:
                    </span>{" "}
                    {orderData.user.full_name}
                  </p>
                  <p>
                    <span className="inline-block w-24 font-medium">
                      Email:
                    </span>{" "}
                    {orderData.user.email}
                  </p>
                  <p>
                    <span className="inline-block w-24 font-medium">
                      Username:
                    </span>{" "}
                    {orderData.user.username}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Sản phẩm đã đặt</h3>
              <Table className="block w-full border-collapse border border-gray-200 rounded-md">
                <TableHeader className="block w-full">
                  <TableRow className="sticky top-0 flex w-full bg-gray-100 hover:bg-gray-100 text-xs uppercase text-muted-foreground z-10 border-b">
                    <TableHead className="w-24 flex-shrink-0 pl-4 py-2 border-r">
                      Ảnh
                    </TableHead>
                    <TableHead className="flex-grow px-2 py-2 border-r">
                      Tên sản phẩm
                    </TableHead>
                    <TableHead className="w-28 flex-shrink-0 text-right px-2 py-2 border-r">
                      Giá
                    </TableHead>
                    <TableHead className="w-[90px] flex-shrink-0 text-center px-2 py-2 border-r">
                      SL
                    </TableHead>
                    <TableHead className="w-[130px] flex-shrink-0 text-right pr-4 py-2">
                      Thành tiền
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="block w-full max-h-[200px] overflow-y-auto text-sm">
                  {orderData.orderItems.map((item) => {
                    const lineTotal =
                      item.quantity * (item.product?.price || 0);
                    const image =
                      item.product?.image || "/images/placeholder.jpg";

                    return (
                      <TableRow
                        key={item.id}
                        className="flex w-full hover:bg-muted/50 border-b last:border-b-0"
                      >
                        <TableCell className="w-24 flex-shrink-0 pl-4 py-2 border-r flex items-center justify-center">
                          <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden border">
                            <Image
                              src={image}
                              width={64}
                              height={64}
                              alt={item.product?.name ?? "Ảnh sản phẩm"}
                              className="object-cover w-full h-full"
                              onError={(e) =>
                                (e.currentTarget.src =
                                  "/images/placeholder.jpg")
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell className="flex-grow px-2 py-2 border-r font-medium flex items-center">
                          {item.product?.name ?? "Sản phẩm không tồn tại"}
                        </TableCell>
                        <TableCell className="w-28 flex-shrink-0 text-right px-2 py-2 border-r flex items-center justify-end">
                          {formatVndThousands(item.product?.price || 0)}
                        </TableCell>
                        <TableCell className="w-[90px] flex-shrink-0 text-center px-2 py-2 border-r flex items-center justify-center">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="w-[130px] flex-shrink-0 text-right pr-4 py-2 font-semibold flex items-center justify-end">
                          {formatVndThousands(lineTotal)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        <DialogFooter className="mt-6 gap-2 flex-wrap justify-end">
          {error && isUpdating && (
            <p className="text-sm text-destructive text-left w-full">{error}</p>
          )}
          {orderData && canApprove && (
            <Button
              variant="default"
              size="sm"
              onClick={() => handleStatusUpdate("shipped")}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Xác nhận đơn hàng
            </Button>
          )}
          {orderData && canCancel && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleStatusUpdate("cancelled")}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Hủy đơn
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(false)}
            disabled={isUpdating}
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

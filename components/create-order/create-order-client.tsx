"use client";

import { Address, Cart } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { formatVndThousands } from "@/lib/utils";
import { FaCartShopping, FaSdCard } from "react-icons/fa6";
import Image from "next/image";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMemo, useReducer, useState } from "react";
import { Label } from "../ui/label";
import { FaCreditCard, FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { AlertTriangle, Check, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
export default function CreateOrderClient({
  carts,
  addresses,
}: {
  carts: Cart[];
  addresses: Address[];
}) {
  const { currentUser } = useAuth();
  const noAddresses = addresses.length === 0;
  const [address, setAddress] = useState<Address | null>(() => {
    if (noAddresses) return null;
    const defaultAddress = addresses.find((address) => address.default);
    return defaultAddress ? defaultAddress : addresses[0];
  });

  const [addressPicked, setAddressPicked] = useState(() => {
    const defaultAddress = addresses.find((address) => address.default);
    return defaultAddress ? defaultAddress : addresses[0];
  });
  const totalPrice = useMemo(() => {
    return carts.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }, [carts]);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Thanh toán tại quầy");

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onPurchase = async () => {
    if (!address) {
      toast.error("Vui lòng chọn hoặc thêm địa chỉ giao hàng.", {
        icon: <AlertTriangle className="text-red-500" />,
      });
      console.error("Address not selected or available");
      return;
    }
    if (carts.length === 0) {
      console.error("Cart is empty");
      return;
    }

    setIsLoading(true);

    const now = new Date().toISOString();

    const orderPayload = {
      addressId: address.id,
      payment_method: paymentMethod,
      total_price: totalPrice,
      status: "pending",
      created_at: now,
      updated_at: now,
      userId: currentUser.id,
      id: uuid(),
    };

    let createdOrder;

    try {
      const orderRes = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}/orders`,
        orderPayload
      );

      if (!orderRes.data || !orderRes.data.id) {
        throw new Error("Failed to create order: No ID received.");
      }
      createdOrder = orderRes.data;
      const orderId = createdOrder.id;

      console.log("Order created:", createdOrder);

      const orderItemPromises = carts.map((item) => {
        const itemPayload = {
          orderId: orderId,
          productId: item.productId,
          quantity: item.quantity,
          created_at: now,
          updated_at: now,
        };
        return axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_API_URL}/order_items`,
          itemPayload
        );
      });

      const cartPromises = carts.map((item) => {
        return axios.delete(
          `${process.env.NEXT_PUBLIC_SERVER_API_URL}/carts/${item.id}`
        );
      });

      await Promise.all(orderItemPromises);

      await Promise.all(cartPromises);

      console.log("Order items created successfully for order:", orderId);
      toast(" Đơn hàng đã được đặt thành công🎊🎊🎊", {
        style: {
          background: "green",
          color: "#fff",
        },
        icon: <CheckCircle className="text-white" />,
      });

      router.push(`/order/${orderId}`);
    } catch (error) {
      console.error("Error creating order or order items:", error);

      if (axios.isAxiosError(error)) {
        console.error(
          "Axios error details:",
          error.response?.status,
          error.response?.data
        );
      } else {
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="border p-6 text-sm">
        <h2 className="text-xl flex gap-2 items-center font-semibold mb-3 ">
          <FaMapMarkerAlt />
          <span>Địa chỉ giao hàng</span>
        </h2>
        {noAddresses ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex items-center gap-2 text-yellow-700">
              <AlertTriangle className="h-5 w-5" />
              <span>Bạn chưa có địa chỉ nào. Vui lòng thêm địa chỉ.</span>
            </div>
            <Link href="/addresses?redirect=/checkout">
              {" "}
              <Button variant="default" size="sm">
                Thêm địa chỉ mới
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-2 justify-between items-center ">
            {address ? (
              <div className="flex flex-wrap gap-x-2 items-center mb-2 text-base sm:text-lg">
                <span className="font-semibold">
                  {address.first_name + " " + address.last_name}
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-muted-foreground">{address.phone}</span>
                <span className="text-gray-400 hidden sm:inline">|</span>
                <span className="text-muted-foreground w-full sm:w-auto mt-1 sm:mt-0">
                  {`${address.address}, ${address.city}, ${address.country}`}
                  {address.zipcode && `, ${address.zipcode}`}
                </span>
                {address.default && (
                  <div className="border border-yellow-500 text-yellow-700 text-xs font-medium inline-flex items-center px-2 py-0.5 rounded ml-2">
                    Mặc định
                  </div>
                )}
              </div>
            ) : (
              <span className="text-muted-foreground">
                Vui lòng chọn địa chỉ
              </span>
            )}
            <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Thay đổi
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Chọn địa chỉ giao hàng</DialogTitle>
                  <DialogDescription>
                    Chọn địa chỉ bạn muốn sử dụng từ danh sách bên dưới.
                  </DialogDescription>
                </DialogHeader>
                <RadioGroup
                  defaultValue={address?.id}
                  onValueChange={(value) => {
                    const selectedAddress = addresses.find(
                      (addr) => addr.id === value
                    );
                    if (selectedAddress) {
                      setAddressPicked(selectedAddress);
                    }
                  }}
                  className="max-h-[400px] overflow-y-auto space-y-2 p-1"
                >
                  {addresses.map((addr) => (
                    <Label
                      key={addr.id}
                      htmlFor={addr.id}
                      className={`flex items-start gap-3 p-3 border rounded-md cursor-pointer hover:bg-muted/50 ${
                        addressPicked?.id === addr.id
                          ? "border-primary bg-muted/50"
                          : ""
                      }`}
                    >
                      <RadioGroupItem
                        value={addr.id}
                        id={addr.id}
                        className="mt-1"
                      />
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">
                          {`${addr.first_name} ${addr.last_name} | ${addr.phone}`}
                          {addr.default && (
                            <span className="ml-2 text-xs text-yellow-600">
                              (Mặc định)
                            </span>
                          )}
                        </p>
                        <p className="text-muted-foreground">
                          {`${addr.address}, ${addr.city}, ${addr.country}`}
                          {addr.zipcode && `, ${addr.zipcode}`}
                        </p>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>

                <DialogFooter>
                  <Button
                    onClick={() => {                      if (addressPicked) {
                        setAddress(addressPicked);
                      }
                      setPickerOpen(false);
                    }}
                  >
                    Xác nhận
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
      <div className="p-6 border">
        <h2 className="text-xl flex gap-2 items-center font-semibold mb-3 ">
          <FaCartShopping />
          <span>Sản phẩm đã chọn</span>
        </h2>
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50  uppercase text-muted-foreground">
                <TableHead className="w-20 pl-4">Ảnh</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead className="text-right">Giá</TableHead>
                <TableHead className="text-center w-[90px]">Số lượng</TableHead>
                <TableHead className="text-right pr-4 w-[130px]">
                  Thành tiền
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-sm">
              {carts.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Không có sản phẩm nào trong giỏ hàng.
                  </TableCell>
                </TableRow>
              )}
              {carts.map((item) => {
                const lineTotal = item.quantity * item.product.price;
                const image = item.product.image;

                const number = parseInt(
                  image.split("/").pop()?.split(".")[0] ?? "0"
                );
                const isImageValid =
                  !isNaN(number) && number <= 15 && number > 0;

                return (
                  <TableRow key={item.id} className="hover:bg-muted/50 h-52">
                    <TableCell className="pl-4 py-2 ">
                      <div className="relative w-14 h-14 sm:w-40 sm:h-40 bg-gray-100 rounded overflow-hidden border">
                        <Image
                          src={isImageValid ? image : "/images/13.jpg"}
                          width={100}
                          height={100}
                          alt={item.product?.name ?? "Ảnh sản phẩm"}
                          className="object-cover w-40 h-40"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium py-2">
                      {item.product?.name ?? "Sản phẩm không xác định"}
                    </TableCell>
                    <TableCell className="text-right py-2">
                      {formatVndThousands(item.product.price)}
                    </TableCell>
                    <TableCell className="text-center py-2">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right font-semibold pr-4 py-2">
                      {formatVndThousands(lineTotal)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="p-6 flex gap-4 items-center border">
        <h2 className="text-xl flex gap-2 mr-2 items-center font-semibold ">
          <FaCreditCard />
          <span>Phương thức thanh toán</span>
        </h2>

        <Button
          variant={
            paymentMethod == "Thanh toán tại quầy" ? "default" : "secondary"
          }
          onClick={() => setPaymentMethod("Thanh toán tại quầy")}
        >
          Thanh toán tại quầy
        </Button>
        <Button
          variant={
            paymentMethod != "Thanh toán tại quầy" ? "default" : "secondary"
          }
          onClick={() => setPaymentMethod("Thanh toán trực tuyến")}
        >
          Thanh toán trực tuyến
        </Button>
      </div>
      <div className="p-6 border flex gap-4 items-center">
        <h2 className="text-xl flex gap-2 items-center font-semibold mb-3 ">
          Tổng số tiền:
          <span className="text-yellow-500 font-bold">
            {formatVndThousands(totalPrice)}
          </span>
        </h2>
        <Button
          onClick={onPurchase}
          disabled={isLoading || carts.length === 0} // Disable button while loading or if cart empty
          className="ml-auto bg-yellow-500 text-white text-lg disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xử lý...
            </>
          ) : (
            "Đặt hàng"
          )}
        </Button>
      </div>
    </>
  );
}

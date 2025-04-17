"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { formatVndThousands, translateOrderStatusTS } from "@/lib/utils";
import { Order, OrderWithUser, User } from "@/lib/types";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import AdminOrderDetails from "./admin_order_details";
import { useRouter } from "next/navigation";

export const clientOrderColumns: ColumnDef<OrderWithUser>[] = [
  {
    accessorKey: "stt",
    header: "STT",
    cell: ({ row }) => <div className="text-center">{row.getValue("stt")}</div>,
    size: 50,
  },
  {
    id: "orderInfo",
    header: "MÃ HÓA ĐƠN/NGÀY MUA HÀNG",
    cell: ({ row }) => {
      const order = row.original;

      let formattedDate = "Invalid Date";
      try {
        const dateObj = new Date(order.date);

        if (!isNaN(dateObj.getTime())) {
          formattedDate = dateObj.toLocaleTimeString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
        }
      } catch (error) {
        console.error("Error processing date:", order.date, error);
      }
      return (
        <div>
          <div className="font-medium">{order.code}</div>
          <div className="text-xs text-muted-foreground ml-2">
            {formattedDate}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-center">SỐ SP</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("quantity")}</div>
    ),
    size: 80,
  },
  {
    accessorKey: "total",
    header: () => <div className="text-left">TỔNG TIỀN</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">
        {formatVndThousands(row.getValue("total"))}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "TÌNH TRẠNG",
    cell: ({ row }) => {
      const originalStatus = row.getValue("status") as
        | string
        | null
        | undefined;

      const translatedStatus = translateOrderStatusTS(originalStatus);

      let statusClasses =
        "inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"; // Base badge styles
      const lowerCaseStatus = originalStatus?.toLowerCase();
      switch (lowerCaseStatus) {
        case "delivered":
          statusClasses +=
            " bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
          break;
        case "cancelled":
          statusClasses +=
            " bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
          break;
        case "shipped":
          statusClasses +=
            " bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
          break;
        case "pending":
          statusClasses +=
            " bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
          break;
        default:
          statusClasses +=
            " bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
          break;
      }

      return <span className={statusClasses}>{translatedStatus}</span>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">CHI TIẾT</div>,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="text-center">
          <Link
            href={order.detailUrl}
            className="text-blue-600 hover:underline text-xs font-medium"
          >
            Chi tiết
          </Link>
        </div>
      );
    },
    size: 100,
  },
];

export const adminOrderColumns: ColumnDef<OrderWithUser>[] = [
  {
    accessorKey: "stt",
    header: "STT",
    cell: ({ row }) => <div className="text-center">{row.getValue("stt")}</div>,
    size: 50,
  },
  {
    id: "orderInfo",
    header: "MÃ HÓA ĐƠN",
    cell: ({ row }) => {
      const order = row.original;

      return <div className="font-medium">{order.code}</div>;
    },
  },
  {
    accessorKey: "date",
    // Modify the header like this
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          variant="ghost"
          className={`cursor-pointer hover:bg-gray-200 ${
            isSorted ? "font-bold bg-gray-200" : "" // Conditionally add font-bold
          }`}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NGÀY MUA HÀNG
          {isSorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
          {isSorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {!isSorted && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;
      let formattedDate = "Invalid Date";
      try {
        const dateObj = new Date(order.date);

        if (!isNaN(dateObj.getTime())) {
          // Use toLocaleDateString for just the date part, which is better for display
          formattedDate = dateObj.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
        }
      } catch (error) {
        console.error("Error processing date:", order.date, error);
      }
      return <div className="text-muted-foreground">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "user.full_name",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          variant="ghost"
          className={`cursor-pointer hover:bg-gray-200 ${
            isSorted ? "font-bold bg-gray-200" : "" // Conditionally add font-bold
          }`}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NGƯỜI MUA HÀNG
          {isSorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
          {isSorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {!isSorted && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;
      return <div className="lowercase">{order.user.full_name}</div>;
    },
  },
  {
    accessorKey: "paymentMethod",
    header: () => <div className="text-left">PHƯƠNG THỨC THANH TOÁN</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("paymentMethod")}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          className={`cursor-pointer hover:bg-gray-200 ${
            isSorted ? "font-bold bg-gray-200" : "" // Conditionally add font-bold
          }`}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SỐ SP
          {isSorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
          {isSorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {!isSorted && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("quantity")}</div>
    ),
    size: 80,
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          variant="ghost"
          className={`cursor-pointer hover:bg-gray-200 ${
            isSorted ? "font-bold bg-gray-200" : "" // Conditionally add font-bold
          }`}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TỔNG TIỀN
          {isSorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
          {isSorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {!isSorted && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-left font-medium">
        {formatVndThousands(row.getValue("total"))}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "TÌNH TRẠNG",
    cell: ({ row }) => {
      const originalStatus = row.getValue("status") as
        | string
        | null
        | undefined;

      const translatedStatus = translateOrderStatusTS(originalStatus);

      let statusClasses =
        "inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"; // Base badge styles
      const lowerCaseStatus = originalStatus?.toLowerCase();
      switch (lowerCaseStatus) {
        case "delivered":
          statusClasses +=
            " bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
          break;
        case "cancelled":
          statusClasses +=
            " bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
          break;
        case "shipped":
          statusClasses +=
            " bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
          break;
        case "pending":
          statusClasses +=
            " bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
          break;
        default:
          statusClasses +=
            " bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
          break;
      }

      return <span className={statusClasses}>{translatedStatus}</span>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Hành động</div>,
    cell: ({ row }) => {
      const order = row.original;
      const router = useRouter(); // <<< Lấy router instance

      // Hàm callback để refresh dữ liệu sau khi cập nhật thành công
      const handleOrderUpdate = () => {
        console.log("Order updated, refreshing list...");
        router.refresh(); // <<< Gọi refresh để lấy lại dữ liệu từ server
      };

      return (
        <div className="text-center">
          {/* Render component dialog và truyền props */}
          <AdminOrderDetails
            orderId={order.id as string}
            onUpdate={handleOrderUpdate}
          />
        </div>
      );
    },
    size: 120, // Tăng kích thước cột nếu cần
  },
];

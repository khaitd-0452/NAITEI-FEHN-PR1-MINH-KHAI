import React from "react";
import axios from "axios";
import { Order, User } from "@/lib/types";
import { OrderList } from "@/components/order/order-list";
import {
  adminOrderColumns,
  clientOrderColumns,
} from "@/components/order/column";
interface OrderWithUser extends Order {
  user: User;
}

async function getOrders(): Promise<OrderWithUser[]> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/orders?_embed=order_items&_expand=user`
    );
    const ordersData = res.data.map(
      (order: any, index: number) =>
        ({
          id: order.id as string,
          code: order.id.slice(0, 8).toUpperCase(),
          date: order.created_at,
          quantity: order.order_items.length,
          total: order.total_price,
          status: order.status,
          paymentMethod: order.payment_method as string,
          stt: (index + 1).toString(),
          detailUrl: `/order/${order.id}`,
          user: {
            id: order.user.id,
            full_name: order.user.full_name,
            email: order.user.email,
            username: order.user.username,
            role: order.user.role,
            createdAt: order.user.created_at,
            updatedAt: order.user.updated_at,
          }
        } as OrderWithUser)
    );
    return ordersData;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
}

export default async function OrderPage() {
  const initialOrders = await getOrders();
  return (
    <div className="p-6 md:p-8 lg:p-10 space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">
          Wine Hourse - Quản lý đơn hàng
        </h1>
      </div>

      <div className="w-full lg:flex-1">
        <OrderList initialOrders={initialOrders} columns={adminOrderColumns} />
      </div>
    </div>
  );
}

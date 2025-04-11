"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface MarkAsDeliveredButtonProps {
  orderId: string;
  currentStatus: string;
}

export function MarkAsDeliveredButtonClient({
  orderId,
  currentStatus,
}: MarkAsDeliveredButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const canMarkDelivered = currentStatus === "shipped";

  const handleMarkDelivered = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}/orders/${orderId}`,
        {
          status: "delivered",
          updated_at: new Date().toISOString(),
        }
      );

      if (response.status === 200 || response.status === 204) {
        console.log(`Order ${orderId} marked as delivered (Client).`);
        router.refresh();
        toast.success("Đã cập nhật trạng thái thành Đã giao hàng!", {
          style: {
            background: "green",
            color: "#fff",
          },
          icon: <CheckCircle className="text-white" />,
        });
      } else {
        throw new Error(`API responded with status ${response.status}`);
      }
    } catch (error) {
      console.error(
        `Failed to mark order ${orderId} as delivered (Client):`,
        error
      );
      let errorMessage = "Đã xảy ra lỗi khi cập nhật trạng thái.";
      if (axios.isAxiosError(error)) {
        errorMessage = `Lỗi API: ${
          error.response?.data?.message || error.message
        }`;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!canMarkDelivered) {
    return null;
  }

  return (
    <Button
      onClick={handleMarkDelivered}
      disabled={isLoading}
      aria-disabled={isLoading}
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Đang cập nhật...
        </>
      ) : (
        "Đánh dấu Đã giao hàng"
      )}
    </Button>
  );
}

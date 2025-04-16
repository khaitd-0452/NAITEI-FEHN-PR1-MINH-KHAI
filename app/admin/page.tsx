import { ClipboardList, Package, Users } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AiFillProduct } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";

export default function Dashboard() {
  const adminSections = [
    {
      title: "Quản lý Người dùng",
      description: "Xem, tìm kiếm, phân quyền và quản lý tài khoản người dùng.",
      href: "/admin/user", // Đặt đường dẫn thực tế của bạn
      icon: HiOutlineUserGroup,
    },
    {
      title: "Quản lý Sản phẩm",
      description: "Thêm mới, chỉnh sửa, xóa và quản lý kho hàng sản phẩm.",
      href: "/admin/product", // Đặt đường dẫn thực tế của bạn
      icon: AiFillProduct,
    },
    {
      title: "Quản lý Đơn hàng",
      description: "Xem chi tiết, cập nhật trạng thái và xử lý đơn hàng.",
      href: "/admin/order", // Đặt đường dẫn thực tế của bạn
      icon: MdOutlineShoppingCart,
    },
  ];
  return (
    <div className="p-6 md:p-8 lg:p-10 space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">
          Chào mừng tới trang quản lý Wine Hourse
        </h1>
        <p className="text-muted-foreground mt-1">
          Quản lý cửa hàng rượu một cách hiệu quả.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Khu vực quản lý
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => (
            <Link
              href={section.href}
              key={section.title}
              className="group block"
            >
              <Card className="h-full transition-all duration-200 ease-in-out hover:shadow-lg hover:border-primary/50 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium text-gray-800 group-hover:text-primary transition-colors">
                    {section.title}
                  </CardTitle>
                  <section.icon
                    className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors"
                    aria-hidden="true"
                  />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

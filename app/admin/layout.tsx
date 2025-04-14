import type { Metadata } from "next";
import AdminSideBar from "@/components/layout/admin-sidebar";
export const metadata: Metadata = {
  title: "Drink House Admin",
  description: "Best Wine and Beer Store since 1899",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminSideBar />
      <main className=" mx-20 ml-34 pt-10 ">{children}</main>
    </>
  );
}

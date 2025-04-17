import type { Metadata } from "next";
import AdminSideBar from "@/components/layout/admin-sidebar";
import { getCurrentUserServer } from "@/lib/server-utils";
import { notFound } from "next/navigation";
export const metadata: Metadata = {
  title: "Drink House Admin",
  description: "Best Wine and Beer Store since 1899",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUserServer();
  if (!currentUser || currentUser.role !== "admin") {
    notFound();
  }

  return (
    <>
      <AdminSideBar />
      <main className=" mx-20 ml-34 pt-10 ">{children}</main>
    </>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drink House Admin",
  description: "Best Wine and Beer Store since 1899",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

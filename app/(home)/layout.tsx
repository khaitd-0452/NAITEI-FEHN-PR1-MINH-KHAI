import HomeHeader from "@/components/header/home-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drink House",
  description: "Best Wine and Beer Store since 1899",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HomeHeader />
      {children}
      <footer></footer>
    </>
  );
}

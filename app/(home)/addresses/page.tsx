import PageBreadCrumb from "@/components/layout/page_bread_crumb";
import React from "react";
import Image from "next/image";
import AddressesMain from "@/components/addresses/addresses-main";

export default function AddressPage() {
  return (
    <main className="container mx-auto max-w-[1200px] mt-6 mb-40 space-y-8 px-4 ">
      <PageBreadCrumb />
      <div className="flex flex-col w-full justify-start">
        <h2 className="text-xl md:text-2xl font-medium text-gray-700">
          ĐỊA CHỈ
        </h2>
        <Image
          src={"/images/titleleft-dark.png"}
          alt="title underline"
          width={200}
          height={100}
          className="w-[70px] mt-2 mb-4"
        />
        <AddressesMain />
      </div>
    </main>
  );
}

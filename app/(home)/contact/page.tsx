import PageBreadCrumb from "@/components/layout/page_bread_crumb";
import Image from "next/image";
import React from "react";

import ContactMain from "@/components/contact/contact-main";

export default function Contact() {
  return (
    <main className="container mx-auto max-w-[1200px] mt-6 mb-20 md:mb-40 space-y-8 px-4 ">
      <PageBreadCrumb />
      <div>
        <h1 className="text-3xl font-semibold">LIÊN HỆ</h1>
        <Image
          src={"/images/titleleft-dark.png"}
          alt="title underline"
          width={200}
          height={100}
          className="w-[70px] mt-1 mb-4"
        />
      </div>
      <ContactMain />
    </main>
  );
}

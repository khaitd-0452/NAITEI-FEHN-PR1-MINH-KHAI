import PageBreadCrumb from "@/components/layout/page_bread_crumb";
import Image from "next/image";
import React from "react";

export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-[1200px] mt-6 mb-40 space-y-8 px-4 ">
      <PageBreadCrumb />
      <div>
        <h1 className="text-3xl  ">GIỚI THIỆU</h1>
        <Image
          src={"/images/titleleft-dark.png"}
          alt="title underline"
          width={200}
          height={100}
          className="w-[70px] mt-1 mb-4"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-x-4 gap-y-8 ">
        <div className="flex-1 pr-10">
          <Image
            src={"/images/grape.jpg"}
            alt="title underline"
            width={200}
            height={100}
            className="w-full object-cover h-auto"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl tracking-widest mb-4">
            CHÀO MỪNG ĐẾN VỚI WINE HOURSE
          </h1>
          <p className="text-justify text-muted-foreground">
            Vòng nó Thăng Long có hương vị đặc trưng của sản phẩm lên men tự
            nhiên tự hòa quả với độ nươu nhe, bot ga đây trắng mịn. Vàng Nổ
            thông long tạo cảm giác hương phản, êm dịu, và nam, sản phẩm được
            đóng chai dung tích 750ml Vùng nổ Tháng Long có hương vị đặc mưng
            của sản phẩm lên men tự nhiên từ hoa quả với độ tươu nhẹ, bọt ga đây
            nàng mạn. Vàng Nô tháng long tạo cảm giác hương phần êm dịu, và nơi
            sản phẩm được đóng chai dùng tích 750ml Vùng nổ Thăng Long có hương
            vị đặc mừng của sân phẩm lên men tự nhiên từ hoa quả với độ rượu
            nhẹ, bọt ga đây măng man. Vang Nà thăng long tạo cảm giác tương
            phản, êm địu, và tươn sản phẩm được đóng chai dung tịch 750ml..
          </p>
        </div>
      </div>
    </main>
  );
}

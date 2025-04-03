import React from "react";
import Image from "next/image";
import ItemProduct, { ItemProductProps } from "@/components/item-product";
import ItemBlog, { ItemBlogProps } from "@/components/item-blog";
import { Quote } from "lucide-react";

export default function Home() {
  const products: ItemProductProps[] = [
    {
      imageUrl: "/images/1.jpg",
      imageAlt: "Wine 1",
      productName: "RƯỢU VANG ĐÀ LẠT",
      currentPrice: "370.000đ",
      originalPrice: "450.000đ",
    },
    {
      imageUrl: "/images/2.jpg",
      imageAlt: "Wine 2",
      productName: "RƯỢU VANG ĐÀ LẠT",
      currentPrice: "370.000đ",
      originalPrice: "450.000đ",
    },
    {
      imageUrl: "/images/3.jpg",
      imageAlt: "Wine 3",
      productName: "RƯỢU VANG ĐÀ LẠT",
      currentPrice: "370.000đ",
      originalPrice: "450.000đ",
    },
    {
      imageUrl: "/images/4.jpg",
      imageAlt: "Wine 4",
      productName: "RƯỢU VANG ĐÀ LẠT",
      currentPrice: "370.000đ",
      originalPrice: "450.000đ",
    },
    {
      imageUrl: "/images/3.jpg",
      imageAlt: "Wine 3",
      productName: "RƯỢU VANG ĐÀ LẠT",
      currentPrice: "370.000đ",
      originalPrice: "450.000đ",
    },
    {
      imageUrl: "/images/4.jpg",
      imageAlt: "Wine 4",
      productName: "RƯỢU VANG ĐÀ LẠT",
      currentPrice: "370.000đ",
      originalPrice: "450.000đ",
    },
  ];

  const blogs: ItemBlogProps[] = [
    {
      imageUrl: "/images/blog1.jpg",
      title: "VANG THĂNG LONG CLASSIC",
      author: "Giangle",
      date: "30/06/2015",
      commentCount: 60,
      description:
        "Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên men tự nhiên từ hoa quả...",
    },
    {
      imageUrl: "/images/blog1.jpg",
      title: "VANG THĂNG LONG CLASSIC",
      author: "Giangle",
      date: "30/06/2015",
      commentCount: 60,
      description:
        "Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên men tự nhiên từ hoa quả...",
    },
  ];

  const slides: string[] = [
    "/images/slide-1.jpg",
    "/images/slide-2.jpg",
    "/images/slide-3.jpg",
    "/images/slide-4.jpg",
    "/images/slide-4.jpg",
    "/images/slide-3.jpg",
    "/images/slide-2.jpg",
    "/images/slide-1.jpg",
  ];

  return (
    <div className="bg-white flex flex-col items-center max-w-screen min-h-screen">
      <div className="relative w-full min-h-[68vh] z-10">
        <Image
          src="/images/banner.jpg"
          alt="banner"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2/3 w-1/2">
          <Image
            src="/images/banner-text.png"
            alt="banner-text"
            fill
            className="object-fill"
            priority
          />
        </div>
      </div>

      <div className="relative flex flex-col justify-start items-center w-full py-14">
        <div className="absolute -top-15 left-0 w-26/100 h-120">
          <Image
            src="/images/nho1.jpg"
            alt="nho"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute top-0 right-0 w-50 h-58">
          <Image
            src="/images/nho2.png"
            alt="nho"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="w-3/4 max-w-5xl mx-auto text-center p-6 flex flex-col items-center">
          <div className="relative mb-2">
            <span className="text-xl font-medium text-gray-800">
              GIỚI THIỆU
            </span>
          </div>

          <div className="relative w-38 h-2 mb-5">
            <Image
              src="/images/title-dark.png"
              alt="line"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="text-gray-700 text-sm leading-relaxed mb-8 z-1000">
            <span>
              Mirure dolor in hendrerit in vulputate velit esse molestie
              consequat, vel illum dolore eu feugiat nulla facilisis at vero
              eros et accumsan et iusto odio dignissim qui blandit praesent
              luptatum zzril delenit augue duis dolore te feugiat nulla
              facilisi. Nam liber tempor cum soluta nobis eleifend option congue
              nihil imperdiet doming id quod mazim placerat facer possim assum.
              Typi non habent claritatem insitam; est usus legentis in iis qui
              facietorum claritatem. Investigationes demonstraverunt lectores
              legere me lius quod ii legunt saepius. Claritas est etiam
              processus dynamicus, qui sequitur mutationem consuetudium
              lectorum. Mirum est notare quam littera gothica, quam nunc putam.
            </span>
          </div>

          <button className="bg-black text-white px-6 py-2 text-sm font-semibold hover:bg-gray-800 transition">
            <span>XEM THÊM</span>
          </button>
        </div>

        <div className="relative min-w-[60vw] min-h-[72vh] mx-auto mt-20 bg-[url('/images/nho-banner.jpg')] bg-cover bg-center z-100">
          <div className="absolute top-[345px] left-1/2 w-5/6 h-[64vh] z-1000 bg-white -translate-x-1/2 px-[100px] py-[95px]">
            <div className="flex flex-row justify-center w-full h-full bg-white">
              <div className="relative w-2/3 h-full items-center">
                <Image
                  src="/images/alpatago.jpg"
                  alt="nho"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex w flex-col w-1/3 justify-start items-start mx-auto text-center">
                <h2 className="text-xl font-medium text-gray-900 flex items-center justify-center gap-2">
                  RƯỢU NHO NĂM 1987
                </h2>

                <div className="relative w-16 h-2 mt-1">
                  <Image
                    src="/images/titleleft-dark.png"
                    alt="line"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <p className="text-3xl text-amber-300 font-medium mt-5">
                  330.000đ
                </p>

                <button className="bg-black text-white uppercase text-sm font-medium py-1 px-6 hover:bg-gray-800 transition mt-4">
                  ADD TO CART
                </button>

                <p className="text-gray-700 text-xs leading-relaxed mt-6 text-start">
                  Một hợp chất có trong rượu vang được gọi là resveratro có khả
                  năng làm tăng tối đa tuổi thọ. Resveratro còn có khả năng ngăn
                  chặn mất độ oxy hóa của protein béo.
                </p>

                <div className="w-full grid grid-cols-2 mt-12 text-amber-300 text-2xl font-medium">
                  <div className="border text-amber-300 py-3">
                    <p>334</p>
                    <p className="text-sm">NGÀY</p>
                  </div>
                  <div className="border text-amber-300 py-3">
                    <p>26</p>
                    <p className="text-sm">GIỜ</p>
                  </div>
                  <div className="border text-amber-300 py-3">
                    <p>60</p>
                    <p className="text-sm">PHÚT</p>
                  </div>
                  <div className="border text-amber-300 py-3">
                    <p>15</p>
                    <p className="text-sm">GIÂY</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-[60vw] max-w-5xl mx-auto text-center p-6 flex flex-col items-center mt-[26vh]">
          <div className="relative mb-2">
            <span className="text-xl font-medium text-gray-800">
              SẢN PHẨM MỚI
            </span>
          </div>

          <div className="relative w-37.5 h-2 mb-5">
            <Image
              src="/images/title-dark.png"
              alt="line"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="w-[60vw] flex flex-nowrap mt-5 overflow-x-auto scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-4">
            {products.map((product, index) => (
              <div className="flex-shrink-0 w-1/4" key={index}>
                <ItemProduct {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-4 grid-rows-2 mt-5">
        {slides.map((slide, index) => (
          <div key={index}>
            <div className="relative w-full h-68">
              <Image
                src={slide}
                alt="line"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex flex-col justify-start items-center w-full py-14">
        <div className="min-w-[60vw] max-w-5xl mx-auto text-center p-6 flex flex-col items-center mt-5">
          <div className="relative mb-2">
            <span className="text-xl font-medium text-gray-800">
              SẢN PHẨM BÁN CHẠY
            </span>
          </div>

          <div className="relative w-37.5 h-2 mb-5">
            <Image
              src="/images/title-dark.png"
              alt="line"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="w-[60vw] flex flex-nowrap mt-5 overflow-x-auto scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-4">
            {products.map((product, index) => (
              <div className="flex-shrink-0 w-1/4" key={index}>
                <ItemProduct {...product} />
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-[60vw] max-w-5xl mx-auto text-center p-6 flex flex-row justify-center gap-6 mt-10">
          <div className="flex w-2/3 flex-col items-center">
            <div className="relative mb-2">
              <span className="text-xl font-medium text-gray-800">
                TIN TỨC & BLOG
              </span>
            </div>

            <div className="relative w-37.5 h-2 mb-5">
              <Image
                src="/images/title-dark.png"
                alt="line"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="w-full grid grid-cols-2 gap-6 px-4 mt-5">
              {blogs.map((blog, index) => (
                <ItemBlog key={index} {...blog} />
              ))}
            </div>
          </div>

          <div className="flex w-1/3 flex-col items-center">
            <div className="relative mb-2">
              <span className="text-xl font-medium text-gray-800">
                KHÁCH HÀNG
              </span>
            </div>

            <div className="relative w-37.5 h-2 mb-5">
              <Image
                src="/images/title-dark.png"
                alt="line"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="w-15 h-15 bg-yellow-400 rounded-full flex items-center justify-center mb-4 mt-4">
              <Quote />
            </div>

            <p className="text-center text-gray-600 text-sm mb-1 mt-3">
              Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên men tự
              nhiên từ hoa quả với độ rượu nhẹ, bọt ga đầy...
            </p>
            <a
              href="#"
              className="text-gray-500 text-sm font-medium mb-6 hover:underline"
            >
              Read more
            </a>

            <div className="relative w-25 h-25 mb-4">
              <Image
                src="/images/avatar.jpg"
                alt="Giang LT"
                fill
                className="rounded-lg object-cover"
              />
            </div>

            <span className="text-sm font-medium text-gray-800">GIANG LT</span>
            <p className="text-xs italic text-gray-500">Graphic design</p>
          </div>
        </div>
      </div>
    </div>
  );
}

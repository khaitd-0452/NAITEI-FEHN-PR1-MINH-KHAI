"use client";

// components/ProductPage.jsx
import { useState } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown, Heart, BarChart2, Mail } from "lucide-react";
import ItemProduct, { ItemProductProps } from "@/components/item-product";
import RenderTabContent from "@/components/rating-product";

export default function ProductPage() {
  const [quantity, setQuantity] = useState(3);
  const [selectedColor, setSelectedColor] = useState("gold");
  const [activeTab, setActiveTab] = useState("highlights");

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

  const colors = [
    { name: "gold", hex: "#E5B449" },
    { name: "black", hex: "#000000" },
    { name: "red", hex: "#9B0000" },
  ];

  const thumbnails = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/5.jpg",
  ];

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="bg-white flex flex-col items-center max-w-screen min-h-screen">
      <div className="w-[64vw] mx-auto flex flex-col items-start justify-start py-8">
        <div className="text-sm text-gray-500 font-medium flex flex-row items-center mb-8">
          <p>Trang chủ / Sản phẩm / </p>
          <p className="text-amber-300 ml-1"> Rượu vang đỏ</p>
        </div>

        <div className="flex w-full flex-col md:flex-row">
          <div className="hidden md:flex flex-col justify-between items-center w-[100px] border py-3">
            <button className="p-2 border-yellow-300 hover:border-yellow-500 cursor-pointer">
              <ChevronUp size={24} color="#E5B449" />
            </button>

            <div className="flex flex-col items-center justify-center">
              {thumbnails.map((thumbnail, index) => (
                <div
                  key={index}
                  className="w-full h-[110px] flex items-center border-b"
                >
                  <div
                    className={`w-[65px] h-[82px] relative p-2 border ${
                      index === 2 ? "border-yellow-500" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={thumbnail}
                      alt={`Wine thumbnail ${index + 1}`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="p-2 border-yellow-300 hover:border-yellow-500 cursor-pointer">
              <ChevronDown size={24} color="#E5B449" />
            </button>
          </div>

          <div className="flex-1 flex justify-center p-4 border-r border-t border-b">
            <div className="relative w-full max-w-md h-full">
              <Image
                src="/images/2.jpg"
                alt="El Circo wine bottle"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>

          <div className="flex-1 px-4 pb-12 ml-3">
            <h2 className="text-2xl font-medium text-gray-700">
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

            <p className="text-3xl text-amber-300 font-medium mt-5">330.000đ</p>

            <div className="flex items-center mt-2 border-t border-b py-2">
              <div className="flex">
                {[1, 2, 3].map((i) => (
                  <span key={i} className="text-gray-400">
                    ★
                  </span>
                ))}
                {[4, 5].map((i) => (
                  <span key={i} className="text-gray-300">
                    ★
                  </span>
                ))}
              </div>
              <span className="ml-2 text-xs text-gray-600">
                1 Review(S) | Add Your Review
              </span>
            </div>

            <div className="mt-6">
              <div className="text-gray-500 mb-2 text-base">MÀU SẮC</div>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-8 h-8 ${
                      selectedColor === color.name
                        ? "ring-1 ring-offset-2 ring-gray-400"
                        : ""
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.name)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-gray-500 mb-2 text-base">KÍCH CỠ</div>
              <div className="relative w-[120px]">
                <select className="appearance-none w-full border text-gray-500 text-sm border-gray-300 px-4 py-1">
                  <option>Loại to</option>
                  <option>Loại vừa</option>
                  <option>Loại nhỏ</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-gray-500 mb-1 text-base">SỐ LƯỢNG</div>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="h-[25px] border border-gray-300 px-2 text-gray-600 bg-gray-200 cursor-pointer"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="h-[25px] border-t border-b text-sm border-gray-300 w-14 text-center text-gray-600"
                />
                <button
                  onClick={incrementQuantity}
                  className="h-[25px] border border-gray-300 px-2 text-gray-600 bg-gray-200 cursor-pointer"
                >
                  +
                </button>
                <button className="h-[25px] ml-4 bg-black text-white text-center text-sm px-6 hover:bg-gray-800">
                  ADD TO CART
                </button>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button className="flex items-center text-gray-600 hover:text-gray-800 flex-row gap-1">
                <Heart size={16} className="mr-1" />
                <span className="text-sm">Yêu thích</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-800">
                <BarChart2 size={16} className="mr-1" />
                <span className="text-sm">So sánh</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-800">
                <Mail size={16} className="mr-1" />
                <span className="text-sm">Email</span>
              </button>
            </div>

            <div className="mt-6 w-full pr-30">
              <h2 className="text-base font-medium mb-1 text-gray-500">
                MÔ TẢ
              </h2>
              <p className="text-gray-600 w-full text-xs">
                Một hợp chất có trong rượu vang được gọi là resveratrol có khả
                năng làm tăng độ dẻo tuổi thọ. Resveratrol còn có khả năng ngăn
                chặn mất độ oxy hoá của protein béo.
              </p>
            </div>

            <div className="flex space-x-2 mt-6">
              <button className="flex items-center bg-blue-600 text-white px-2 py-1 text-xs">
                <span>Like</span>
                <span className="ml-1 bg-blue-700 px-1">0</span>
              </button>
              <button className="flex items-center bg-blue-400 text-white px-2 py-1 text-xs">
                <span>Tweet</span>
                <span className="ml-1 bg-blue-500 px-1">0</span>
              </button>
              <button className="flex items-center bg-red-600 text-white px-2 py-1 text-xs">
                <span>G+1</span>
                <span className="ml-1 bg-red-700 px-1">0</span>
              </button>
              <button className="bg-blue-800 text-white px-2 py-1 text-xs">
                Share
              </button>
              <button className="bg-red-700 text-white px-2 py-1 text-xs">
                Pin it
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[64vw] mt-12">
        <div className="flex">
          <button
            className={`py-3 px-6 cursor-pointer font-medium text-base ${
              activeTab === "highlights"
                ? "bg-yellow-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setActiveTab("highlights")}
          >
            ĐẶC ĐIỂM NỔI BẬT
          </button>
          <button
            className={`py-3 px-6 font-medium cursor-pointer text-base ${
              activeTab === "info"
                ? "bg-yellow-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setActiveTab("info")}
          >
            THÔNG TIN SẢN PHẨM
          </button>
          <button
            className={`py-3 px-6 font-medium cursor-pointer text-base ${
              activeTab === "reviews"
                ? "bg-yellow-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            ĐÁNH GIÁ
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-2/3 pr-0 md:pr-8">
            {RenderTabContent(activeTab)}
          </div>
          <div className="w-full md:w-1/3 mt-6 md:mt-0">
            <div className="relative w-[360px] h-[195px]">
              <Image
                src="/images/nhovaly.jpg"
                alt="Product image"
                className="object-cover rounded-xs"
                fill
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-[64vw] max-w-5xl mx-auto text-center p-6 flex flex-col items-center mt-15">
        <div className="relative mb-2">
          <span className="text-xl font-medium text-gray-800">
            SẢN PHẨM LIÊN QUAN
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

        <div className="w-[64vw] flex flex-nowrap mt-6 overflow-x-auto scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-4">
          {products.map((product, index) => (
            <div className="flex-shrink-0 w-1/4" key={index}>
              <ItemProduct {...product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

// components/ProductPage.jsx
import { useState } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown, Heart, BarChart2, Mail } from "lucide-react";

export default function ProductPage() {
  const [quantity, setQuantity] = useState(3);
  const [selectedColor, setSelectedColor] = useState("gold");

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
      <div className="w-6xl mx-auto flex flex-col items-start justify-start py-8">
        <div className="text-sm text-gray-800 font-medium flex flex-row items-center mb-10">
          <p>Trang chủ / Sản phẩm / </p>
          <p className="text-amber-300 ml-1"> Rượu vang đỏ</p>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="hidden md:flex flex-col justify-center items-center w-24 border-r">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <ChevronUp size={20} />
            </button>

            {thumbnails.map((thumbnail, index) => (
              <div
                key={index}
                className={`p-2 border ${
                  index === 2 ? "border-yellow-500" : "border-transparent"
                }`}
              >
                <div className="w-16 h-16 relative">
                  <Image
                    src={thumbnail}
                    alt={`Wine thumbnail ${index + 1}`}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            ))}

            <button className="p-2 text-gray-400 hover:text-gray-600">
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="flex-1 flex justify-center p-4">
            <div className="relative w-full max-w-md h-full">
              <Image
                src="/images/1.jpg"
                alt="El Circo wine bottle"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>

          <div className="flex-1 px-4">
            <h1 className="text-2xl font-bold mt-4 md:mt-0">
              RƯỢU NHO NĂM 1987
            </h1>
            <div className="flex items-center mt-2">
              <hr className="w-8 h-1 bg-black" />
            </div>

            <div className="text-xl font-light text-yellow-400 mt-4">
              330,000đ
            </div>

            <div className="flex items-center mt-2">
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
              <span className="ml-2 text-sm text-gray-600">
                1 Review(S) | Add Your Review
              </span>
            </div>

            <div className="mt-6">
              <div className="text-gray-600 mb-2">MÀU SẮC</div>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-8 h-8 rounded ${
                      selectedColor === color.name
                        ? "ring-2 ring-offset-1 ring-gray-400"
                        : ""
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.name)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-gray-600 mb-2">KÍCH CỠ</div>
              <div className="relative">
                <select className="appearance-none border border-gray-300 px-4 py-2 pr-8 rounded w-full md:w-40">
                  <option>Loại to</option>
                  <option>Loại vừa</option>
                  <option>Loại nhỏ</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-gray-600 mb-2">SỐ LƯỢNG</div>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="border border-gray-300 px-3 py-1"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="border-t border-b border-gray-300 w-12 text-center py-1"
                />
                <button
                  onClick={incrementQuantity}
                  className="border border-gray-300 px-3 py-1"
                >
                  +
                </button>
                <button className="ml-4 bg-black text-white px-6 py-2 hover:bg-gray-800">
                  ADD TO CART
                </button>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button className="flex items-center text-gray-600 hover:text-gray-800">
                <Heart size={16} className="mr-1" />
                <span>Yêu thích</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-800">
                <BarChart2 size={16} className="mr-1" />
                <span>So sánh</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-800">
                <Mail size={16} className="mr-1" />
                <span>Email</span>
              </button>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-medium mb-2">MÔ TẢ</h2>
              <p className="text-gray-600">
                Một hợp chất có trong rượu vang được gọi là resveratrol có khả
                năng làm tăng độ dẻo tuổi thọ. Resveratrol còn có khả năng ngăn
                chặn mất độ oxy hoá của protein béo.
              </p>
            </div>

            <div className="flex space-x-2 mt-6">
              <button className="flex items-center bg-blue-600 text-white px-2 py-1 text-sm">
                <span>Like</span>
                <span className="ml-1 bg-blue-700 px-1">0</span>
              </button>
              <button className="flex items-center bg-blue-400 text-white px-2 py-1 text-sm">
                <span>Tweet</span>
                <span className="ml-1 bg-blue-500 px-1">0</span>
              </button>
              <button className="flex items-center bg-red-600 text-white px-2 py-1 text-sm">
                <span>G+1</span>
                <span className="ml-1 bg-red-700 px-1">0</span>
              </button>
              <button className="bg-blue-800 text-white px-2 py-1 text-sm">
                Share
              </button>
              <button className="bg-red-700 text-white px-2 py-1 text-sm">
                Pin it
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

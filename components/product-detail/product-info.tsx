"use client";
import Image from "next/image";
import { Heart, BarChart2, Mail } from "lucide-react";
import { Product } from "@/lib/types/product";
import { formatVndThousands } from "@/lib/utils";

interface ProductInfoProps {
  quantity: number;
  selectedColor: string;
  colors: { name: string; hex: string }[];
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  setSelectedColor: (color: string) => void;
  productDetail: Product;
  handleAddToCart: (e: React.FormEvent) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  quantity,
  selectedColor,
  colors,
  incrementQuantity,
  decrementQuantity,
  setSelectedColor,
  productDetail,
  handleAddToCart,
}) => {
  return (
    <div className="flex-4/9 px-4 pt-4 lg:pt-0 lg:ml-3 lg:pb-2">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        {productDetail.name}
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

      <p className="text-2xl md:text-3xl text-amber-300 font-medium mt-5">
        {formatVndThousands(
          productDetail.price -
            (productDetail.price * productDetail.discount) / 100
        )}
      </p>

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
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              className={`w-8 h-8 rounded-full ${
                selectedColor === color.name
                  ? "ring-2 ring-offset-2 ring-gray-400"
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
        <div className="relative w-32">
          <select className="appearance-none w-full border text-gray-500 text-sm border-gray-300 px-4 py-1 rounded">
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
        <div className="text-gray-500 mb-2 text-base">SỐ LƯỢNG</div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <button
              onClick={decrementQuantity}
              className="h-8 border border-gray-300 px-3 text-gray-600 bg-gray-200 cursor-pointer"
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="h-8 border-t border-b text-sm border-gray-300 w-14 text-center text-gray-600"
            />
            <button
              onClick={incrementQuantity}
              className="h-8 border border-gray-300 px-3 text-gray-600 bg-gray-200 cursor-pointer"
            >
              +
            </button>
          </div>
          <button
            className="h-8 bg-black text-white text-sm px-6 hover:bg-gray-800 w-full sm:w-auto cursor-pointer"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-6">
        <button className="flex items-center text-gray-600 hover:text-gray-800 gap-1">
          <Heart size={16} />
          <span className="text-sm">Yêu thích</span>
        </button>
        <button className="flex items-center text-gray-600 hover:text-gray-800 gap-1">
          <BarChart2 size={16} />
          <span className="text-sm">So sánh</span>
        </button>
        <button className="flex items-center text-gray-600 hover:text-gray-800 gap-1">
          <Mail size={16} />
          <span className="text-sm">Email</span>
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-base font-medium mb-2 text-gray-500">MÔ TẢ</h2>
        <p className="text-gray-600 text-xs">{productDetail.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
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
  );
};

export default ProductInfo;

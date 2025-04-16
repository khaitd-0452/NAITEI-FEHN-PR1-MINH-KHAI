"use client";
import React from "react";
import Image from "next/image";
import { ItemProductProps } from "@/components/product/item-product";

export default function ItemProductCard({
  product,
  onClick,
}: ItemProductProps) {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-start py-8 px-4 bg-white mx-auto border-b w-full"
      onClick={() => onClick(product.id)}
    >
      <div className="relative w-full md:w-1/4 h-48 md:h-78">
        <Image
          src={product.imageUrl}
          alt={product.imageAlt}
          fill
          className="lg:object-cover md:object-contain"
          priority
        />
      </div>

      <div className="flex-1 h-auto md:h-78 mt-4 md:mt-0 ml-0 md:ml-4 flex flex-col justify-start">
        <h3 className="text-left font-medium text-gray-800 mt-3 mb-1">
          {product.productName}
        </h3>

        <span className="text-amber-500 font-medium text-lg">
          {product.currentPrice}
        </span>

        <p className="text-xs text-gray-500 mt-1">{product.description}</p>

        <div className="flex flex-row items-center gap-5 mt-3">
          <button className="bg-black text-white uppercase text-xs font-medium py-2 transition-colors w-full md:w-35 cursor-pointer hover:bg-amber-500">
            ADD TO CART
          </button>

          <button className="flex items-center gap-1 text-gray-500 cursor-pointer hover:text-amber-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <span className="text-sm">Yêu thích</span>
          </button>

          <button className="flex items-center gap-1 text-gray-500 cursor-pointer hover:text-amber-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125-1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125-1.125 0 0 1-1.125-1.125V4.125Z"
              />
            </svg>
            <span className="text-sm">So sánh</span>
          </button>
        </div>
      </div>
    </div>
  );
}

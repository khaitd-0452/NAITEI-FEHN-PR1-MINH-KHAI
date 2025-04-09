"use client";
import React from "react";
import Image from "next/image";
import { CategoryCount } from "@/components/product/product-list";
import { cn } from "@/lib/utils";

interface ProductListSidebarProps {
  productCategories: Record<string, CategoryCount[]>;
  productTags: string[];
  selectedTag: string | null;
  setSelectedTag: (tag: string) => void;
  selectSubCategory: string | null;
  setSelectSubCategory: (subcategory: string) => void;
}

export default function ProductListSidebar({
  productCategories,
  productTags,
  selectedTag,
  setSelectedTag,
  selectSubCategory,
  setSelectSubCategory,
}: ProductListSidebarProps) {
  return (
    <div className="flex w-full md:w-1/5 flex-col justify-start items-start px-4 md:px-0">
      <h2 className="text-lg pb-2 text-gray-800">DANH MỤC SẢN PHẨM</h2>
      <div className="relative w-16 h-2">
        <Image
          src="/images/titleleft-dark.png"
          alt="line"
          fill
          className="object-cover"
          priority
        />
      </div>
      <ul className="mt-6 space-y-2 mb-8 w-full">
        {Object.entries(productCategories).map(([category, subcategories]) => (
          <div key={category} className="mb-1">
            <span className="font-medium mb-3 text-sm text-gray-600 block">
              {category}
            </span>
            <ul className="list-none text-sm text-gray-500">
              {subcategories.map((item) => (
                <li
                  key={item.subcategory}
                  onClick={() => setSelectSubCategory(item.subcategory)}
                  className={cn(
                    "text-xs my-1 cursor-pointer transition",
                    selectSubCategory === item.subcategory
                      ? "text-amber-400 font-medium"
                      : "hover:text-amber-400"
                  )}
                >
                  {item.subcategory} ({item.count})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>

      <h2 className="text-lg pb-2 text-gray-800">SO SÁNH SẢN PHẨM</h2>
      <div className="relative w-16 h-2">
        <Image
          src="/images/titleleft-dark.png"
          alt="line"
          fill
          className="object-cover"
          priority
        />
      </div>
      <span className="text-xs text-gray-500 mt-6 mb-8 block">
        Bạn chưa có sản phẩm nào để so sánh
      </span>

      <h2 className="text-lg pb-2 text-gray-800">TAG SẢN PHẨM</h2>
      <div className="relative w-16 h-2">
        <Image
          src="/images/titleleft-dark.png"
          alt="line"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-6 mb-8 w-full">
        {productTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={cn(
              "px-3 py-1 border rounded text-xs transition cursor-pointer",
              selectedTag === tag
                ? "bg-yellow-400 text-white border-yellow-400"
                : "bg-white text-gray-500 border-gray-300 hover:bg-gray-100"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="relative w-full min-h-[30vh] flex-1 mt-4">
        <Image
          src="/images/footer-product.jpg"
          alt="Product Banner"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 20vw"
        />
      </div>
    </div>
  );
}

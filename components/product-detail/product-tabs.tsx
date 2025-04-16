"use client";
import Image from "next/image";
import RenderTabContent from "@/components/product-detail/rating-product";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/types/product";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  productDetail: Product;
}

const ProductTabs: React.FC<TabsProps> = ({
  activeTab,
  setActiveTab,
  productDetail,
}) => {
  return (
    <div className="w-full mt-12">
      <div className="flex flex-wrap gap-2">
        <button
          className={cn(
            "py-2 px-6 font-medium text-sm sm:text-base cursor-pointer",
            activeTab === "highlights"
              ? "bg-yellow-500 text-white"
              : "bg-gray-100 text-gray-700"
          )}
          onClick={() => setActiveTab("highlights")}
        >
          ĐẶC ĐIỂM NỔI BẬT
        </button>
        <button
          className={cn(
            "py-2 px-6 font-medium text-sm sm:text-base cursor-pointer",
            activeTab === "info"
              ? "bg-yellow-500 text-white"
              : "bg-gray-100 text-gray-700"
          )}
          onClick={() => setActiveTab("info")}
        >
          THÔNG TIN SẢN PHẨM
        </button>
        <button
          className={cn(
            "py-2 px-6 font-medium text-sm sm:text-base cursor-pointer",
            activeTab === "reviews"
              ? "bg-yellow-500 text-white"
              : "bg-gray-100 text-gray-700"
          )}
          onClick={() => setActiveTab("reviews")}
        >
          ĐÁNH GIÁ
        </button>
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-20 mt-2">
        <div className="w-full lg:w-2/3">
          <RenderTabContent
            activeTab={activeTab}
            productDetail={productDetail}
          />
        </div>
        <div className="w-full lg:w-1/3">
          <div className="relative w-full aspect-video">
            <Image
              src="/images/nhovaly.jpg"
              alt="Product image"
              fill
              className="object-cover rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;

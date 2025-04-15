"use client";
import Image from "next/image";
import { ProductItem } from "@/lib/types/product";
import ItemProduct from "@/components/product/item-product";
import { useRouter } from "next/navigation";

interface RelatedProductsProps {
  products: ProductItem[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  const router = useRouter();
  const handleOnClick = (id: string) => {
    router.push(`/product/${id}`);
  };
  return (
    <div className="w-full mt-12 text-center">
      <h2 className="text-xl md:text-2xl font-medium text-gray-800">
        SẢN PHẨM LIÊN QUAN
      </h2>
      <div className="relative w-32 h-2 mx-auto mt-2 mb-14">
        <Image
          src="/images/title-dark.png"
          alt="line"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="hidden lg:flex w-full flex-nowrap overflow-x-auto scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-4">
        {products.map((product, index) => (
          <div className="flex-shrink-0 w-1/4" key={index}>
            <ItemProduct product={product} onClick={handleOnClick} />
          </div>
        ))}
      </div>

      <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        {products.map((product, index) => (
          <div key={index}>
            <ItemProduct product={product} onClick={handleOnClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;

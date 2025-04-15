"use client";
import { useState } from "react";
import Image from "next/image";
import ProductInfo from "@/components/product-detail/product-info";
import ProductTabs from "@/components/product-detail/product-tabs";
import RelatedProducts from "@/components/product-detail/related-products";
import ThumbnailGallery from "@/components/product-detail/thumbnail-gallery";
import { Product, ProductItem } from "@/lib/types/product";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

interface ProductDetailMainProps {
  productDetail: Product;
  recommendProducts: ProductItem[];
}

export default function ProductDetailMain({
  productDetail,
  recommendProducts,
}: ProductDetailMainProps) {
  const [productImage, setProductImage] = useState<{
    url: string;
    alt: string;
  }>(productDetail.images[0]);
  const { currentUser } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("gold");
  const [activeTab, setActiveTab] = useState("highlights");

  const colors = [
    { name: "gold", hex: "#E5B449" },
    { name: "black", hex: "#000000" },
    { name: "red", hex: "#9B0000" },
  ];

  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!", {
        style: {
          background: "red",
          color: "#fff",
        },
      });
      setTimeout(() => {
        window.location.href = "/auth/sign-in";
      }, 2000);
      return;
    }

    try {
      const serverApiUrl =
        process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:5000";
      const response = await axios.post(`${serverApiUrl}/carts`, {
        id: crypto.randomUUID(),
        userId: currentUser.id,
        productId: productDetail.id,
        quantity,
        checked: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (response.status === 200 || response.status === 201) {
        console.log(
          `Product ${productDetail.id} added to cart successfully for user ${currentUser.id} (Client).`
        );
        toast.success("Đã thêm sản phẩm vào giỏ hàng thành công!", {
          style: {
            background: "green",
            color: "#fff",
          },
          icon: <CheckCircle2 className="text-white" />,
        });
        return response.data;
      } else {
        throw new Error(`API responded with status ${response.status}`);
      }
    } catch (error) {
      console.error(
        `Failed to add product ${productDetail.id} to cart for user ${currentUser.id} (Client):`,
        error
      );
      let errorMessage = "Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.";
      if (axios.isAxiosError(error)) {
        errorMessage = `Lỗi API: ${
          error.response?.data?.message || error.message
        }`;
      }
      toast.error(errorMessage, {
        style: {
          background: "red",
          color: "#fff",
        },
      });
      throw error;
    }
  };

  const incrementQuantity = () => {
    if (quantity < productDetail.stock) {
      setQuantity(quantity + 1);
    } else {
      toast.error("Số lượng vượt quá tồn kho!", {
        style: {
          background: "red",
          color: "#fff",
        },
      });
    }
  };
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="w-full flex flex-col items-start">
      <div className="flex w-full flex-col lg:flex-row">
        <ThumbnailGallery
          productImage={productImage}
          thumbnails={productDetail.images}
          setProductImage={setProductImage}
        />
        <div className="flex-5/9 flex justify-center items-cente max-w-md mx-auto lg:max-w-none border-t border-b border-r">
          <div className="relative w-88/100 h-full">
            <Image
              src={productImage.url}
              alt={productImage.alt}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <ProductInfo
          quantity={quantity}
          selectedColor={selectedColor}
          colors={colors}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          setSelectedColor={setSelectedColor}
          productDetail={productDetail}
          handleAddToCart={handleAddToCart}
        />
      </div>

      <ProductTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        productDetail={productDetail}
      />
      <RelatedProducts products={recommendProducts} />
    </div>
  );
}

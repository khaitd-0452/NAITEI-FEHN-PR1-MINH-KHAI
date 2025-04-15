import PageBreadCrumb from "@/components/layout/page_bread_crumb";
import ProductDetailMain from "@/components/product-detail/product-detail-main";
import { Product, ProductItem } from "@/lib/types/product";
import { formatVndThousands } from "@/lib/utils";
import axios from "axios";
import { notFound } from "next/navigation";
import React from "react";

export async function getProductDetail(params: {
  id: string;
}): Promise<Product | null> {
  try {
    const { id } = params;
    const res = await axios.get(`${process.env.SERVER_API_URL}/products/${id}`);
    const productDetailData: Product = res.data;
    return productDetailData;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export async function getRecommendProductList(
  productDetail: Product
): Promise<ProductItem[]> {
  try {
    const res = await axios.get(`${process.env.SERVER_API_URL}/products`);
    const productsData: ProductItem[] = res.data.map((product: Product) => ({
      id: product.id as string,
      imageUrl: product.images[0]?.url || "",
      imageAlt: product.images[0]?.alt || "",
      productName: product.name,
      originalPrice: formatVndThousands(product.price),
      currentPrice: formatVndThousands(
        product.price - (product.price * product.discount) / 100
      ),
      category: product.category,
      subcategory: product.subcategory,
      tags: product.tags,
      description: product.description,
      createdAt: product.created_at,
      point: product.point,
    }));
    const recommendProducts: ProductItem[] = productsData.filter(
      (product: ProductItem) => {
        return (
          product.id !== productDetail.id &&
          product.tags.some((tag) => productDetail.tags.includes(tag))
        );
      }
    );
    return recommendProducts;
  } catch (error) {
    console.error("Failed to fetch recommended products:", error);
    return [];
  }
}

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const productDetail = await getProductDetail(params);
  if (!productDetail) {
    notFound();
  }

  const recommendProducts = await getRecommendProductList(productDetail);

  return (
    <main className="container mx-auto max-w-[1200px] mt-6 mb-40 space-y-8 px-4">
      <PageBreadCrumb />
      <ProductDetailMain
        productDetail={productDetail}
        recommendProducts={recommendProducts}
      />
    </main>
  );
}

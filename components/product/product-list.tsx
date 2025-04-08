"use client";
import ProductListWithPagination from "@/components/product/product-data-list";
import ProductListSidebar from "@/components/product/product-sidebar";
import { ProductItem } from "@/lib/types/product";
import { useEffect, useMemo, useState } from "react";

export interface CategoryCount {
  subcategory: string;
  count: number;
}

interface ProductListProps {
  initialProducts: ProductItem[];
}

export function ProductList({ initialProducts }: ProductListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectSubCategory, setSelectSubCategory] = useState<string | null>(
    null
  );

  useEffect(() => {
    setSelectedTag(null);
  }, [selectSubCategory]);

  const productCategories = useMemo(() => {
    return initialProducts.reduce<Record<string, CategoryCount[]>>(
      (categories, product) => {
        const { category, subcategory } = product;
        const listSubcategories = categories[category] ?? [];

        const existing = listSubcategories.find(
          (item) => item.subcategory === subcategory
        );

        if (existing) {
          existing.count += 1;
        } else {
          listSubcategories.push({ subcategory, count: 1 });
        }

        categories[category] = listSubcategories;
        return categories;
      },
      {}
    );
  }, [initialProducts]);

  const filterProductBySubCategory = useMemo(() => {
    if (selectSubCategory === null) {
      return initialProducts;
    }
    return initialProducts.filter(
      (product) => product.subcategory === selectSubCategory
    );
  }, [initialProducts, selectSubCategory]);

  const productTags = useMemo(() => {
    return Array.from(
      filterProductBySubCategory.reduce<Set<string>>((tags, product) => {
        product.tags.forEach((tag) => tags.add(tag));
        return tags;
      }, new Set())
    );
  }, [filterProductBySubCategory]);

  const filterProductByTag = useMemo(() => {
    if (selectedTag === null) {
      return filterProductBySubCategory;
    }
    return filterProductBySubCategory.filter((product) =>
      product.tags.includes(selectedTag)
    );
  }, [filterProductBySubCategory, selectedTag]);

  return (
    <div className="w-full flex flex-row justify-start gap-12">
      <ProductListSidebar
        productCategories={productCategories}
        productTags={productTags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        selectSubCategory={selectSubCategory}
        setSelectSubCategory={setSelectSubCategory}
      />
      <div className="flex flex-1">
        <ProductListWithPagination products={filterProductByTag} />
      </div>
    </div>
  );
}

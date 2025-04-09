"use client";
import { ProductItem } from "@/lib/types/product";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import ItemProduct from "@/components/product/item-product";
import { Grid3X3, List } from "lucide-react";
import ItemProductCard from "@/components/product/item-product-card";

interface ProductListWithPaginationProps {
  products: ProductItem[];
}

interface PaginationProps {
  viewMode: "grid" | "list";
  onChange: (mode: "grid" | "list") => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  viewMode,
  onChange,
}: PaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-row justify-between items-center mb-4 border border-gray-200">
      <div className="p-1 flex items-center gap-1">
        <button
          onClick={() => onChange("grid")}
          className={cn(
            "p-1 cursor-pointer",
            viewMode === "grid" ? "text-orange-500" : "text-gray-400"
          )}
        >
          <Grid3X3 size={20} />
        </button>
        <button
          onClick={() => onChange("list")}
          className={cn(
            "p-1 cursor-pointer",
            viewMode === "list" ? "text-orange-500" : "text-gray-400"
          )}
        >
          <List size={20} />
        </button>
      </div>
      <div className="flex items-center px-2 py-1 text-sm">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "px-2 text-gray-400",
            currentPage === 1 && "opacity-30",
            currentPage > 1 && "cursor-pointer"
          )}
        >
          &lt;
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "px-2 cursor-pointer",
              page === currentPage ? "text-orange-500" : "text-gray-500"
            )}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "px-2 text-gray-400",
            currentPage === totalPages && "opacity-30",
            currentPage < totalPages && "cursor-pointer"
          )}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default function ProductListWithPagination({
  products,
}: ProductListWithPaginationProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const { itemsPerPage, totalPages } = useMemo(() => {
    const itemsPerPage = viewMode === "grid" ? 9 : 4;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    return { itemsPerPage, totalPages };
  }, [viewMode, products.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [products, viewMode]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  }, [products, currentPage, itemsPerPage]);

  return (
    <div className="w-full">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        viewMode={viewMode}
        onChange={(mode) => setViewMode(mode)}
      />
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:gap-14 gap-6">
          {paginatedProducts.map((product) => (
            <ItemProduct key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="flex w-full flex-col">
          {paginatedProducts.map((product) => (
            <ItemProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
}

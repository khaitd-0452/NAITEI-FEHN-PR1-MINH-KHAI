export interface Product {
  id: number | string;
  name: string;
  price: number;
  discount: number;
  color: string;
  size: string;
  description: string;
  product_info: string;
  highlights: string;
  point: number;
  category: string;
  subcategory: string;
  stock: number;
  tags: string[];
  images: {
    url: string;
    alt: string;
  }[];
  created_at: string;
  updated_at: string;
}

export type ProductItem = {
  id: number | string;
  imageUrl: string;
  imageAlt: string;
  productName: string;
  currentPrice: string;
  originalPrice: string;
  category: string;
  subcategory: string;
  tags: string[];
  description: string;
};

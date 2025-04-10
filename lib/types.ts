
export type Order = {
  id: number | string;
  stt: string;
  code: string;
  date: string;
  quantity: number;
  total: string;
  status: string;
  paymentMethod: string;
  detailUrl: string;
};

export type BlogPost =  {
    id: string; // Unique ID or slug
    imageUrl: string;
    title: string;
    author: string;
    date: string;
    commentCount: number;
    description: string;
    href: string;
  }

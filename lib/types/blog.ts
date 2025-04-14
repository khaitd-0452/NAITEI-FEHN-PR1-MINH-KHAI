import { Comment } from "@/lib/types/comment";
import { User } from "@/lib/types/user";

export interface Blog {
  id: string;
  userId: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  images: {
    url: string;
    alt: string;
  }[];
  tags: string[];
}

export interface BlogDetail {
  id: string;
  userId: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  images: {
    url: string;
    alt: string;
  }[];
  tags: string[];
  comments: Comment[];
  user: User;
}

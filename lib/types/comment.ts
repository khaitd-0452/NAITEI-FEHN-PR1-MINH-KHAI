export interface Comment {
  id: string;
  userId: string;
  blogId: string;
  content: string;
  created_at: string;
  updated_at: string;
  email: string;
  username: string;
}
export type CommentFormInput = Omit<
  Comment,
  "id" | "userId" | "blogId" | "create_at" | "update_at"
>;

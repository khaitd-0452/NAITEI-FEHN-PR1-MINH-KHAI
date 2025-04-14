"use client";
import React, { useEffect, useState } from "react";
import { BlogDetail } from "@/lib/types/blog";
import BlogHeaderContent from "@/components/blog/blog-header-content";
import CommentForm from "@/components/blog/comment-form";
import CommentList from "@/components/blog/comment-list";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { Comment } from "@/lib/types/comment";

interface BlogDetailProps {
  blogDetail: BlogDetail;
}

export default function BlogContainer({ blogDetail }: BlogDetailProps) {
  const { currentUser } = useAuth();
  const [initBlogDetail, setInitBlogDetail] = useState<BlogDetail>(blogDetail);

  useEffect(() => {
    const sortedBlogDetail = {
      ...blogDetail,
      comments: [...blogDetail.comments].sort(
        (a: Comment, b: Comment) =>
          new Date(b.created_at || "").getTime() -
          new Date(a.created_at || "").getTime()
      ),
    };
    setInitBlogDetail(sortedBlogDetail);
  }, [blogDetail]);

  const [formData, setFormData] = useState({
    comment: "",
    email: "",
    username: "",
  });

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please log in to comment");
      window.location.href = "/auth/sign-in";
      return;
    }
    const serverApiUrl = process.env.SERVER_API_URL || "http://localhost:5000";

    if (!formData.comment || !formData.email || !formData.username) {
      alert("Please fill all fields");
      return;
    }

    if (!formData.comment || !formData.email || !formData.username) {
      alert("Please fill all fields");
      return;
    }

    const currentDate = new Date().toISOString();
    const newComment = {
      userId: currentUser.id,
      blogId: initBlogDetail.id,
      content: formData.comment,
      created_at: currentDate,
      updated_at: currentDate,
      email: formData.email,
      username: formData.username,
    };

    try {
      const response = await axios.post(`${serverApiUrl}/comments`, newComment);
      const newCommentId = response.data.id;
      setInitBlogDetail((prev) => ({
        ...prev,
        comments: [
          {
            ...newComment,
            id: newCommentId,
          },
          ...prev.comments,
        ],
      }));
      setFormData({ comment: "", email: "", username: "" });
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment. Please try again.");
    }

    setFormData({ comment: "", email: "", username: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="w-full mx-auto p-4">
      <BlogHeaderContent blogDetail={initBlogDetail} />
      <CommentForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmitComment={handleSubmitComment}
      />
      <CommentList comments={initBlogDetail.comments} />
    </div>
  );
}

"use client";
import React from "react";
import Image from "next/image";
import { BlogDetail } from "@/lib/types/blog";
import { formatDisplayDate } from "@/lib/utils";

interface BlogHeaderContentProps {
  blogDetail: BlogDetail;
}

export default function BlogHeaderContent({
  blogDetail,
}: BlogHeaderContentProps) {
  return (
    <>
      {blogDetail.images.length > 0 && (
        <div className="relative w-full h-[47vh]">
          <Image
            src={blogDetail.images[0].url}
            alt={blogDetail.images[0].alt}
            className="object-cover"
            fill
            priority
          />
        </div>
      )}
      <h2 className="text-3xl font-medium text-gray-700 mt-10 mb-6">
        {blogDetail.title}
      </h2>
      <div className="flex text-base items-center text-gray-400 mb-6">
        <span>Đăng bởi {blogDetail.user.username}</span>
        <span className="mx-2">|</span>
        <span>{formatDisplayDate(blogDetail.created_at)}</span>
        <span className="mx-2">|</span>
        <span>{blogDetail.comments.length} bình luận</span>
      </div>
      <div
        className="prose max-w-none mb-10 text-gray-500"
        dangerouslySetInnerHTML={{ __html: blogDetail.content }}
      />
    </>
  );
}

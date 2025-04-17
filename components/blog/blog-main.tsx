"use client";
import BlogContainer from "@/components/blog/blog-detail";
import BlogSidebar from "@/components/blog/blog-sidebar";
import { Blog, BlogDetail } from "@/lib/types/blog";
import React, { useMemo, useState } from "react";

interface BlogMainProps {
  blogDetail: BlogDetail;
  initRecommendBlogs: Blog[];
}
export default function BlogMain({
  blogDetail,
  initRecommendBlogs,
}: BlogMainProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const recommendBlogs = useMemo(() => {
    if (selectedTag === null) {
      return initRecommendBlogs;
    }
    return initRecommendBlogs.filter((Blog) => Blog.tags.includes(selectedTag));
  }, [initRecommendBlogs, selectedTag]);

  return (
    <div className="w-full flex flex-col lg:flex-row justify-start items-start gap-4">
      <BlogSidebar
        recommendBlogs={recommendBlogs}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        blogTags={blogDetail.tags}
      />
      <div className="flex flex-1">
        <BlogContainer blogDetail={blogDetail} />
      </div>
    </div>
  );
}

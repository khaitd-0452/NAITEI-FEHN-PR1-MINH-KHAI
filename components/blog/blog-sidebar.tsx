"use client";
import Image from "next/image";
import React from "react";
import { Blog } from "@/lib/types/blog";
import { Calendar, PlayCircle } from "lucide-react";
import { cn, formatDisplayDate } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function BlogItemSidebar({ blog }: { blog: Blog }) {
  const imageUrl = blog.images?.[0]?.url ?? "/images/wine.jpg";
  const imageAlt = blog.images?.[0]?.alt ?? blog.title;
  const router = useRouter();
  const handleBlogClick = (blogId: string) => {
    router.push(`/blog/${blogId}`);
  };
  return (
    <div
      className="flex items-start last:border-b-0 w-full cursor-pointer"
      onClick={() => handleBlogClick(blog.id)}
    >
      <div className="relative w-[80px] h-[60px] sm:w-[100px] sm:h-[75px]">
        <Image src={imageUrl} alt={imageAlt} layout="fill" objectFit="cover" />
      </div>

      <div className="flex-1 min-w-0 ml-3 sm:ml-4">
        <span className="text-xs font-medium text-gray-800 line-clamp-2">
          {blog.title}
        </span>
        <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" strokeWidth={2} />{" "}
          <span>{formatDisplayDate(blog.created_at)}</span>
        </div>
      </div>
    </div>
  );
}

interface BlogSidebarProps {
  recommendBlogs: Blog[];
  blogTags: string[];
  selectedTag: string | null;
  setSelectedTag: (tag: string) => void;
}

export default function BlogSidebar({
  recommendBlogs,
  blogTags,
  selectedTag,
  setSelectedTag,
}: BlogSidebarProps) {
  return (
    <div className="flex w-full md:w-1/4 flex-col justify-start items-start px-3 sm:px-4 md:px-0 gap-8">
      <div className="w-full">
        <h2 className="text-base sm:text-lg pb-2 text-gray-800 mb-6">
          BÀI VIẾT LIÊN QUAN
        </h2>
        <div className="bg-white w-full flex flex-col justify-start items-start gap-3 sm:gap-6">
          {recommendBlogs.map((blog) => (
            <BlogItemSidebar key={blog.id} blog={blog} />
          ))}
        </div>
      </div>

      <div className="w-full block">
        <h2 className="text-base sm:text-lg pb-2 text-gray-800 mb-6">
          BLOG TAGS
        </h2>
        <div className="flex flex-wrap gap-2 mt-6 w-full">
          {blogTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={cn(
                "px-3 py-1 border rounded text-xs transition cursor-pointer",
                selectedTag === tag
                  ? "bg-yellow-400 text-white border-yellow-400"
                  : "bg-white text-gray-500 border-gray-300 hover:bg-gray-100"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full block">
        <h2 className="text-base sm:text-lg pb-2 text-gray-800 mb-6">
          LASTEST VIDEO
        </h2>
        <div className="relative w-full min-h-[30vh] flex-1 mt-4">
          <Image
            src="/images/lastvideo.jpg"
            alt="Product Banner"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 20vw"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle className="w-16 h-16 text-white hover:opacity-100 transition duration-300 cursor-pointer bg-black rounded-[50%] opacity-30" />
          </div>
        </div>
      </div>
    </div>
  );
}

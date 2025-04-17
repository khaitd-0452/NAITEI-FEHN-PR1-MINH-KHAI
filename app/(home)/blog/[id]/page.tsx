import PageBreadCrumb from "@/components/layout/page_bread_crumb";
import React from "react";
import Image from "next/image";
import BlogMain from "@/components/blog/blog-main";
import { Blog, BlogDetail } from "@/lib/types/blog";
import axios from "axios";

export async function getBlogDetail(params: {
  id: string;
}): Promise<BlogDetail | null> {
  try {
    const { id } = await params;
    const res = await axios.get(
      `${process.env.SERVER_API_URL}/blogs/${id}?_expand=user&_embed=comments`
    );
    const blogDetailData: BlogDetail = res.data;
    return blogDetailData;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return null;
  }
}

export async function getRecommendBlogs(
  blogDetailData: BlogDetail
): Promise<Blog[] | null> {
  try {
    const res = await axios.get(`${process.env.SERVER_API_URL}/blogs`);
    const recommendBlogs: Blog[] = res.data.filter((blog: Blog) => {
      return (
        blog.id !== blogDetailData.id &&
        blog.tags.some((tag) => blogDetailData.tags.includes(tag))
      );
    });
    return recommendBlogs;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return null;
  }
}

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const blogDetail = await getBlogDetail(params);
  const recommendBlogs = await getRecommendBlogs(blogDetail!);
  if (!blogDetail) {
    return (
      <main className="container mx-auto max-w-[1200px] mt-6 mb-40 space-y-8 px-4 ">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="text-gray-700">
          The blog you are looking for does not exist or an error occurred.
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-[1200px] mt-6 mb-40 space-y-8 px-4 ">
      <PageBreadCrumb />
      <div className="flex flex-col w-full justify-start">
        <h2 className="text-xl md:text-2xl font-medium text-gray-700">BLOG</h2>
        <Image
          src={"/images/titleleft-dark.png"}
          alt="title underline"
          width={200}
          height={100}
          className="w-[70px] mt-2"
        />
      </div>
      <BlogMain
        blogDetail={blogDetail}
        initRecommendBlogs={recommendBlogs || []}
      />
    </main>
  );
}

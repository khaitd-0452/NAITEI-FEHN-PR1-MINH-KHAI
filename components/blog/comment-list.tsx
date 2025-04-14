"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Comment } from "@/lib/types/comment";
import { cn } from "@/lib/utils";
import { formatTimeAgo } from "@/lib/utils";

interface CommentListWithPaginationProps {
  comments: Comment[];
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-row justify-end items-center mb-4 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "w-8 h-8 flex items-center justify-center bg-black text-white text-sm",
          currentPage === 1 && "opacity-20 cursor-not-allowed",
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
            "w-8 h-8 flex items-center justify-center text-sm border border-gray-300 cursor-pointer",
            page === currentPage
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-100"
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "w-8 h-8 flex items-center justify-center bg-black text-white text-sm",
          currentPage === totalPages && "opacity-20 cursor-not-allowed",
          currentPage < totalPages && "cursor-pointer"
        )}
      >
        &gt;
      </button>
    </div>
  );
}

function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="mb-8 pb-4 border-b">
      <div className="flex justify-between items-center mb-2 bg-gray-100 py-3 px-6 rounded-sm">
        <span className="font-medium text-sm text-gray-600 italic">
          Bình luận bởi {comment.username}
        </span>
        <span className="font-medium text-sm text-gray-600 italic">
          {formatTimeAgo(comment.created_at)}
        </span>
      </div>
      <p className="text-gray-600 text-sm mt-3 ml-4">{comment.content}</p>
      <div className="mt-2 flex justify-end">
        <button className="text-sm text-gray-700 font-medium hover:underline cursor-pointer">
          Trả lời
        </button>
      </div>
    </div>
  );
}

export default function CommentListWithPagination({
  comments,
}: CommentListWithPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(comments.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [comments.length]);

  const paginatedComments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return comments.slice(start, start + itemsPerPage);
  }, [comments, currentPage]);

  return (
    <div className="mt-10">
      <h2 className="text-base font-medium mb-6 text-gray-800">
        BÌNH LUẬN ({comments.length})
      </h2>
      {comments.length === 0 ? (
        <p className="text-gray-500">Chưa có bình luận nào.</p>
      ) : (
        <>
          <div className="space-y-6">
            {paginatedComments.map((comment, index) => (
              <CommentItem key={index} comment={comment} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
}

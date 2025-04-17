"use client";
import React from "react";
import LabeledInput from "@/components/signin-signup/input-label";

interface CommentFormProps {
  formData: { comment: string; email: string; username: string };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmitComment: (e: React.FormEvent) => void;
}

export default function CommentForm({
  formData,
  handleInputChange,
  handleSubmitComment,
}: CommentFormProps) {
  return (
    <div className="mt-12">
      <h2 className="text-base font-medium mb-6 text-gray-800 italic">
        ĐÓNG GÓP Ý KIẾN
      </h2>
      <form onSubmit={handleSubmitComment} className="mb-8">
        <LabeledInput
          label="Tên"
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleInputChange}
          required
          classNameLabel="text-xs text-gray-700 italic"
        />

        <LabeledInput
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          classNameLabel="text-xs text-gray-700 italic"
        />

        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-gray-700 mb-2 text-xs italic"
          >
            Bình luận <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            value={formData.comment}
            onChange={handleInputChange}
            rows={5}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 cursor-pointer"
        >
          GỬI Ý KIẾN
        </button>
      </form>
    </div>
  );
}

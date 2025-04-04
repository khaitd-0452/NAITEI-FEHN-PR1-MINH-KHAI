"use client";
import { Star } from "lucide-react";
import React from "react";

export default function RenderTabContent(activeTab: string) {
  switch (activeTab) {
    case "highlights":
    case "info":
      return (
        <div className="py-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2 text-gray-500">
              {activeTab === "highlights"
                ? "ĐẶC ĐIỂM NỔI BẬT"
                : "THÔNG TIN SẢN PHẨM"}
            </h3>
            <p className="text-gray-500 text-xs">
              Đừng nghĩ rằng chỉ vì đôi chân to mà bạn không thể mặc được món đồ
              nào khác ngoài quần dài. Sau đây là những item vừa trendy lại vừa
              có tác dụng rất hiệu quả trong việc điều chỉnh đôi chân to của
              bạn. Mùa hè là mùa của những bộ cánh thoải mái, thoáng mát và hầu
              có gần như cùng mục đích khoe chân tối đa. Tuy nhiên, điều này lại
              không hề dễ dàng đối với những cô nàng sở hữu đôi chân to. Vậy
              điểm đó thế nào để vừa tạo cảm giác nhẹ nhàng nhưng lại khéo léo
              giấu được những điểm này? Sau đây, chúng tôi xin đưa ra gợi ý về
              loại item mà các cô nàng chân to nên găn bó trong mùa hè này.
            </p>
          </div>
        </div>
      );
    case "reviews":
      return (
        <div className="py-6">
          <h3 className="text-lg font-medium mb-4 text-gray-500">
            ĐÁNH GIÁ SẢN PHẨM
          </h3>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h4 className="font-medium mb-4 text-gray-600">
              Viết đánh giá của bạn
            </h4>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Tên của bạn
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-600"
                placeholder="Nhập tên của bạn"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Đánh giá
              </label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="text-gray-300 hover:text-yellow-300"
                  >
                    <Star fill="currentColor" size={24} />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nội dung đánh giá
              </label>
              <textarea
                id="comment"
                rows={5}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 text-gray-600"
                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm"
              />
            </div>

            <button className="bg-yellow-300 text-white px-4 py-2 rounded hover:bg-yellow-300 transition">
              Gửi đánh giá
            </button>
          </div>

          <div className="border-t pt-4">
            <p className="text-center text-gray-500">
              Chưa có đánh giá nào cho sản phẩm này
            </p>
          </div>
        </div>
      );
    default:
      return null;
  }
}

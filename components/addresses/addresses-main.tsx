"use client";
import AddressCard from "@/components/addresses/address-card";
import AddressEditForm from "@/components/addresses/address-form";
import { Address } from "@/lib/types/address";
import { useState } from "react";

export default function AddressesMain() {
  const [formInstances, setFormInstances] = useState<number[]>([]);

  const addresses: Address[] = [
    {
      id: "0acf2e6f-702b-4e7d-aeb9-6fbbf4ab4dad",
      userId: "d587573e-73b2-4fe9-89d8-3cfbcf63f672",
      first_name: "Giang",
      last_name: "Lê Anh",
      company: "Cổ phần công nghệ DKT",
      address: "Tòa nhà Hà Nội Group, 442 Đội Cấn, Ba Đình, Hà Nội",
      city: "Hà Nội",
      country: "Việt Nam",
      zipcode: "1000",
      phone: "123-456-7800",
      default: true,
      created_at: "2025-03-25T12:43:39.593251",
      updated_at: "2024-09-25T11:13:46.593266",
    },
    {
      id: "1bcf3e7f-803c-5e8d-bec0-7fccf5bc5dad",
      userId: "d587573e-73b2-4fe9-89d8-3cfbcf63f672",
      first_name: "First2",
      last_name: "Last2",
      company: "Company2",
      address: "2 Avenue Road",
      city: "Hanoi",
      country: "Vietnam",
      zipcode: "2000",
      phone: "234-567-8901",
      default: false,
      created_at: "2025-03-22T10:33:29.593251",
      updated_at: "2024-09-22T09:03:46.593266",
    },
  ];

  const handleAddForm = () => {
    setFormInstances((prev) => [...prev, Date.now()]); // Sử dụng timestamp làm key duy nhất
  };

  const handleRemoveForm = (id: number) => {
    setFormInstances((prev) => prev.filter((formId) => formId !== id));
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <span className="text-lg text-gray-700 font-medium mt-2">
          ĐỊA CHỈ CỦA BẠN
        </span>
        <button
          className="bg-blue-500 py-2 px-5 rounded text-sm font-medium text-white hover:bg-blue-600 transition duration-200 cursor-pointer"
          onClick={handleAddForm}
        >
          Thêm địa chỉ
        </button>
      </div>
      <div className="flex w-full flex-row">
        <div className="w-1/2 mt-5 flex flex-col gap-4">
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
        <div className="w-1/2 flex flex-col gap-4 items-start justify-start mt-5">
          {formInstances.map((formId) => (
            <div key={formId} className="relative w-full">
              <AddressEditForm
                handleRemoveForm={handleRemoveForm}
                id={formId}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

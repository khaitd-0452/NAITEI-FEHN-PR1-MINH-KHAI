"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { AddressFormInput } from "@/lib/types/address";

interface AddressEditFormProps {
  id: number;
  handleRemoveForm: (id: number) => void;
}

export default function AddressEditForm({
  id,
  handleRemoveForm,
}: AddressEditFormProps) {
  const [address, setAddress] = useState<AddressFormInput>({
    first_name: "",
    last_name: "",
    company: "",
    address: "",
    city: "",
    country: "",
    zipcode: "",
    phone: "",
    default: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting:", address);
  };

  const renderInputField = (
    label: string,
    name: keyof AddressFormInput,
    type: string = "text"
  ) => (
    <div className="flex flex-row items-center">
      <label className="mb-1 text-sm font-medium text-gray-700 w-1/4">
        {label}
      </label>
      <Input
        name={name}
        value={String(address[name])}
        onChange={handleChange}
        type={type}
        className="flex-1 rounded"
      />
    </div>
  );

  return (
    <div className="w-full mx-auto py-8 pl-15">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {renderInputField("Tên", "first_name")}
          {renderInputField("Họ & tên đệm", "last_name")}
          {renderInputField("Công ty", "company")}
          {renderInputField("Địa chỉ", "address")}
          {renderInputField("Thành phố", "city")}
          {renderInputField("Quốc Tịch", "country")}
          {renderInputField("Postal/Zip Code", "zipcode")}
          {renderInputField("Phone", "phone", "tel")}

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="default"
              name="default"
              checked={address.default}
              onChange={handleChange}
              className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="default" className="ml-2 text-sm text-gray-700">
              Đặt làm địa chỉ mặc định?
            </label>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-6 text-sm font-medium rounded cursor-pointer"
            >
              Cập nhật địa chỉ
            </button>
            <button
              type="button"
              className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-6 text-sm font-medium rounded cursor-pointer"
              onClick={() => handleRemoveForm(id)}
            >
              Thoát
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

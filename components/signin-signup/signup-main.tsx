"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import LabeledInput from "@/components/signin-signup/input-label";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  subscribeToNewsletter: boolean;
}

export default function SignUpMain() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    subscribeToNewsletter: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const serverApiUrl =
      process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:5000";
    const requiredFields = [
      "firstName",
      "lastName",
      "username",
      "email",
      "password",
      "confirmPassword",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof RegistrationFormData]) {
        toast.error("Vui lòng điền đầy đủ tất cả các trường bắt buộc!", {
          style: {
            background: "red",
            color: "#fff",
          },
        });
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu và xác nhận mật khẩu không khớp!", {
        style: {
          background: "red",
          color: "#fff",
        },
      });
      return;
    }

    try {
      const response = await axios.get(`${serverApiUrl}/users`, {
        params: { email: formData.email },
      });

      if (response.status === 200) {
        if (response.data.length > 0) {
          throw new Error(
            "Email này đã được sử dụng, vui lòng chọn email khác!"
          );
        }
      } else {
        throw new Error(`API responded with status ${response.status}`);
      }
    } catch (error) {
      let errorMessage = "Có lỗi xảy ra khi kiểm tra email, vui lòng thử lại.";
      if (axios.isAxiosError(error)) {
        errorMessage = `Lỗi API: ${
          error.response?.data?.message || error.message
        }`;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage, {
        style: {
          background: "red",
          color: "#fff",
        },
      });
      return;
    }

    try {
      const currentTime = new Date().toISOString();
      const {
        firstName,
        lastName,
        username,
        email,
        password,
        subscribeToNewsletter,
      } = formData;
      const userData = {
        id: crypto.randomUUID(),
        full_name: `${firstName} ${lastName}`,
        username,
        email,
        password,
        subscribeToNewsletter,
        role: "user",
        created_at: currentTime,
        updated_at: currentTime,
      };

      const response = await axios.post(`${serverApiUrl}/users`, userData);

      if (response.status === 201 || response.status === 200) {
        toast.success("Đăng ký thành công!", {
          style: {
            background: "green",
            color: "#fff",
          },
          icon: <CheckCircle2 className="text-white" />,
        });
        router.push("/auth/sign-in");
      } else {
        throw new Error(`API responded with status ${response.status}`);
      }
    } catch (error) {
      let errorMessage = "Có lỗi xảy ra khi đăng ký, vui lòng thử lại.";
      if (axios.isAxiosError(error)) {
        errorMessage = `Lỗi API: ${
          error.response?.data?.message || error.message
        }`;
      }
      toast.error(errorMessage, {
        style: {
          background: "red",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="w-full mx-auto py-2">
      <div className="border border-gray-200 p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <h2 className="text-lg font-medium uppercase mb-6">
              THÔNG TIN CÁ NHÂN
            </h2>

            <LabeledInput
              label="Tên trước"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <LabeledInput
              label="Tên sau"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            <LabeledInput
              label="Tài khoản"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <LabeledInput
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="subscribeToNewsletter"
                name="subscribeToNewsletter"
                checked={formData.subscribeToNewsletter}
                onChange={handleChange}
                className="mr-2 h-4 w-4"
              />
              <label
                htmlFor="subscribeToNewsletter"
                className="text-gray-600 cursor-pointer"
              >
                Đăng ký nhận bản tin
              </label>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium uppercase mb-6">
              THÔNG TIN ĐĂNG NHẬP
            </h2>

            <LabeledInput
              label="Mật khẩu"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              showToggle
            />

            <LabeledInput
              label="Xác nhận mật khẩu"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              showToggle
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 uppercase font-medium text-sm hover:bg-gray-800 transition-colors cursor-pointer"
            >
              GỬI
            </button>
            <button
              type="button"
              className="bg-black text-white px-6 py-2 uppercase font-medium text-sm hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={() => window.history.back()}
            >
              QUAY LẠI
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

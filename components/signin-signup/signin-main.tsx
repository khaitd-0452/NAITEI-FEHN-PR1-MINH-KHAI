"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "@/app/context/AuthContext";
import LabeledInput from "@/components/signin-signup/input-label";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
}

export default function SignInMain() {
  const { setCurrentUser } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const serverApiUrl =
        process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:5000";
      const response = await axios.get(`${serverApiUrl}/users`, {
        params: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (response.status === 200) {
        const users = response.data;
        if (users.length === 0) {
          throw new Error("Sai email hoặc mật khẩu");
        }

        const user = users[0];
        Cookies.set("user", JSON.stringify(user));
        setCurrentUser(user);
        toast.success("Đăng nhập thành công!", {
          style: {
            background: "green",
            color: "#fff",
          },
          icon: <CheckCircle2 className="text-white" />,
        });
        router.push("/");
      } else {
        throw new Error(`API responded with status ${response.status}`);
      }
    } catch (error) {
      let errorMessage = "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.";
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
    }
  };

  return (
    <div className="border border-gray-200 p-8 w-full mt-2">
      <h2 className="text-lg font-medium uppercase mb-2">
        KHÁCH HÀNG ĐĂNG NHẬP
      </h2>
      <p className="text-gray-600 mb-8">
        Nếu bạn có một tài khoản, xin vui lòng đăng nhập.
      </p>

      <form onSubmit={handleSubmit}>
        <LabeledInput
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

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

        <div className="flex items-center mb-6">
          <input type="checkbox" id="remember" className="mr-2 h-4 w-4" />
          <label htmlFor="remember" className="text-gray-600 cursor-pointer">
            Quên mật khẩu
          </label>
        </div>

        <button
          type="submit"
          className="bg-black text-white px-8 py-2 uppercase font-medium text-sm hover:bg-gray-800 transition-colors cursor-pointer"
        >
          ĐĂNG NHẬP
        </button>
      </form>
    </div>
  );
}

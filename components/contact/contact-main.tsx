"use client";
import React from "react";
import dynamic from "next/dynamic"; // Import dynamic
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaGooglePlusG,
  FaTwitter,
  FaPinterestP,
  FaVk,
} from "react-icons/fa";
import Image from "next/image";

const ContactMapLeaflet = dynamic(
  () => import("@/components/contact/map-leaflet"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 w-full md:h-full md:min-h-[450px] bg-muted flex items-center justify-center text-muted-foreground rounded-md">
        Đang tải bản đồ...
      </div>
    ),
  }
);

const contactInfo = {
  address:
    "Tầng 4, Tòa nhà Hanoi Group Số 442 Đội Cần, P. Cống Vị, Q. Ba Đình, Hà Nội",
  phone: "(04) 6674 2332",
  email: "support@mitano.com",
  socials: [
    { name: "Facebook", icon: FaFacebookF, href: "#" },
    { name: "Google+", icon: FaGooglePlusG, href: "#" },
    { name: "Twitter", icon: FaTwitter, href: "#" },
    { name: "Pinterest", icon: FaPinterestP, href: "#" },
    { name: "VK", icon: FaVk, href: "#" },
  ],
};
export default function ContactMain() {
  return (
    <div className="grid grid-cols-1 mb-10 md:grid-cols-3 gap-8 md:gap-12">
      <div className="md:col-span-2">
        <ContactMapLeaflet />
      </div>

      <div className="md:col-span-1 space-y-4">
        <div className="mb-6">
          <Image
            src="/images/logo.PNG"
            alt="Wine House Logo"
            width={150}
            height={150}
            className="w-32 h-auto"
          />
        </div>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className=" mt-1 flex-shrink-0" size={16} />
            <span>{contactInfo.address}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="" size={14} />
            <span>{contactInfo.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="" size={14} />
            <a
              href={`mailto:${contactInfo.email}`}
              className="hover:text-yellow-700 hover:underline"
            >
              {contactInfo.email}
            </a>
          </div>
        </div>
        <div className="pt-4">
          <p className="text-sm font-semibold mb-3 text-gray-800">FOLLOW US:</p>
          <div className="flex items-center gap-3">
            {contactInfo.socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-yellow-600 transition-colors"
                aria-label={social.name}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <form className=" space-y-4 md:col-span-2">
        <Input
          type="text"
          placeholder="Họ và tên"
          required
          aria-label="Họ và tên"
        />
        <Input type="email" placeholder="Email" required aria-label="Email" />
        <Input
          type="text"
          placeholder="Tiêu đề"
          required
          aria-label="Tiêu đề"
        />
        <Textarea
          placeholder="Lời nhắn của bạn"
          required
          rows={5}
          aria-label="Lời nhắn của bạn"
        />
        <Button
          type="submit"
          className="bg-black hover:bg-gray-800 text-white px-6"
        >
          GỬI
        </Button>
      </form>
    </div>
  );
}

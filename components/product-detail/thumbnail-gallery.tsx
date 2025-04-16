"use client";
import Image from "next/image";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Image = {
  url: string;
  alt: string;
};

interface ThumbnailProps {
  productImage: Image;
  thumbnails: Image[];
  setProductImage: (image: Image) => void;
}

const ThumbnailGallery: React.FC<ThumbnailProps> = ({
  productImage,
  thumbnails,
  setProductImage,
}: ThumbnailProps) => {
  return (
    <div className="hidden lg:flex flex-col justify-between items-center w-24 flex-shrink-0 border py-5">
      <button className="p-2 border border-yellow-300 hover:border-yellow-500">
        <ChevronUp size={20} color="#E5B449" />
      </button>
      <div className="flex flex-col items-center space-y-2">
        {thumbnails.map((thumbnail, index) => (
          <div
            key={index}
            className="w-16 h-20 relative cursor-pointer"
            onClick={() =>
              setProductImage({ url: thumbnail.url, alt: thumbnail.alt })
            }
          >
            <Image
              src={thumbnail.url}
              alt={thumbnail.alt}
              fill
              className={cn(
                "object-contain border",
                index ===
                  thumbnails.findIndex(
                    (thumbnail) =>
                      thumbnail.url === productImage.url &&
                      thumbnail.alt === productImage.alt
                  )
                  ? "border-yellow-500"
                  : "border-transparent"
              )}
            />
          </div>
        ))}
      </div>
      <button className="p-2 border border-yellow-300 hover:border-yellow-500">
        <ChevronDown size={20} color="#E5B449" />
      </button>
    </div>
  );
};

export default ThumbnailGallery;

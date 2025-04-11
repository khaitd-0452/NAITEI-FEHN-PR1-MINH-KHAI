import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export default async function NotFound() {
  return (
    <div className=" bg-background flex justify-center  items-center">
      <Image
        src={"/images/404.jpg"}
        alt="404"
        width={500}
        height={500}
        className="w-screen h-sc"
      />
      <div className="absolute bottom-20 text-center  text-muted-foreground">
        <Button asChild size={"lg"} className="text-xl py-7">
          <Link href="/">Quay lại trang chủ</Link>
        </Button>
      </div>
    </div>
  );
}

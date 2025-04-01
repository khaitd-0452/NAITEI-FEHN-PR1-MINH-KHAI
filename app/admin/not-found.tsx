import Image from "next/image";
export default async function NotFound() {
  return (
    <div className="w-screen h-screen bg-background flex justify-center  items-center">
      {/* Using the dictionary by selected language: */}
      <div className="w-fit relative flex justify-center">
        <Image
          //   className="dark:invert"
          src="/vercel.svg"
          alt="Vercel logomark"
          width={300}
          height={300}
        />
        <div className="flex self-end flex-col sm:ml-10 ml-4  ">
          <h1 className="sm:text-9xl text-7xl font-bold mb-6 mt-8 silver">
            404
          </h1>
          <h2 className="sm:text-2xl  font-bold silver uppercase">
            Đường dẫn không tồn tại
          </h2>
        </div>
      </div>
    </div>
  );
}

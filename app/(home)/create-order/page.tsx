import PageBreadCrumb from "@/components/layout/page_bread_crumb";
import Image from "next/image";
import axios from "axios";
import { Address, Cart } from "@/lib/types";
import CreateOrderClient from "@/components/create-order/create-order-client";
import { getCurrentUserServer } from "@/lib/server-utils";
import { notFound } from "next/navigation";

async function getCartChecked(userId: string): Promise<Cart[]> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/carts?userId=${userId}&checked=true&_expand=product`
    );
    const cartsData = res.data.map(
      (cart: any, index: number) =>
        ({
          checked: cart.checked,
          id: cart.id as string,
          productId: cart.productId as string,
          quantity: cart.quantity as number,
          createdAt: cart.createdAt as string,
          updatedAt: cart.updatedAt as string,
          product: {
            id: cart.product.id,
            name: cart.product.name,
            image: cart.product.images[0].url,
            price: cart.product.price,
            description: cart.product.description,
            color: cart.product.color,
            productInfo: cart.product.product_info,
            size: cart.product.size,
            tags: cart.product.tags,
            point: cart.product.point,
            highlights: cart.product.highlights,
            category: cart.product.category,
            subCategory: cart.product.sub_category,
            createdAt: cart.product.created_at,
            updatedAt: cart.product.updated_at,
            stock: cart.product.stock,
          },
        } as Cart)
    );
    return cartsData;
  } catch (error) {
    console.error("Failed to fetch carts:", error);
    return [];
  }
}

async function getAddresses(userId: string): Promise<Address[]> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/addresses?userId=${userId}`
    );

    return res.data.map((address: any) => {
      return {
        id: address.id,
        first_name: address.first_name,
        last_name: address.last_name,
        company: address.company,
        address: address.address,
        city: address.city,
        country: address.country,
        zipcode: address.zipcode,
        phone: address.phone,
        default: address.default,
        created_at: address.created_at,
        updated_at: address.updated_at,
      } as Address;
    });
  } catch (error) {
    console.error("Failed to fetch addresses:", error);
    return [];
  }
}
export default async function CreateOrder() {
  const currentUser = await getCurrentUserServer();
  if (!currentUser) {
    notFound();
  }
  const initialCarts = await getCartChecked(currentUser.id);
  const initialAddresses = await getAddresses(currentUser.id);
  const addressDefault = initialAddresses.find((address) => address.default);

  return (
    <main className="container mx-auto max-w-[1200px] mt-6 mb-40 space-y-8 px-4 ">
      <PageBreadCrumb />

      <div>
        <h1 className="text-3xl font-semibold">TẠO ĐƠN HÀNG</h1>
        <Image
          src={"/images/titleleft-dark.png"}
          alt="title underline"
          width={200}
          height={100}
          className="w-[70px] mt-1 mb-4"
        />
      </div>
      <CreateOrderClient carts={initialCarts} addresses={initialAddresses} />
    </main>
  );
}

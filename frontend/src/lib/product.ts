import { revalidatePath } from "next/cache";

async function getProducts() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "api/product",
    {
      method: "GET",
    }
  );
  revalidatePath("/");
  return response.json();
}

async function getProductById(id: string) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "api/product/" + id,
    {
      method: "GET",
    }
  );
  revalidatePath("/product/" + id);
  return response.json();
}
export { getProducts, getProductById };

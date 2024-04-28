"use server";

import { revalidatePath } from "next/cache";

export async function createProduct(
  prevState,
  formData,
) {
  const data = {product: formData.get("product")};
  console.log(data)

  try {
    await fetch(`http://${process.env.PRODUCT_API}:8080/${data["product"]}`, {method: "POST", cache: 'no-store'}).then(response => response.text());

    revalidatePath("/");
    return { message: `Added product ${data.product}` };
  } catch (e) {
    return { message: "Failed to create product" };
  }
}

export async function deleteProduct(
  prevState,
  formData,
) {
  const data = {
    id: formData.get("id"),
    text: formData.get("text"),
  };
  console.log(data)

  try {
    await fetch(`http://${process.env.PRODUCT_API}:8080/${data["id"]}`, {method: "DELETE", cache: 'no-store'}).then(response => response.text());

    revalidatePath("/");
    return { message: `Deleted product ${data.text}` };
  } catch (e) {
    return { message: "Failed to delete product" };
  }
}
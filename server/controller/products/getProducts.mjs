import listProducts from "../../service/products/listProducts.mjs";

export default async function getProducts() {
  const products = await listProducts();
  return { headers: {}, statusCode: 200, body: { products } };
}

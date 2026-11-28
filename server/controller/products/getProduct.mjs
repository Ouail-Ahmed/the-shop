import findProduct from "../../service/products/findProduct.mjs";

export default async function getProduct(httpRequest) {
  const product = await findProduct(httpRequest.params.id);
  if (!product) {
    return { headers: {}, statusCode: 404, body: { error: "Product not found" } };
  }
  return { headers: {}, statusCode: 200, body: { product } };
}

import productsDb from "../../database/productsDb.mjs";
import { buildProduct } from "../../model/product.mjs";

// Throws ValidationError when the input is not a valid product.
export default async function createProduct(input) {
  const product = buildProduct(input);
  return productsDb.insert(product);
}

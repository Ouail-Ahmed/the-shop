import productsDb from "../../database/productsDb.mjs";

export default async function findProduct(id) {
  return productsDb.findById(id);
}

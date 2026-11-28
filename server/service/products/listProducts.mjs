import productsDb from "../../database/productsDb.mjs";

export default async function listProducts() {
  return productsDb.findAll();
}

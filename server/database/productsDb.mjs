import { readFile } from "node:fs/promises";

// The file store from the json-server days. Lesson 20 replaces this module
// with MongoDB and keeps the same function names.
const DB_FILE = new URL("../../data/db.json", import.meta.url);

async function readProducts() {
  const raw = await readFile(DB_FILE, "utf8");
  return JSON.parse(raw).products;
}

async function findAll() {
  return readProducts();
}

async function findById(id) {
  const products = await readProducts();
  return products.find((product) => product.id === id) ?? null;
}

const productsDb = Object.freeze({ findAll, findById });

export default productsDb;

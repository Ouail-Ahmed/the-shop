import { readFile, writeFile } from "node:fs/promises";

// The file store from the json-server days. Lesson 20 replaces this module
// with MongoDB and keeps the same function names.
const DB_FILE = new URL("../../data/db.json", import.meta.url);

async function readDatabase() {
  return JSON.parse(await readFile(DB_FILE, "utf8"));
}

// Writes wait for each other, so two requests cannot overwrite one another.
let writeQueue = Promise.resolve();

async function findAll() {
  return (await readDatabase()).products;
}

async function findById(id) {
  const products = await findAll();
  return products.find((product) => product.id === id) ?? null;
}

function insert(product) {
  const task = writeQueue.then(async () => {
    const database = await readDatabase();
    database.products.push(product);
    await writeFile(DB_FILE, `${JSON.stringify(database, null, 2)}\n`);
    return product;
  });
  writeQueue = task.catch(() => {});
  return task;
}

const productsDb = Object.freeze({ findAll, findById, insert });

export default productsDb;

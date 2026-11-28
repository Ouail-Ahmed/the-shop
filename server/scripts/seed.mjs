import "dotenv/config";
import mongoose from "mongoose";
import { readFile } from "node:fs/promises";
import connectDb from "../database/connection.mjs";
import Product from "../database/schemas/productSchema.mjs";

// Loads the products from data/db.json. Existing products with the same id are
// replaced, so the script is safe to run more than once.
const DB_FILE = new URL("../../data/db.json", import.meta.url);

try {
  await connectDb();
  const { products } = JSON.parse(await readFile(DB_FILE, "utf8"));
  await Product.bulkWrite(
    products.map((product) => ({
      replaceOne: {
        filter: { id: product.id },
        replacement: product,
        upsert: true,
      },
    })),
  );
  console.log(`Seeded ${products.length} products`);
} catch (err) {
  console.error(`Seed failed: ${err.message}`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}

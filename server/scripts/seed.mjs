import "dotenv/config";
import mongoose from "mongoose";
import { readFile } from "node:fs/promises";
import connectDb from "../database/connection.mjs";
import User from "../database/schemas/userSchema.mjs";
import { buildUser } from "../model/user.mjs";
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

  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (ADMIN_EMAIL && ADMIN_PASSWORD) {
    const { id, ...admin } = await buildUser(
      { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
      "admin",
    );
    // Running the seed again resets the admin password to the one in .env.
    await User.findOneAndUpdate(
      { email: admin.email },
      { $set: admin, $setOnInsert: { id } },
      { upsert: true },
    );
    console.log(`Admin user ready: ${admin.email}`);
  } else {
    console.log("ADMIN_EMAIL or ADMIN_PASSWORD not set, skipping admin user");
  }
} catch (err) {
  console.error(`Seed failed: ${err.message}`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}

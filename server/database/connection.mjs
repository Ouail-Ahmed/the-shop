import mongoose from "mongoose";

export default async function connectDb() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not set. Copy .env.example to .env first.");
  }
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
}

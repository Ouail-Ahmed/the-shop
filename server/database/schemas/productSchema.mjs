import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Public id used in URLs, such as "sofa-01". MongoDB's own _id stays hidden.
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    material: { type: String, required: true },
    inStock: { type: Boolean, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);

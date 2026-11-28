import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
  },
  {
    toJSON: {
      // Never send password data to a client, even by accident.
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
        delete ret.passwordHash;
        delete ret.salt;
        return ret;
      },
    },
  },
);

export default mongoose.models.User || mongoose.model("User", userSchema);

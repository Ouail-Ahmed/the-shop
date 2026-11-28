import crypto from "node:crypto";
import { sanitizeText } from "../helper/sanitize.mjs";

export class ValidationError extends Error {}

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

// Builds a product from untrusted input, or throws a ValidationError.
// Only known fields are copied, so extra fields (such as a client-chosen id)
// are ignored.
export function buildProduct(input = {}) {
  const title = sanitizeText(input.title);
  const imageUrl = sanitizeText(input.imageUrl);
  const material = sanitizeText(input.material);
  const category = sanitizeText(input.category);
  const description = sanitizeText(input.description);
  const { price, inStock } = input;

  if (!title) throw new ValidationError("Title is required");
  if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
    throw new ValidationError("Price must be a number greater than 0");
  }
  if (!isHttpUrl(imageUrl)) {
    throw new ValidationError("Image URL must be a valid http or https URL");
  }
  if (!material) throw new ValidationError("Material is required");
  if (!category) throw new ValidationError("Category is required");
  if (typeof inStock !== "boolean") {
    throw new ValidationError("inStock must be true or false");
  }
  if (!description) throw new ValidationError("Description is required");

  return Object.freeze({
    id: crypto.randomUUID(),
    title,
    price,
    imageUrl,
    material,
    inStock,
    category,
    description,
  });
}

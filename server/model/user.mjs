import crypto from "node:crypto";
import { sanitizeText } from "../helper/sanitize.mjs";
import { hashPassword } from "../helper/passwordHelper.mjs";
import { ValidationError } from "./product.mjs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(value) {
  return sanitizeText(value).toLowerCase();
}

// Checks a new account's input and returns the entity to store.
// The role is never read from input: public sign-up always makes a customer.
export async function buildUser(input = {}, role = "customer") {
  const email = normalizeEmail(input.email);
  const { password } = input;

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    throw new ValidationError("A valid email is required");
  }
  if (
    typeof password !== "string" ||
    password.length < 8 ||
    password.length > 128
  ) {
    throw new ValidationError("Password must be 8 to 128 characters");
  }

  const { salt, passwordHash } = await hashPassword(password);
  return { id: crypto.randomUUID(), email, passwordHash, salt, role };
}

import crypto from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(crypto.scrypt);
const KEY_LENGTH = 64;

// A new random salt for every password, so equal passwords get different hashes.
export async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = await scrypt(password, salt, KEY_LENGTH);
  return { salt, passwordHash: hash.toString("hex") };
}

export async function verifyPassword(password, salt, passwordHash) {
  const hash = await scrypt(password, salt, KEY_LENGTH);
  const expected = Buffer.from(passwordHash, "hex");
  // timingSafeEqual needs equal lengths and compares in constant time.
  return (
    hash.length === expected.length && crypto.timingSafeEqual(hash, expected)
  );
}

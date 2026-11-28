import usersDb from "../../database/usersDb.mjs";
import { normalizeEmail } from "../../model/user.mjs";
import { hashPassword, verifyPassword } from "../../helper/passwordHelper.mjs";
import { signAccessToken } from "../../helper/jwtHelper.mjs";

export class InvalidCredentialsError extends Error {}

// Used when the email is unknown, so the request takes about as long as a real
// check and does not reveal which emails exist.
const decoy = await hashPassword("decoy-password");

export default async function loginUser({ email, password } = {}) {
  const user = await usersDb.findByEmail(normalizeEmail(email));
  const passwordText = typeof password === "string" ? password : "";
  const target = user ?? decoy;
  const matches = await verifyPassword(
    passwordText,
    target.salt,
    target.passwordHash,
  );

  if (!user || !matches) throw new InvalidCredentialsError("Invalid email or password");
  return { user: user.toJSON(), accessToken: signAccessToken(user) };
}

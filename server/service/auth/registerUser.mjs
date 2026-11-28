import usersDb from "../../database/usersDb.mjs";
import { buildUser } from "../../model/user.mjs";
import { signAccessToken } from "../../helper/jwtHelper.mjs";

export class DuplicateEmailError extends Error {}

export default async function registerUser(input) {
  const entity = await buildUser(input);
  try {
    const user = await usersDb.insert(entity);
    return { user: user.toJSON(), accessToken: signAccessToken(user) };
  } catch (err) {
    // 11000 is MongoDB's duplicate key error.
    if (err.code === 11000) {
      throw new DuplicateEmailError("Email already registered");
    }
    throw err;
  }
}

import User from "./schemas/userSchema.mjs";

// Returns the full document (with hash and salt) for the login check.
async function findByEmail(email) {
  return User.findOne({ email: String(email) });
}

async function insert(user) {
  return User.create(user);
}

const usersDb = Object.freeze({ findByEmail, insert });

export default usersDb;

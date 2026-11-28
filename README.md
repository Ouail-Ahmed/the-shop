# Branch 21: Register and log in users

## Changes from Lesson 20

Lesson 20 stored products in MongoDB. This branch adds users. `POST /v1/auth/register` creates a customer account and `POST /v1/auth/login` checks a password. Both answer with `{ user, accessToken }`, where the access token is a signed JWT that expires after 15 minutes. Passwords are never stored: the database keeps a salted scrypt hash. Nothing is protected yet and the React app is unchanged. Lesson 22 uses the token to guard routes and adds a login page.

## What changed and where

- `server/database/schemas/userSchema.mjs` defines `id`, a unique `email`, `passwordHash`, `salt` and `role` (`"customer"` by default, or `"admin"`). Its `toJSON` transform removes `_id`, `__v`, `passwordHash` and `salt`, so a user object can never leak them.
- `server/database/usersDb.mjs` is the user version of `productsDb`: a frozen object with `findByEmail` and `insert`.
- `server/model/user.mjs` exports `buildUser`. It lowercases the email, checks its shape, requires a password of 8 to 128 characters, hashes it and returns the entity. It never reads a role from the request, so nobody can register as an admin. It reuses `ValidationError` from the product model.
- `server/helper/passwordHelper.mjs` hashes with `crypto.scrypt` and a random 16-byte salt per password, and compares with `crypto.timingSafeEqual`.
- `server/helper/jwtHelper.mjs` signs and verifies tokens with `jsonwebtoken`: algorithm HS256, the secret from `JWT_SECRET`, `sub` set to the user id, a `role` claim and `expiresIn: "15m"`. Verification names the allowed algorithm. `assertJwtConfig` makes the server refuse to start when the secret is missing or shorter than 32 characters.
- `server/service/auth/registerUser.mjs` and `loginUser.mjs` hold the steps. A duplicate email becomes a `DuplicateEmailError`. `loginUser` runs a password check against a decoy hash when the email is unknown, so timing does not reveal which emails exist.
- `server/controller/auth/postRegister.mjs` answers 201, 400 for invalid input or 409 for a taken email. `postLogin.mjs` answers 200, or 401 with the same message `Invalid email or password` for a wrong email or a wrong password.
- `server/route/authRoutes.mjs` is mounted at `/v1/auth` in `server/server.js`.
- `server/scripts/seed.mjs` also creates or updates an admin user from `ADMIN_EMAIL` and `ADMIN_PASSWORD`. `server/.env.example` lists `JWT_SECRET`, `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

## Authentication concept

A password hash is a one-way fingerprint. `scrypt` is deliberately slow and uses memory, so guessing passwords is expensive, and the per-user salt means two users with the same password have different hashes. A JWT has three parts: a header, a payload and a signature. Anyone can read the payload, so never put secrets in it. Only the server can create a valid signature, so a tampered token fails verification.

The reference server in the course material signs tokens with RS256, which uses a private and public key pair. That is useful when other services must verify tokens without being able to create them. This course uses HS256 with one shared secret, which is simpler and fine for a single server.

## Check the result

1. In `server/`, copy `.env.example` to `.env`. Set `JWT_SECRET` to a long random value (the example comment shows how to generate one) and choose an `ADMIN_PASSWORD`. Start MongoDB.
2. Run `npm --prefix server install`, then `npm --prefix server run seed`. Expect `Seeded 4 products` and `Admin user ready: ...`.
3. Run `npm run api`. With the placeholder `JWT_SECRET=replace-me` it stops with `Could not start`, which is the intended safety check.
4. Register: `curl -i -X POST -H "Content-Type: application/json" -d "{\"email\":\"bob@example.com\",\"password\":\"password123\"}" http://localhost:5000/v1/auth/register`. Expect 201, a user with role `customer` and no password fields, and an `accessToken`.
5. Repeat it for 409. Send a 5-character password for 400. Add `"role":"admin"` to the body and confirm the role is still `customer`.
6. Log in with the right password for 200. Use a wrong password, then an unknown email, and confirm both give the same 401 body.
7. Paste an `accessToken` into [jwt.io](https://jwt.io/) to read its payload (`sub`, `role`, `iat`, `exp`).
8. Log in with the admin email and password from `.env` and confirm `"role":"admin"`.
9. The React app still works as before. `npm run lint` and `npm run build` pass.

## Exercise

Add `GET /v1/auth/me`. Read the `Authorization: Bearer <token>` header, call `verifyAccessToken`, and return the user. Return 401 for a missing, invalid or expired token. Lesson 22 turns this idea into middleware.

## Read on the official docs

- [jsonwebtoken on npm](https://www.npmjs.com/package/jsonwebtoken)
- [jwt.io introduction](https://jwt.io/introduction)
- [Node.js `crypto.scrypt`](https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback)
- [Node.js `crypto.timingSafeEqual`](https://nodejs.org/api/crypto.html#cryptotimingsafeequala-b)
- [Mongoose: unique indexes](https://mongoosejs.com/docs/schematypes.html#indexes)
- [Express: security best practices](https://expressjs.com/en/advanced/best-practice-security.html)

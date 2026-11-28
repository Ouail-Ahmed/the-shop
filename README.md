# Branch 20: Store products in MongoDB

## Changes from Lesson 19

Lesson 19 saved products in `data/db.json`. This branch moves them into MongoDB with Mongoose. Only one file with logic changed in the request path: `server/database/productsDb.mjs`. The routes, controllers, services and the product model are untouched, and the React app is untouched. That is the payoff of the layers from lesson 18: the rest of the code only knows that `productsDb` has `findAll`, `findById` and `insert`, not where the data lives. The server now connects to MongoDB before it starts listening, and exits with a clear message if it cannot connect.

## What changed and where

- `server/database/connection.mjs` calls `mongoose.connect` with `process.env.MONGO_URI`. It throws a clear error when the variable is missing and gives up after five seconds if no database answers.
- `server/database/schemas/productSchema.mjs` describes a product. It keeps a unique string `id` field, so URLs such as `/products/sofa-01` still work, and its `toJSON` transform removes MongoDB's `_id` and `__v`, so API responses look the same as before.
- `server/database/productsDb.mjs` is rewritten with the same exported names. `findById` wraps the id in `String()`, so a query object cannot slip into the filter.
- `server/scripts/seed.mjs` loads the products from `data/db.json` into MongoDB. It replaces products with the same `id`, so you can run it again safely. Run it with `npm --prefix server run seed`.
- `server/server.js` loads `.env` with `dotenv`, awaits `connectDb()`, and only then calls `app.listen`. If the connection fails it prints what to check and exits with code 1.
- `server/.env.example` adds `MONGO_URI=mongodb://127.0.0.1:27017/the-shop`. Copy it to `server/.env`, which git ignores.
- `server/package.json` adds `mongoose` and `dotenv` and a `seed` script.

## MongoDB concept

MongoDB stores documents in collections. Mongoose adds a schema on top, so a document without a `title` is rejected before it is saved. Our `buildProduct` model still validates first, because it gives friendly errors, and the schema is a second safety net. A connection string like `mongodb://127.0.0.1:27017/the-shop` names the host, the port and the database. Keep it in the environment, not in code, so each machine and each deployment can use its own.

## Check the result

1. Install MongoDB Community Server and start it (default port 27017), or use a MongoDB Atlas connection string.
2. In `server/`, run `cp .env.example .env` and, if needed, edit `MONGO_URI`.
3. Run `npm --prefix server install`, then `npm --prefix server run seed`. Expect `Seeded 4 products`. Run it again and expect the same message with no duplicates.
4. Run `npm run api`. Expect `Connected to MongoDB` and then `API listening on http://localhost:5000`.
5. `curl http://localhost:5000/v1/products` returns the same `{ "products": [...] }` shape as lesson 19, without `_id` or `__v`.
6. Run `npm run dev`, add a product in the app and confirm it opens. Restart the API and confirm the product is still there. It is no longer written to `data/db.json`.
7. Stop MongoDB and run `npm run api`. Expect `Could not connect to MongoDB` and exit code 1.

## Exercise

Add a `createdAt` field with `timestamps: true` in the schema options and sort `findAll` by newest first. Check that no route, controller or service file changes.

## Read on mongoosejs.com

- [Mongoose: getting started](https://mongoosejs.com/docs/index.html)
- [Mongoose: schemas](https://mongoosejs.com/docs/guide.html)
- [Mongoose: connections](https://mongoosejs.com/docs/connections.html)
- [Mongoose: query injection and `sanitizeFilter`](https://mongoosejs.com/docs/api/mongoose.html#Mongoose.prototype.sanitizeFilter())
- [MongoDB: connection strings](https://www.mongodb.com/docs/manual/reference/connection-string/)
- [dotenv](https://github.com/motdotla/dotenv)

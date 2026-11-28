# Branch 18: Serve products from layered routes

## Changes from Lesson 17

Lesson 17 gave the server one health route. This branch makes it serve the catalog: `GET /v1/products` returns every product and `GET /v1/products/:id` returns one, or a 404 when the ID does not exist. The code is split into layers (route, controller, service, database), and each layer has one job. The data still comes from `data/db.json`, read with `fs/promises`, so no database is needed yet. The React app is unchanged and still uses JSON Server. The response shape here is different on purpose: Express wraps data in objects (`{ products: [...] }`, `{ product: {...} }`), while JSON Server returns bare arrays and objects. Lesson 19 switches the app over.

## What changed and where

- `server/route/productRoutes.mjs` maps URLs to controllers. `server/server.js` mounts it with `v1Router.use("/products", productRouter)`.
- `server/handleExpress.mjs` is an adapter. A controller is a plain function that takes a small request object (`body`, `params`, `query`, `user`, and so on) and returns `{ headers, statusCode, body }`. The adapter calls it and sends the result with `res`. Unexpected errors become a 500 with a fixed message, and the real error is only logged.
- `server/controller/products/getProducts.mjs` and `getProduct.mjs` decide the HTTP answer: 200 with the data, or 404 with `{ "error": "Product not found" }`.
- `server/service/products/listProducts.mjs` and `findProduct.mjs` hold the application steps. They are thin now. Later lessons put rules here.
- `server/database/productsDb.mjs` is the only file that knows where products live. It exports a frozen object with `findAll` and `findById`, and reads `data/db.json` on each call.

## Express concept

Layers keep each change small. The route knows URLs, the controller knows HTTP status codes, the service knows what the app does, and the database module knows how to store things. A controller that does not touch `req` and `res` can be called in a test with a plain object. The route parameter `:id` arrives as `httpRequest.params.id`.

## Check the result

1. Run `npm run api`.
2. `curl http://localhost:5000/v1/products` returns `{"products":[...]}` with the products from `data/db.json`.
3. `curl http://localhost:5000/v1/products/sofa-01` returns `{"product":{...}}`.
4. `curl -i http://localhost:5000/v1/products/nope` returns status 404 and `{"error":"Product not found"}`.
5. Compare with JSON Server (`npm run server`, then `curl http://localhost:8000/products`). Note that it returns a bare array. This difference is why the React code changes in the next lesson.
6. The React app still works with JSON Server. `npm run lint` and `npm run build` still pass.

## Exercise

Add a `category` query parameter: `GET /v1/products?category=chairs` should return only chairs. Read it from `httpRequest.query.category` in `getProducts.mjs`, pass it to the service, and filter in `productsDb.findAll`. Keep the route file unchanged.

## Read on expressjs.com

- [Routing](https://expressjs.com/en/guide/routing.html)
- [Using middleware](https://expressjs.com/en/guide/using-middleware.html)
- [`express.Router`](https://expressjs.com/en/5x/api.html#router)
- [Node.js `fs/promises`](https://nodejs.org/api/fs.html#promises-api)

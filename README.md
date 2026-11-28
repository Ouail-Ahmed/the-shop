# Branch 19: Create products and switch the app to Express

## Changes from Lesson 18

Lesson 18 served products from Express while React still used JSON Server. This branch finishes the move. The server gains `POST /v1/products`, which validates input, builds a product with a generated ID, saves it to `data/db.json` and answers 201. The React app now calls Express at `http://localhost:5000/v1` and reads the wrapped responses (`data.products`, `data.product`). JSON Server is removed from the project.

## What changed and where

- `server/helper/sanitize.mjs` exports `sanitizeText`. It turns non-strings into an empty string, removes control characters and angle brackets, collapses spaces and trims.
- `server/model/product.mjs` exports `buildProduct`, a factory that cleans the text fields, checks every rule and returns a frozen product, or throws a `ValidationError`. Rules: `title`, `material`, `category` and `description` are not empty, `price` is a finite number above 0, `imageUrl` is a valid http or https URL, and `inStock` is a boolean. The ID comes from `crypto.randomUUID()`. Fields the model does not know, including an `id` sent by the client, are dropped.
- `server/service/products/createProduct.mjs` builds the product and asks the database to save it.
- `server/controller/products/postProduct.mjs` answers 201 with `{ product }`, or 400 with `{ error }` for a `ValidationError`. Any other error continues to `handleExpress`, which answers 500 without leaking details.
- `server/database/productsDb.mjs` gains `insert`. It reads the file, appends the product and writes the file back. Inserts wait in a promise chain, so two requests at the same moment cannot overwrite each other.
- `server/route/productRoutes.mjs` adds `productRouter.post("/", ...)`.
- `src/api.js` sets `API_URL` to `http://localhost:5000/v1`.
- `src/components/ProductList.jsx` reads `data.products`. `src/pages/ProductDetails.jsx` reads `data.product`.
- `src/pages/AddProductPage.jsx` reads `data.product.id` after a successful save and shows the server's `error` text when the API answers 400. The form also gets a Material field, because the API now requires `material`.
- The root `package.json` loses the `server` script and the `json-server` dependency, and `package-lock.json` is updated. Use `npm run api` and `npm run dev` instead.

## Express concept

Never trust a request body. The model is the one place that decides what a valid product is, and the controller only translates the outcome into an HTTP status: 201 for created, 400 for input the client can fix. Returning the stored product in the response means the client learns the generated ID without a second request. The body-size limit from lesson 17 already protects this route from huge payloads.

## Check the result

1. Run `npm --prefix server install` if needed, then `npm run api` in one terminal and `npm run dev` in another.
2. Open the shop page and confirm the products load. In the Network panel the request goes to `localhost:5000/v1/products` and the body is `{ "products": [...] }`.
3. Open a product and confirm the detail page loads. Open `/products/not-a-product` and confirm the error banner.
4. Open Add product, fill in every field and submit. The app opens the new product's detail page.
5. Check the API directly:
   - `curl -i -X POST -H "Content-Type: application/json" -d "{\"title\":\"Test chair\",\"price\":99,\"imageUrl\":\"https://example.com/a.jpg\",\"material\":\"Oak\",\"category\":\"chairs\",\"inStock\":true,\"description\":\"A test\"}" http://localhost:5000/v1/products` returns 201 and a product with a UUID `id`.
   - The same request with `"price":0` returns 400 and `{"error":"Price must be a number greater than 0"}`.
6. Run `npm run lint` and `npm run build`.
7. The saved product is now in `data/db.json`. Use `git checkout data/db.json` to remove test data before committing.

## Exercise

Add `DELETE /v1/products/:id`. Write `deleteProduct` in the controller, service and database layers, return 204 on success and 404 when the ID does not exist. Do not add a button in React yet. Lesson 22 shows how to restrict admin actions.

## Read on expressjs.com

- [Express API: `express.json`](https://expressjs.com/en/5x/api.html#express.json)
- [Error handling](https://expressjs.com/en/guide/error-handling.html)
- [Production best practices: security](https://expressjs.com/en/advanced/best-practice-security.html)
- [MDN: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

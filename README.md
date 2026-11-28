# Branch 22: Protect routes and log in from React

## Changes from Lesson 21

Lesson 21 could issue tokens but nothing checked them. This branch makes the server check them and teaches the React app to log in. `POST /v1/products` now requires a valid access token (401 if it is missing, invalid or expired) and the role `admin` (403 for everyone else). In React, a new login page at `/login` stores the user and token in `App`, the Navbar shows Log in or Log out, and only admins see the Add product link. The Add product page sends the token in an `Authorization` header and shows the 401 or 403 message.

## What changed and where

- `server/middleware/verifyJwt.mjs` reads `Authorization: Bearer <token>`, verifies it with `verifyAccessToken` and sets `req.user = { id, role }`. A missing, malformed, invalid or expired token gets 401 and a `WWW-Authenticate` header. It does not log the token and does not explain why it failed.
- `server/middleware/verifyRole.mjs` is a factory: `verifyRole("admin")` returns a middleware that answers 403 when `req.user.role` is not in the allowed list. It answers 401 if no user was set, which means `verifyJwt` was not run before it.
- `server/route/productRoutes.mjs` puts them in front of the controller: `productRouter.post("/", verifyJwt, verifyRole("admin"), handleExpress(postProduct))`. `GET` routes stay public. The controller, service and database files do not change.
- `src/pages/LoginPage.jsx` posts the email and password to `/auth/login`, calls `onLogin({ user, accessToken })` and navigates to `/add-product` for an admin or `/shop` for a customer. A failed login shows the server's error in an alert.
- `src/App.jsx` holds `auth` (`null` or `{ user, accessToken }`) in state, adds the `/login` route, passes `onLogout` and the user to `Navbar`, and passes the token to `AddProductPage`.
- `src/components/Navbar.jsx` shows the Add product link only when `user.role === "admin"`, and a Log in link or a Log out button.
- `src/pages/AddProductPage.jsx` adds the `Authorization` header when a token exists and turns 401 and 403 into readable messages.
- `src/index.css` styles the Log out button like the nav links.

## Authorization concept

Authentication asks who you are. Authorization asks what you may do. They fail differently: 401 means the server does not know who is calling, so logging in may help. 403 means the server knows and the answer is no, so logging in again will not help.

Hiding the Add product link is only a convenience. The server is the real guard, because anyone can send a request with curl. Never rely on React to enforce access.

The token is kept in React state, in memory only. A script injected into the page cannot read it from `localStorage` because it is not there, which is safer. The cost is that a refresh or a new tab logs the user out, and the token expires after 15 minutes anyway. The usual fix is a refresh token in an `httpOnly` cookie, which JavaScript cannot read. The reference server's login flow uses this idea, and `cookie-parser` and `credentials: true` in the CORS setup are already in place for it.

## Check the result

1. Start MongoDB, then run `npm --prefix server run seed` so the admin user exists. Run `npm run api` and `npm run dev`.
2. With curl, check the guard:
   - `curl -i -X POST -H "Content-Type: application/json" -d "{}" http://localhost:5000/v1/products` returns 401.
   - Register a customer (lesson 21), log in, and send the same request with `-H "Authorization: Bearer <token>"`. It returns 403.
   - Log in as the admin and send a valid product body with the admin token. It returns 201.
3. In the browser the Navbar shows Log in and no Add product link. Open `/add-product` directly and submit the form. The alert says to log in as an admin.
4. Log in as a customer. The Navbar shows Log out and still no Add product link. Open `/add-product` directly and submit. The alert says only admins can add products.
5. Log out, then log in with the admin email and password from `server/.env`. The Add product link appears, and a valid submission opens the new product.
6. Refresh the page and confirm you are logged out. This is the in-memory tradeoff.
7. Run `npm run lint` and `npm run build`.

## Exercise

Keep the user logged in across refreshes without using `localStorage`. Add `POST /v1/auth/refresh` that reads a refresh token from an `httpOnly` cookie and returns a new access token. Set the cookie in the login controller with `res.cookie`, add `Set-Cookie` support to `handleExpress`, send `credentials: "include"` from `fetch`, and call refresh once when `App` loads. Then add `POST /v1/auth/logout` that clears the cookie.

## Read on the official docs

- [Express: using middleware](https://expressjs.com/en/guide/using-middleware.html)
- [Express: `res.cookie`](https://expressjs.com/en/5x/api.html#res.cookie)
- [jsonwebtoken on npm](https://www.npmjs.com/package/jsonwebtoken)
- [jwt.io introduction](https://jwt.io/introduction)
- [MDN: 401 Unauthorized](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401)
- [MDN: 403 Forbidden](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403)
- [React: lifting state up](https://react.dev/learn/sharing-state-between-components)

# Branch 17: Set up an Express server

## Changes from Lesson 16

Lesson 16 finished the React app against JSON Server. This branch starts a second project inside the repo: a small Express API in `server/`, with its own `package.json`. It answers one request, `GET /v1/health`, and has the safety pieces every API needs from day one: security headers, a CORS allow list, a body size limit, a JSON 404 and an error handler. The React app does not change. It still talks to JSON Server on port 8000, and the next lessons move the data to Express one step at a time.

## What changed and where

- `server/package.json` sets `"type": "module"` so the server uses ES modules, like the React code. The `start` script runs `node server.js`. The `dev` script runs `node --watch server.js`, which restarts on every saved change, so no extra tool is needed.
- `server/server.js` builds the app. `helmet()` is applied once and sets security headers. `cors(corsOptions)` comes next, then `express.json({ limit: "10kb" })` and `express.urlencoded`, which parse request bodies and refuse large ones, and `cookie-parser`.
- `server/config/corsOptions.mjs` holds the whitelist of browser origins: `http://localhost:5173` and `http://localhost:5174`. Any other origin gets a 403 JSON error. A request with no `Origin` header, such as curl, is allowed because CORS is a browser rule, not a firewall.
- `server/route/healthRoutes.mjs` is a router with one route. `server.js` mounts it under a versioned router, so the full path is `/v1/health`. A `/v1` prefix lets a later `/v2` live next to it.
- Two final middleware functions in `server.js`: one returns `{ "error": "Not found" }` with status 404 when no route matched, and one with four arguments, `(err, req, res, next)`, turns errors into JSON. It answers 400 for bad JSON, 413 for a body over the limit, and 500 with a fixed message for everything else. The real error goes to the server log, never to the client.
- `server/.gitignore` keeps `node_modules` and `.env` out of git. `server/.env.example` lists `PORT`.
- The root `package.json` gets an `api` script that runs the server's `dev` script. `eslint.config.js` ignores `server/`, because the root lint rules are written for browser code.

## Express concept

Express is a chain of middleware. Each function receives `(req, res, next)` and either answers or calls `next()` to pass the request on. Order matters: security and parsing come first, routes next, the 404 after the routes, and the error handler last. Express 5 also passes errors from async handlers to the error handler for you.

A router (`express.Router()`) is a mini app for one area. Mounting routers under `/v1` keeps `server.js` short as the API grows.

## Check the result

1. From the repo root run `npm --prefix server install`, then `npm run api`. The terminal prints `API listening on http://localhost:5000`.
2. In another terminal run `curl -i http://localhost:5000/v1/health`. Expect status 200, security headers such as `X-Content-Type-Options: nosniff`, and the body `{"status":"ok"}`.
3. Run `curl -i http://localhost:5000/v1/nothing`. Expect status 404 and `{"error":"Not found"}`.
4. Run `curl -H "Origin: http://evil.example" http://localhost:5000/v1/health`. Expect status 403 and `{"error":"Origin not allowed"}`. Repeat with `Origin: http://localhost:5173` and expect `{"status":"ok"}` plus an `Access-Control-Allow-Origin` header.
5. Run `curl -X POST -H "Content-Type: application/json" -d "{bad" http://localhost:5000/v1/health`. Expect status 400 and `{"error":"Invalid JSON body"}`.
6. Run `npm run lint` and `npm run build` at the root to confirm the React app is unaffected.

## Exercise

Add `GET /v1/health/time` that returns `{ "time": <ISO date string> }`. Then change the port with `PORT=5001 npm --prefix server run start` and confirm the log line follows it. Later lessons read their settings from `.env`, so note that `process.env.PORT` is already how this server is configured.

## Read on expressjs.com

- [Express routing](https://expressjs.com/en/guide/routing.html)
- [Writing middleware](https://expressjs.com/en/guide/writing-middleware.html)
- [Error handling](https://expressjs.com/en/guide/error-handling.html)
- [Production best practices: security](https://expressjs.com/en/advanced/best-practice-security.html)
- [Helmet](https://helmetjs.github.io/)
- [cors middleware](https://expressjs.com/en/resources/middleware/cors.html)

# Branch 09: JSON Server setup

## Changes from Lesson 08

Lesson 08 renders its four catalog records from the JavaScript module `src/data/products.js`. This branch adds a local REST API backed by a JSON file, but does not connect the React catalog to it yet. The app continues to use the local module until lesson 10, which isolates API setup from the later fetch implementation.

## What changed and where

- `data/db.json` adds a `products` collection with sofa, table, chair, and lamp records. The API records include the fields already used by the cards plus `category` and `description` for later lessons.
- `package.json` adds JSON Server as a development dependency and a `server` script that watches `data/db.json` on port 8000.
- `package-lock.json` records the dependency installation. `src/components/ProductList.jsx` and `src/data/products.js` are unchanged in behavior on this branch; the displayed products are still imported locally.

## API concepts and setup

JSON Server turns the `products` array into REST endpoints: `GET /products` returns the collection, and `GET /products/:id` returns one matching record. Because the server watches `data/db.json`, writes through its API are persisted to that file.

Run `npm run server` and `npm run dev` in separate terminals. The API listens on `http://localhost:8000`; the Vite app uses its own development server.

## Check the result

Open `http://localhost:8000/products` and confirm all four records are returned. Then request `http://localhost:8000/products/table-01` to inspect one item. The storefront should still render from `src/data/products.js` in this lesson.

## Exercise

Add a fifth product to the `products` array in `data/db.json` and confirm the API response includes it. The page will not show it until the data-fetching lesson connects the UI to the API.

## Read on react.dev

This lesson is about a development tool, not React, so react.dev has no matching page. The next lesson uses the API from React. For the tool itself, see the JSON Server project page.

- [JSON Server (not part of React)](https://github.com/typicode/json-server)
- [Thinking in React, for where data comes from](https://react.dev/learn/thinking-in-react)

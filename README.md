# Branch 10: Effects and data fetching

## Changes from Lesson 09

Lesson 09 prepared `data/db.json` and JSON Server, while the catalog still read from `src/data/products.js`. This branch removes that local product module and makes `ProductList` load the catalog from the API. The server must now be running for products to appear. Loading and failure feedback are not rendered yet; this branch only logs non-abort request errors, with dedicated UI added in lesson 11.

## What changed and where

- `src/components/ProductList.jsx` owns an initially empty `products` state and starts `loadProducts` in a `useEffect` with an empty dependency array.
- The effect requests `${API_URL}/products`, checks `response.ok`, parses the JSON, and stores the returned array. The existing `.map()` then renders each record as a keyed `ProductCard`, forwarding the cart callback.
- An `AbortController` is passed to `fetch`; the effect cleanup aborts the request if `ProductList` unmounts. The catch ignores abort errors and logs other failures to the console.
- `src/api.js` is new. It exports `API_URL = "http://localhost:8000"`, the one place that names the server address. Every request in the app builds its URL from it, so changing the port later means editing one line.
- `src/data/products.js` is deleted, making the API the catalog's source instead of a local import.

## React concept

An effect synchronizes a component with an external system such as a network API. An empty dependency array runs this request after the list mounts, not during render. Cleanup prevents a request from continuing after its owning component is removed.

## Check the result

Start JSON Server with `npm run server`, open the app, and inspect the Network panel for `GET http://localhost:8000/products` (the value of `API_URL` plus `/products`). Stop the API and check the browser console: the request error is logged, but this lesson does not yet show a loading or error message in the page.

## Exercise

Filter the fetched array before mapping it so the catalog can show one category only.

## Read on react.dev

These pages cover effects and when an effect is the right tool. Fetching on mount is the classic case.

- [Synchronizing with effects](https://react.dev/learn/synchronizing-with-effects)
- [You might not need an effect](https://react.dev/learn/you-might-not-need-an-effect)

# Branch 13: Route parameters and product details

## Changes from Lesson 12

Lesson 12 had separate Home and Shop routes, but product cards had no page of their own. This branch adds one route pattern, `/products/:id`, that can display any product selected from the catalog. Each card now links to its own detail URL, and the new page requests the matching record from JSON Server.

## What changed and where

- `src/App.jsx` imports `ProductDetails` and adds the `/products/:id` route alongside Home and Shop.
- `src/components/ProductCard.jsx` uses a React Router `Link` to build a detail URL from the card's product ID.
- `src/pages/ProductDetails.jsx` has two components. The route component, `ProductDetailsRoute`, reads the dynamic `id` with `useParams` and renders `<ProductDetails key={id} id={id} />`. `ProductDetails` takes `id` as a prop, fetches `${API_URL}/products/${id}`, and renders the returned image, material, title, description, price, and stock status. Its effect depends on `id`, and abort cleanup handles unmounting or changing products. It uses the same `status` pattern as lesson 11.
- `src/App.jsx` imports `ProductDetailsRoute` from that file and uses it as the route element.
- The detail page displays a loading message while fetching, an alert when the request fails (including an unknown ID), and a link back to `/shop` after success. `src/index.css` styles the detail layout and page statuses.

## React Router concept

The `:id` segment is a route parameter. `useParams()` exposes its current value to the matched page, allowing one component and route pattern to serve many products. Including `id` in the effect dependency array means navigating from one detail URL to another triggers a request for the new record.

There is a trap here. React reuses the same `ProductDetails` instance when only the URL parameter changes, so its state survives the navigation. Without a fix, a visit from `/products/table-01` to `/products/lamp-01` would briefly show the table, or an old error, until the new request finishes. The fix comes from React's "Preserving and resetting state" page: give the component a `key`. When the key changes, React discards the old component and its state and starts a new one, so `status` starts again at `"loading"`. That is why the route component passes `key={id}`.

## Check the result

Open Shop, select a product, and compare the ID in the URL with the request in the Network panel. Confirm the displayed title and price match that response. Then visit `/products/not-a-product`; this page should show its item-not-found alert. The app-wide wildcard 404 is added in lesson 16, not here.

## Exercise

Add a related-products link to the detail page that points to another product ID. Click it and check that the page shows "Loading furniture details..." for the new product instead of the old one.

## Read on react.dev

These pages cover resetting state with a key, and effects that depend on a value. Route parameters belong to React Router, which is not part of React.

- [Preserving and resetting state](https://react.dev/learn/preserving-and-resetting-state)
- [Synchronizing with effects](https://react.dev/learn/synchronizing-with-effects)
- [React Router (not part of React)](https://reactrouter.com/)

# Branch 16: Redirects and not-found pages

## Changes from Lesson 15

Lesson 15 saved a new product and showed a success message on the form. This branch uses the product ID returned by the successful POST to take the user directly to the new product's detail page. It also adds a fallback route for URLs that do not match any declared page. The product-detail page's own error for an unknown product ID remains separate from this app-wide fallback.

## What changed and where

- `src/pages/AddProductPage.jsx` imports `useNavigate`. After checking `response.ok` and parsing the response, it navigates to `/products/${createdProduct.id}`. Failed submissions stay on the form and set `status` to `"error"`, so the error alert still shows. The `"success"` status from lesson 15 is gone, because a successful save leaves the page.
- `src/App.jsx` imports `NotFoundPage` and adds a final `<Route path="*">` so unmatched paths render a recovery screen.
- `src/pages/NotFoundPage.jsx` explains that the requested page or item is missing and provides a React Router link back to `/shop`.
- `src/index.css` adds layout and typography styles for the not-found view.

## React Router concept

React Router is not part of React itself. `useNavigate()` changes the current route from an event handler after an operation succeeds. A wildcard route (`path="*"`) is the final catch-all for unmatched URLs. It does not replace the loading and error handling in `ProductDetails` for a valid `/products/:id` route whose API record does not exist.

## Check the result

With JSON Server running, submit a valid new item and confirm the URL changes to the new `/products/:id` path and the detail page displays the saved record. Then visit an unrelated path such as `/missing-page` and use the not-found page's link to return to Shop. Finally, visit `/products/not-a-product` to see the distinct product-specific error.

## Exercise

Improve the unknown-product state inside `src/pages/ProductDetails.jsx` with a link back to `/shop`, without changing the wildcard page used for unmatched URLs.

## Read on react.dev

Routing is not part of React itself, so react.dev has no page for redirects or not-found routes. Use the React Router site for this lesson. The react.dev page below covers the state structure used by the form.

- [React Router (not part of React)](https://reactrouter.com/)
- [Choosing the state structure](https://react.dev/learn/choosing-the-state-structure)

## Formatting polish

This branch also has a small formatting pass over `src/main.jsx`, `src/pages/HomePage.jsx`, `src/pages/ShopPage.jsx`, `src/components/ProductList.jsx`, `src/components/Footer.jsx`, `src/pages/NotFoundPage.jsx`, and `src/pages/AddProductPage.jsx`. It only changes quotes, line breaks, and final newlines. No behavior changes.

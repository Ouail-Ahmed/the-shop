# Branch 08: Rendering product lists

## Changes from Lesson 07

Lesson 07 rendered one featured product card. This branch replaces that single card with a catalog of four furniture records. The product details move into a data module, and a new `ProductList` component turns the array into reusable cards. The cart callback still flows down from `App`, and each rendered card keeps its own quantity state.

## What changed and where

- `src/data/products.js` exports four product objects: sofa, side table, lounge chair, and lamp. Each record has a stable `id`, title, price, image URL, material, and stock flag.
- `src/components/ProductList.jsx` imports the array, maps each record to a `ProductCard`, sets `key={product.id}`, and forwards `onAddToCart` to each card. It writes the props as `{...product}`, the spread shorthand from lesson 05, because every field of the record is a prop the card accepts.
- `src/App.jsx` replaces its single `ProductCard` with `ProductList` and passes the existing cart callback into the list.
- `src/index.css` styles the list as a product grid and adjusts the catalog layout for smaller screens.

## React concept

Use `.map()` to transform data into repeated UI. The `key` belongs on the element returned directly from the map so React can track that product as the list changes. A key is an internal reconciliation hint; it is not automatically passed as a prop. Since each map iteration creates its own `ProductCard`, each card has independent quantity state.

## Check the result

Confirm all four products render and the browser console has no missing-key warning. Change the order of the records in `src/data/products.js` and verify the cards follow that order. Change quantity for one card and confirm it does not change the others.

## Exercise

Add a fifth product object with a unique ID and verify the catalog renders it without adding another card element in JSX.

## Read on react.dev

These pages cover rendering lists with keys, and the state each card keeps.

- [Rendering lists](https://react.dev/learn/rendering-lists)
- [Keeping components pure](https://react.dev/learn/keeping-components-pure)

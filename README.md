# Branch 06: Click events and DevTools

## Changes from Lesson 05

Lesson 05 made the card's product values arrive as props. This branch also passes the product `id` from `App` into `ProductCard` and adds two buttons beneath the stock status. The buttons demonstrate React click events, but they do not yet open a product view or save a wishlist item: both actions currently log the selected ID to the browser console.

## What changed and where

- `src/App.jsx` adds `id={featuredProduct.id}` to the explicit props it passes to `ProductCard`.
- `src/components/ProductCard.jsx` now destructures `id`, defines `handleQuickView` and `handleWishlist`, and attaches them to the new buttons with `onClick`.
- Quick View passes the function itself as `onClick={handleQuickView}` because it needs no arguments. Wishlist wraps the call, `onClick={() => handleWishlist(id)}`, because the handler needs an argument. The mistake to avoid is `onClick={handleQuickView()}`: the parentheses call the function while the card renders, not when the user clicks. A short comment in `ProductCard.jsx` explains all three forms.
- `src/index.css` adds styling for the `.product-actions` button group and its hover state.

## React concept

React event props receive functions; do not call a handler while rendering. Here both handlers close over the `id` prop, so they can identify which card was clicked without manually registering DOM listeners.

## Check the result

Open the browser console and click both actions. Each should log the card's product ID with a different label. In React DevTools, confirm that the `id` prop matches the product shown by the card.

## Exercise

Replace the Quick View console message with a dialog that displays the product title, and close the dialog when its close button is clicked.

## Read on react.dev

These pages cover event handlers, the idea in this lesson.

- [Responding to events](https://react.dev/learn/responding-to-events)

# Branch 06: 06-click-events-and-dev-tools

## React Concept Covered

React event props such as `onClick` receive a function. Pass the function itself when no arguments are needed; use a callback such as `onClick={() => handle(id)}` when values must be supplied. React's event system delivers browser interactions to these handlers without manually wiring DOM listeners.

## What We Built in This Branch

The featured product card now has Quick View and Add to Wishlist buttons. Their handlers log the product ID, making it easy to verify which item each interaction targets.

## Key Files & Code Snippets

```jsx
function handleQuickView() {
  console.log('Quick view product:', id);
}
<button type="button" onClick={handleQuickView}>Quick View</button>
<button type="button" onClick={() => handleWishlist()}>Add to Wishlist</button>
```

The direct handler reference is enough for `handleQuickView`; the callback form is useful when arguments are needed. Both handlers close over the `id` prop.

## DevTools & Debugging Tips (if applicable)

Open the browser console, click each button, then inspect `ProductCard` props in React DevTools to compare the logged ID with the rendered item.

## Exercise for Students

Change the Quick View handler to open a small dialog that displays the product title.

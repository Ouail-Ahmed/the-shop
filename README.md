# Branch 07: 07-state-and-usestate

## React Concept Covered

`useState` gives a component a value that survives renders and a setter that requests the next render. A local variable cannot do this. State should be replaced rather than mutated, and functional updates are useful when the next value depends on the previous one.

## What We Built in This Branch

The product card now owns a quantity state with increment and decrement controls. The app owns the cart count and passes its setter through an `onAddToCart` callback, so the navbar reflects items added from the card.

## Key Files & Code Snippets

```jsx
const [quantity, setQuantity] = useState(1);
setQuantity((currentQuantity) => currentQuantity + 1);
const [cartCount, setCartCount] = useState(0);
setCartCount((currentCount) => currentCount + quantity);
```

The quantity state is local to the card, while the cart count belongs to the app because the navbar and card both need it. Both setters use functional updates to avoid relying on stale values.

## DevTools & Debugging Tips (if applicable)

Change quantity and add to cart. Observe the `ProductCard` quantity and `Navbar` cart count in React DevTools; they are separate state values owned by different components.

## Exercise for Students

Add a remove-from-cart button and make sure the counter never falls below zero.

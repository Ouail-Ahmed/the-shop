# Branch 07: State and `useState`

## Changes from Lesson 06

Lesson 06's Quick View and Wishlist buttons only logged to the console. This branch adds working quantity controls and an Add to cart action. State appears in two places. The product card tracks its own selected quantity (part A). `App` owns the cart total because the navbar must show it too (part B).

## Part A: local state

### What changed and where

- `src/components/ProductCard.jsx` initializes `quantity` to 1 with `useState`, renders decrement and increment buttons and an `<output>`, and passes the selected quantity to `onAddToCart`. Decrement is disabled at 1, and the output uses `aria-live="polite"`.
- `src/index.css` styles the quantity controls.

### React concept

`useState` stores a value that React remembers between renders. It returns the current value and a setter. Calling the setter asks React to render again with the new value. A plain variable would reset on every render, and changing it would not update the screen.

State belongs to one component instance. When the catalog later shows several cards, each card gets its own `quantity`.

### Check the result

Click + and - on the card and watch the number change. Confirm - is disabled at 1. In React DevTools, select `ProductCard` and watch the `quantity` hook change.

## Part B: lifting state up

### What changed and where

- `src/App.jsx` initializes `cartCount` to 0 and defines `addToCart(quantity)`. Its functional update adds the requested quantity to the previous cart count. `App` passes the callback to `ProductCard` as `onAddToCart` and the count to `Navbar`.
- `src/components/Navbar.jsx` receives `cartCount` as a prop and displays it with an accessible item-count label.
- `src/index.css` styles the cart count.

### React concept

Two components that need the same value cannot share state through each other. The card and the navbar are siblings, so the value moves up to their closest common parent, `App`. `App` passes the value down as a prop (`cartCount` to `Navbar`) and passes a callback down so the child can ask for a change (`onAddToCart` to `ProductCard`). Data flows down, requests flow up through callbacks.

### Check the result

Increase quantity to 3, add to cart, and confirm the navbar count becomes 3. Add again and confirm it becomes 6. In React DevTools, inspect the card's `quantity` and the app's `cartCount`.

## Exercise

### Part 1: remove from cart

Add a remove-from-cart action and keep the cart count from dropping below zero.

### Part 2: state is a snapshot

State does not change in the middle of a render. Each render sees one fixed value, like a photo taken at that moment. This exercise shows what that means.

1. In `ProductCard.jsx`, add a button labeled "+3".
2. Write its handler with three calls in a row:

   ```jsx
   function handleAddThree() {
     setQuantity(quantity + 1);
     setQuantity(quantity + 1);
     setQuantity(quantity + 1);
   }
   ```

3. Click it from quantity 1. You expect 4, but you get 2. All three calls read the same `quantity` from the current render, so each one schedules "set to 2".
4. Fix it with updater functions, which React queues and applies one after another:

   ```jsx
   function handleAddThree() {
     setQuantity((current) => current + 1);
     setQuantity((current) => current + 1);
     setQuantity((current) => current + 1);
   }
   ```

5. Click it again from 1 and confirm you get 4. The existing + and - buttons already use this form.

The exercise is done when "+3" adds exactly 3 every time.

## Read on react.dev

Part A and part B map to these pages. The last two explain the snapshot exercise.

- [State: a component's memory](https://react.dev/learn/state-a-components-memory)
- [Sharing state between components](https://react.dev/learn/sharing-state-between-components)
- [State as a snapshot](https://react.dev/learn/state-as-a-snapshot)
- [Queueing a series of state updates](https://react.dev/learn/queueing-a-series-of-state-updates)

# Branch 02: 02-dynamic-values-and-jsx

## React Concept Covered

JSX expressions use curly braces to evaluate JavaScript while React renders. Strings and numbers become text, while booleans, `null`, and plain objects do not render as ordinary text. Expressions can also calculate values before they reach the UI.

## What We Built in This Branch

We introduced store metadata, a promotional message, the founding year, and a sale price calculated from an original price and discount rate.

## Key Files & Code Snippets

```jsx
const originalPrice = 240;
const discountRate = 0.15;
const salePrice = originalPrice * (1 - discountRate);
return <strong>${salePrice.toFixed(2)}</strong>;
```

Use `{bannerMessage}` for plain dynamic text and `${salePrice.toFixed(2)}` for a formatted currency value. JSX still requires one parent element for the returned markup.

## DevTools & Debugging Tips (if applicable)

Inspect the rendered text in the Elements panel. Try interpolating a boolean or object to see why those values are not useful as visible JSX text.

## Exercise for Students

Change `discountRate` and display a different sale price without editing the JSX structure.

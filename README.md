# Branch 02: Dynamic values and JSX

## Changes from Lesson 01

Lesson 01 hard-coded the store heading and a static supporting sentence in `src/App.jsx`. This lesson moves the repeated store details and promotional content into local JavaScript constants, then inserts those values into JSX. It also replaces a static price with a price calculated from the original amount and a discount rate. The component and document structure remain otherwise unchanged.

## What changed and where

- `src/App.jsx` defines `storeName`, `establishedYear`, and `bannerMessage`, then renders them inside the heading, promotional eyebrow, and store-history sentence.
- The same component defines `originalPrice` and `discountRate`, calculates `salePrice`, and displays the original amount in `<del>` beside the sale amount in `<strong>`.
- Currency output uses `toFixed(2)` so both values display two decimal places. No new component or stylesheet is added in this lesson.

## React concept

Curly braces in JSX evaluate JavaScript expressions. They can read a variable such as `{bannerMessage}` or render a calculation such as `{salePrice.toFixed(2)}`. Keep the dollar sign outside the expression as JSX text. Strings and numbers render as text; booleans, `null`, and plain objects do not render as ordinary text.

## Check the result

Inspect the rendered page and confirm that the founding year and banner match their constants. Change `discountRate` in `src/App.jsx`; the sale price should change while the JSX structure stays the same.

## Exercise

Add a `currencyCode` constant and display it next to both the original and sale prices.

## Read on react.dev

These pages cover the ideas in this lesson.

- [JavaScript in JSX with curly braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
- [Writing markup with JSX](https://react.dev/learn/writing-markup-with-jsx)

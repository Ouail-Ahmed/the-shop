# Branch 08: 08-rendering-lists

## React Concept Covered

Arrays can be transformed into UI with `.map()`. Each sibling rendered from an array needs a stable, unique `key` so React can match items as the list changes. Product IDs are preferable to array indexes because they identify the same record across reorders and updates.

## What We Built in This Branch

We moved four furniture records into `src/data/products.js` and added `ProductList`, which maps those records to reusable cards. Each card receives its product data and quantity state remains isolated to that product.

## Key Files & Code Snippets

```jsx
{
  products.map((product) => <ProductCard key={product.id} {...product} />);
}
```

The `key` belongs on the element returned directly from `.map()`. It is an internal reconciliation hint and is not automatically passed as a regular prop.

## DevTools & Debugging Tips (if applicable)

Temporarily change product order and confirm the stable IDs keep item state attached to the right furniture record. Check the console for missing-key warnings if a key is removed.

## Exercise for Students

Add a fifth product record and confirm the catalog renders it without duplicating JSX.

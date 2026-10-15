# Branch 11: 11-conditional-rendering-and-loading-states

## React Concept Covered

Conditional rendering lets a component match its UI to its current state. Use a ternary when choosing between two outputs and `condition && element` when an element is optional. Loading, success, and error are distinct states and should be rendered intentionally.

## What We Built in This Branch

The catalog now shows a skeleton while the request is pending and an accessible error banner if the API request fails. `isLoading` and `error` are separate state values alongside the product array.

## Key Files & Code Snippets

```jsx
if (isLoading) return <CatalogSkeleton />;
if (error) return <p role="alert">Unable to load the furniture catalog.</p>;
return products.map((product) => <ProductCard key={product.id} {...product} />);
```

Throttle the Network panel to observe the loading state. Stop JSON Server to confirm the error banner appears and that it is announced by assistive technology through `role="alert"`.

## DevTools & Debugging Tips (if applicable)

Use `&&` for a brief optional status label and a ternary when the UI must choose between two equally meaningful states.

## Exercise for Students

Add a retry button that starts the request again after a failure.

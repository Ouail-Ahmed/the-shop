# Branch 10: 10-useeffect-and-data-fetching

## React Concept Covered

Effects synchronize a component with systems outside React, such as a network API. The dependency array controls when the effect runs: `[]` runs after mount, `[value]` reruns when `value` changes, and omitting the array runs after every render. Fetching belongs in an effect rather than during rendering.

## What We Built in This Branch

`ProductList` now fetches furniture from JSON Server when it mounts. The static product module is removed, and an abort cleanup prevents a completed request from updating an unmounted component.

## Key Files & Code Snippets

```jsx
useEffect(() => {
  const controller = new AbortController();
  fetch("http://localhost:8000/products", { signal: controller.signal })
    .then((response) => response.json())
    .then(setProducts);
  return () => controller.abort();
}, []);
```

Run `npm run server` before opening the app. Check the Network panel for the `/products` request and its JSON response. The empty dependency array means the catalog is requested when the list mounts.

## DevTools & Debugging Tips (if applicable)

Try changing the effect dependencies and observe how often the request runs. Keep network work out of the component's render body.

## Exercise for Students

Filter the fetched array before rendering to show only one furniture category.

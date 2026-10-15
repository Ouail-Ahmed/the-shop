# Branch 13: 13-route-parameters

## React Concept Covered

Route parameters let one route pattern represent many records. In `/products/:id`, the colon marks a dynamic segment; `useParams` reads its value from the current URL. The component can use that parameter to request the matching API resource.

## What We Built in This Branch

We added `/products/:id` and a `ProductDetails` page. Each catalog card links to its detail URL, and the page fetches the matching product record using the route ID.

## Key Files & Code Snippets

```jsx
const { id } = useParams();
useEffect(() => {
  fetch(`http://localhost:8000/products/${id}`)
    .then((response) => response.json())
    .then(setProduct);
}, [id]);
```

Click a product and compare its ID in the URL with the request path in the Network panel. Try an unknown ID to see the not-found response handled by the page.

## DevTools & Debugging Tips (if applicable)

The effect depends on `id`, so navigating between two product URLs triggers a request for the new record.

## Exercise for Students

Add a related-products link to the detail page using another product ID.

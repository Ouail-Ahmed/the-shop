# Branch 16: 16-redirects-and-404-page

## React Concept Covered

`useNavigate` changes the current route from code after an action succeeds. A wildcard route (`path="*"`) catches URLs that do not match another route, giving users a useful recovery path instead of a blank screen.

## What We Built in This Branch

After a successful product POST, the form navigates to the new product's detail route using the ID returned by the API. A custom wildcard page handles unknown paths and links back to the collection.

## Key Files & Code Snippets

```jsx
const createdProduct = await response.json();
navigate(`/products/${createdProduct.id}`);
<Route path="*" element={<NotFoundPage />} />
```

Submit a new item and confirm the URL changes to `/products/:id`. Then open an unknown path and use the 404 page's link to return to the catalog.

## DevTools & Debugging Tips (if applicable)

Only navigate after checking `response.ok` and parsing the successful response; otherwise keep the form visible and show the submission error.

## Exercise for Students

Add a not-found state for an unknown product ID that offers a route back to `/shop`.

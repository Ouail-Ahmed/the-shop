# Branch 15: 15-submit-event-and-post-request

## React Concept Covered

The browser's default form submission navigates away and reloads the page. Calling `event.preventDefault()` keeps the SPA in control. A JSON `POST` request declares its content type and serializes the payload with `JSON.stringify` before sending it to the API.

## What We Built in This Branch

Submitting `/add-product` now sends the controlled values to `POST /products`. The payload converts the price to a number, and the page reports pending, success, or failure feedback.

## Key Files & Code Snippets

```jsx
event.preventDefault();
await fetch("http://localhost:8000/products", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ ...formData, price: Number(formData.price) }),
});
```

Watch the Network panel for the POST method, JSON request body, and created product response. Refresh `GET /products` and confirm the record persisted in `data/db.json`.

## DevTools & Debugging Tips (if applicable)

The server treats this mock write as persistence by updating the JSON file. The client must check `response.ok`; a resolved fetch promise does not guarantee a successful HTTP status.

## Exercise for Students

Show the created product ID in the success feedback, then use it to build a detail-page link.

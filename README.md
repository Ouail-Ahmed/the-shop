# Branch 15: Form submission and POST requests

## Changes from Lesson 14

Lesson 14 kept the product form in React state and only showed a local "Draft ready" message. This branch replaces that preview submission with a request to create a persistent product through JSON Server. The route and controlled fields remain the same, while `AddProductPage` now owns the pending, success, and failure states for the request. It keeps them in one `status` value, as lesson 11 did for the catalog.

## What changed and where

- `src/pages/AddProductPage.jsx` changes `handleSubmit` to prevent the browser's default form navigation, set pending state, clear old feedback, and build a product payload from `formData`. `status` is `"idle"`, `"submitting"`, `"success"`, or `"error"`, and a separate `errorMessage` holds the failure text.
- The payload converts `price` from the input's string to a number and sets `inStock: true`. `fetch` sends it as JSON to `POST ${API_URL}/products` (`API_URL` comes from `src/api.js`) with the `Content-Type: application/json` header.
- The form submit button is disabled and reads "Saving..." while `status` is `"submitting"`. A successful response sets `"success"` and shows a status message; a non-OK response or network failure sets `"error"` and shows an alert. Because there is one value, the form can never show success and an error together.
- JSON Server writes the new record into `data/db.json`; no catalog component changes are needed because lesson 10 already reads from the API.
- The response body is parsed, but this branch does not yet use the returned ID to redirect. That behavior is added in lesson 16.

## Browser and API concepts

Calling `event.preventDefault()` keeps the browser from navigating away during form submission. JSON requests declare their content type and serialize the payload with `JSON.stringify`. A resolved `fetch` promise is not necessarily a successful HTTP response, so the code checks `response.ok` before showing success.

## Check the result

Start JSON Server, submit a valid product, and inspect the Network panel for the POST method, JSON body, and response. Request `GET /products` again or inspect `data/db.json` to confirm the new record was saved. Stop the server and submit again to verify the form displays an error and becomes usable after the request finishes.

## Exercise

Show the created product's returned ID in the success feedback, then use that ID to build a link to its detail page.

## Read on react.dev

These pages cover forms that send data. The last page explains why the request state is one `status` value.

- [Reacting to input with state](https://react.dev/learn/reacting-to-input-with-state)
- [Choosing the state structure](https://react.dev/learn/choosing-the-state-structure)

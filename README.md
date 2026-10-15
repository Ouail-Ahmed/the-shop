# Branch 09: 09-json-server-setup

## React Concept Covered

An API exposes resources through HTTP endpoints. JSON Server turns a JSON file into a local REST API, allowing the React app to practice requests and persistence without building a backend. A collection named `products` is exposed at `/products` and individual records at `/products/:id`.

## What We Built in This Branch

We added seed records for sofas, tables, chairs, and lamps to `data/db.json`, then added a `server` script that serves them on port 8000. The catalog still uses its local module in this checkpoint; the API integration follows in the next branch.

## Key Files & Code Snippets

```jsx
"scripts": {
  "dev": "vite",
  "server": "json-server --watch data/db.json --port 8000"
}
```

Run `npm run server` in one terminal and `npm run dev` in another. Visit `http://localhost:8000/products` to inspect the JSON collection. JSON Server writes changes back to the watched file.

## DevTools & Debugging Tips (if applicable)

Use the browser or an HTTP client to test `GET /products` and `GET /products/table-01`. Stop the server with Ctrl+C when finished.

## Exercise for Students

Add one lamp to `db.json`, restart the server, and verify it appears in the collection response.

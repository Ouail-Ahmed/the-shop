# Branch 12: 12-react-router-setup

## React Concept Covered

Client-side routing maps URL paths to React components without asking the server for a new HTML page on every navigation. `BrowserRouter` provides the routing context, `Routes` selects a matching route, and `Link`/`NavLink` update the URL without a full reload. `NavLink` also exposes active state for styling.

## What We Built in This Branch

We wrapped the app in `BrowserRouter` and added Home (`/`) and Shop (`/shop`) pages. The navbar and hero now use React Router links, so navigation stays within the single-page app.

## Key Files & Code Snippets

```jsx
<BrowserRouter>
	<Routes>
		<Route path="/" element={<HomePage />} />
		<Route path="/shop" element={<ShopPage />} />
	</Routes>
</BrowserRouter>
```

Click between Home and Shop and watch the address bar. The document should not reload. Inspect the active class applied by `NavLink` on the current route.

## DevTools & Debugging Tips (if applicable)

Use ordinary anchors for external destinations and React Router links for internal destinations.

## Exercise for Students

Add an About route and navigation link while preserving the existing shared navbar and footer.

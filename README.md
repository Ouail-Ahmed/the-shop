# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

# Branch 01: 01-setup-and-app-structure

## React Concept Covered
Vite serves the project during development and bundles it for production. The browser loads `index.html`, whose module script points to `src/main.jsx`. That entry imports the global stylesheet and the root `App` component, then `createRoot` connects React to the `#root` DOM element. JSX lets a component describe the UI with markup-like syntax inside JavaScript.

## What We Built in This Branch
We removed the starter screen and established the Craft & Oak Furniture identity with a semantic page container, a title, and a short store description. The HTML document now carries the store title and description too.

## Key Files & Code Snippets
```jsx
function App() {
	return (
		<main className="store-shell">
			<h1>Craft &amp; Oak Furniture</h1>
			<p>Furniture made for the shape of everyday life.</p>
		</main>
	);
}
```
`src/main.jsx` mounts `<App />` into the element with `id="root"`.

## DevTools & Debugging Tips (if applicable)
Inspect `#root` in the browser Elements panel and confirm React has rendered the heading. Vite's terminal output reports compile errors and exposes the local development URL.

## Exercise for Students
Change the supporting sentence and confirm Vite updates the page without a full reload.

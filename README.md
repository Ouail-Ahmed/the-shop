# Branch 04: 04-components-and-reusability

## React Concept Covered

Components are functions that return UI, and a parent can compose them into a component tree. Splitting the page into components gives each part one responsibility and makes it possible to reuse, test, and change that part without rewriting the whole screen. A default export is imported without braces.

## What We Built in This Branch

We divided the storefront into `Navbar`, `HeroBanner`, `ProductCard`, and `Footer`. `App` now acts as the page composer, while each child owns its markup.

## Key Files & Code Snippets

```jsx
import Navbar from './components/Navbar.jsx';
import HeroBanner from './components/HeroBanner.jsx';
import ProductCard from './components/ProductCard.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return <><Navbar /><HeroBanner /><ProductCard /><Footer /></>;
}
```

Each component is a separate module under `src/components/` and uses a default export. `App.jsx` imports those modules and arranges them in document order.

## DevTools & Debugging Tips (if applicable)

Use React DevTools to inspect the component tree and confirm the page is composed from four children. Check that each module's default export name matches its import.

## Exercise for Students

Create a reusable `ButtonLink` component and replace one of the current text links with it.

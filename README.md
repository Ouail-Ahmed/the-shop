# Branch 04: Components and reusability

## Changes from Lesson 03

Lesson 03 rendered the store as one component in `src/App.jsx`. This lesson keeps the existing Craft & Oak design tokens and responsive styling, but divides the storefront into separate components so each section has a clear owner. `App` now assembles the page from a navigation header, a hero, a featured product, and a footer. The hero receives its message and store name from `App` as props.

## What changed and where

- `src/App.jsx` imports and composes the four child components in page order. It also keeps the store name, banner message, founding year, and price calculation, and passes the hero text as props.
- `src/components/Navbar.jsx` owns the Craft & Oak wordmark and the links to the collection and story sections.
- `src/components/HeroBanner.jsx` owns the hero image, headline, supporting copy, and collection link. Its `message` and `storeName` parameters are props supplied by `App`.
- `src/components/ProductCard.jsx` owns the Rowan Side Table image, product title, material/origin line, and price display.
- `src/components/Footer.jsx` owns the closing store name and tagline, and provides the `about` anchor target used by the navigation.
- `src/index.css` adds the page frame, header/footer, hero, featured section, and product-card layout rules while retaining the shared color, type, and spacing tokens from lesson 03.

The main React idea is composition: each component returns one part of the interface, and `App` puts those parts together. Each module uses a default export, so it is imported without braces.

```jsx
import Footer from "./components/Footer.jsx";
import HeroBanner from "./components/HeroBanner.jsx";
import Navbar from "./components/Navbar.jsx";
import ProductCard from "./components/ProductCard.jsx";

function App() {
  return (
    <div className="site-frame">
      <Navbar />
      <main>
        <HeroBanner message={bannerMessage} storeName={storeName} />
        <section className="featured-section" id="collection">
          <ProductCard />
        </section>
      </main>
      <Footer />
    </div>
  );
}
```

## Debugging

Use React DevTools to inspect the component tree and confirm the page is composed from the four child components. Check that each component's default export matches its import. The hero's `message` and `storeName` props should match the values defined in `src/App.jsx`.

## Exercise

Create a reusable `ButtonLink` component and replace one of the current text links with it.

## Read on react.dev

These pages cover components, imports, and props, the ideas in this lesson.

- [Your first component](https://react.dev/learn/your-first-component)
- [Importing and exporting components](https://react.dev/learn/importing-and-exporting-components)
- [Passing props to a component](https://react.dev/learn/passing-props-to-a-component)

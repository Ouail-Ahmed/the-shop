# Branch 03: Design system and styling

## Changes from Lesson 02

Lesson 02 established the store copy and dynamic sale-price calculation, but the page still relied on starter-level styling. This branch keeps the JSX behavior and gives the Craft & Oak shell a consistent visual system: a wood-inspired palette, separate heading/body fonts, reusable size and spacing values, and a responsive content width. The Vite starter stylesheet and unused public icons are removed.

## What changed and where

- `src/index.css` defines CSS custom properties for colors, fonts, text sizes, spacing, radii, and shadows. The global font and page colors use those tokens.
- The same stylesheet styles `#root` as a centered, width-constrained page, `.store-shell` as the main content region, `.eyebrow` as the promotional label, and the sale `<strong>` with the accent color.
- A media query narrows page gutters and reduces the shell height and heading size on small screens. The heading and paragraph rules establish the typography and spacing used by the current page.
- `src/main.jsx` already imports `src/index.css`, so these global rules apply without changing the React mount.
- `index.html` removes the Vite favicon link while retaining the Craft & Oak title, description, theme color, root element, and module entry.
- `src/App.css`, `public/favicon.svg`, and `public/icons.svg` are removed because the lesson uses the global design stylesheet and no longer needs the starter assets.

## React and CSS concepts

React connects an element to a stylesheet through `className`; here `src/App.jsx` uses `store-shell` and `eyebrow`, while `src/index.css` owns their presentation. CSS custom properties centralize decisions, so changing a token updates every rule that uses it without changing component behavior.

## Check the result

Resize the page below and above 600px and inspect the computed width, heading size, and promotional label color. Confirm `src/main.jsx` imports `index.css` and that the page still renders the same values from lesson 02.

## Exercise

Add a second accent-color token in `src/index.css` and use it for the featured sale price.

## Read on react.dev

This lesson is mostly CSS, which is not part of React. The React page below explains why JSX uses `className`. For custom properties, see MDN.

- [Writing markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
- [MDN: Using CSS custom properties (not react.dev)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

# Branch 01: Setup and app structure

## Before you start

- Use Node 22.13 or newer. The tooling in this project (Vite and ESLint) requires it. Check with `node --version`.
- Run `npm install` after every branch switch. Each lesson branch can have different dependencies.
- Start the app with `npm run dev` and open the address it prints.
- From lesson 09 you also need `npm run server` in a second terminal. It runs the local product API.
- You need an internet connection. Product images load from Unsplash.

## Changes from the Vite starter

This branch replaces the default Vite/React demo screen with the first Craft & Oak Furniture storefront view. The app is still a single React component, but it now has store-specific content and a semantic `<main>` landmark. The browser tab and page description are also branded for the store.

## What changed and where

- `src/App.jsx` now returns a `<main className="store-shell">` containing the store heading and introductory sentence. This replaces the starter counter/demo UI.
- `index.html` keeps the `#root` mount point and module script for `/src/main.jsx`, and sets the document title, theme color, and description for Craft & Oak.
- `src/main.jsx` remains the startup path: it imports the global stylesheet and `App`, then uses `createRoot` to mount the app into `#root`.

## React and Vite concepts

Vite serves `index.html` in development and bundles the application for production. The module script loads `src/main.jsx`; that file mounts `App` into the empty `#root` element. JSX lets `App` describe the rendered semantic HTML inside JavaScript. The `&amp;` entity in the heading displays an ampersand while keeping the JSX text valid.

## Check the result

Run the Vite development server and confirm the page shows "Craft & Oak Furniture" and its supporting sentence. Inspect `index.html` for the document metadata and the browser Elements panel for the rendered `<main>` inside `#root`.

## Exercise

Change the supporting sentence in `src/App.jsx` and confirm Vite updates the page without a full reload.

## Read on react.dev

These pages cover the ideas in this lesson.

- [Your first component](https://react.dev/learn/your-first-component)
- [Writing markup with JSX](https://react.dev/learn/writing-markup-with-jsx)

# Branch 12: React Router and page routes

## Changes from Lesson 11

Lesson 11 rendered the hero and catalog together on one page. This branch gives them separate URLs and page components: Home at `/` and Shop at `/shop`. It adds React Router and changes internal navigation from page/section anchors to client-side route links. The shared navbar, footer, and cart state remain outside the route switch.

## What changed and where

- `src/main.jsx` wraps `<App />` in `BrowserRouter`, providing router context for the app.
- `src/App.jsx` keeps the cart count and add-to-cart callback, renders `Navbar` and `Footer` around `Routes`, and declares the `/` and `/shop` route elements.
- `src/pages/HomePage.jsx` contains the home route's `HeroBanner`. `src/pages/ShopPage.jsx` contains the store heading and `ProductList`, receiving the cart callback from `App`.
- `src/components/Navbar.jsx` replaces internal anchors with a home `Link`, active-aware `NavLink`s for Home and Shop, and a Shop link. `src/components/HeroBanner.jsx` links its collection action to `/shop`.
- `package.json` adds `react-router-dom` version 7 (`^7.18.4`), and `package-lock.json` records it. Run `npm install` after switching to this branch; `src/index.css` adds the route-navigation and active-link styling.

## React Router concept

React Router is a separate library, not part of React itself, so react.dev does not teach it. Its documentation lives at reactrouter.com.

`BrowserRouter` listens to browser history, `Routes` selects the matching `Route`, and `Link`/`NavLink` update the URL without a full document request. `NavLink` can expose which route is active. Keeping `Navbar`, `Footer`, and cart state around `Routes` means they persist when the route-specific page changes.

## Check the result

Click Home, Shop, and the hero's collection link. Confirm the address bar changes to `/` or `/shop` without reloading the document, and verify the active navbar link changes. Add an item in Shop, navigate Home, and return to Shop to see that the cart count is still present.

## Exercise

Add an About page route and navigation link while keeping the shared navbar and footer outside `Routes`.

## Read on react.dev

Routing is not part of React itself, so react.dev has no routing lesson. Use the React Router site for this lesson. The react.dev page below covers the idea of separate pages sharing the same state.

- [React Router (not part of React)](https://reactrouter.com/)
- [Sharing state between components](https://react.dev/learn/sharing-state-between-components)

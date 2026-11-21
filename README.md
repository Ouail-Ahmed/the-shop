# Branch 11: Conditional rendering and loading states

## Changes from Lesson 10

Lesson 10 fetched products but left a blank catalog while the request was pending and only logged failures to the console. This branch adds explicit loading and error state so the catalog communicates what is happening before it renders the successful result. The API request and abort cleanup remain in `ProductList`.

## What changed and where

- `src/components/ProductList.jsx` adds one `status` state that is `"loading"`, `"success"`, or `"error"`, starting at `"loading"`. The request sets `"success"` after the products arrive and `"error"` on failure, unless the request was aborted. A separate `errorMessage` state holds the failure text and is only read when `status` is `"error"`.
- While loading, the component renders a polite live region with a loading label and two skeleton placeholders marked `aria-hidden`.
- If the request fails, it renders an `.error-banner` with `role="alert"` and tells the user to start the JSON Server with `npm run server`. There is no retry button in this checkpoint.
- After a successful request, the existing product grid renders the fetched products as keyed cards.
- `src/index.css` adds the skeleton layout, animated placeholder style, and responsive adjustments for the loading UI.

## React concept

Conditional rendering maps state to the appropriate UI. The early returns keep the three outcomes distinct: pending, failed, and successful.

The three outcomes live in one `status` value on purpose. The obvious first attempt is two separate values, `isLoading` and `error`. Two values allow four combinations, and some of them make no sense, such as loading and failed at the same time. If one update is forgotten, the screen shows a contradiction. One `status` makes those impossible states impossible. React's guide calls this "avoid contradictory state" in its Choosing the state structure page. The later fetching components in this course use the same pattern. `role="alert"` announces an important error to assistive technology, while the loading region uses `aria-live="polite"`.

## Check the result

Throttle the Network panel to see the skeleton before the products arrive. Then stop JSON Server and reload: the alert should replace the catalog and explain how to start the API. Restart the server and confirm the product grid returns.

## Exercise

Add a retry button that starts a new catalog request after an error. Keep using `status`: set it back to `"loading"` when the user clicks retry.

## Read on react.dev

These pages cover conditional rendering and how to structure state for a request.

- [Conditional rendering](https://react.dev/learn/conditional-rendering)
- [Reacting to input with state](https://react.dev/learn/reacting-to-input-with-state)
- [Choosing the state structure](https://react.dev/learn/choosing-the-state-structure)

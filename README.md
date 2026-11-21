# Branch 14: Controlled inputs and forms

## Changes from Lesson 13

Lesson 13 let shoppers read product details but had no way to enter a new product. This branch adds an `/add-product` route and a form with controlled fields for a product name, category, price, image URL, and description. Submitting the form only reports that a draft is ready; it does not send or save the product yet. The API submission is added in lesson 15.

## What changed and where

- `src/App.jsx` imports `AddProductPage` and registers the `/add-product` route.
- `src/components/Navbar.jsx` adds an active-aware Add product link to the shared navigation.
- `src/pages/AddProductPage.jsx` defines the initial form values and stores all fields in one `formData` state object. `handleChange` uses each control's `name` to update only that field while preserving the others.
- The category `<select>` offers sofas, tables, chairs, and lamps. The title, price, image URL, and description controls use required constraints; price uses number/min/step attributes and the image field uses `type="url"`.
- The submit handler prevents the browser's default navigation and reveals a status message with the draft title and category. `src/index.css` styles the form, wide description field, and feedback.

## React concept

A controlled input takes its displayed `value` from React state, and its `onChange` handler updates that state. The `name` attribute lets one change handler serve every field. Copying the current object with a spread avoids mutating state or erasing values in other fields.

## Check the result

Open `/add-product`, enter values, and inspect `formData` in React DevTools as you type. Submit an incomplete form and observe native validation; complete it and confirm the "Draft ready" status appears. No network POST should occur in this lesson.

## Exercise

Add a controlled `material` field and include it in the draft feedback or preview.

## Read on react.dev

These pages cover forms driven by state.

- [Reacting to input with state](https://react.dev/learn/reacting-to-input-with-state)
- [Updating objects in state](https://react.dev/learn/updating-objects-in-state)

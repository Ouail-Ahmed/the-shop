# Branch 14: 14-controlled-inputs-and-forms

## React Concept Covered

In a controlled input, React state is the source of truth: the element receives a `value`, and `onChange` updates that state. This keeps the displayed form value synchronized with application data and makes validation or previews straightforward.

## What We Built in This Branch

We added `/add-product` with controlled fields for title, category, price, description, and image URL. The form reads and updates one state object, then previews the draft without sending it to the API yet.

## Key Files & Code Snippets

```jsx
<input name="title" value={formData.title} onChange={handleChange} />
function handleChange(event) {
  const { name, value } = event.target;
  setFormData((current) => ({ ...current, [name]: value }));
}
```

Type in each field and inspect React DevTools to see `formData` update. Confirm number, URL, and required constraints with the browser's built-in validation.

## DevTools & Debugging Tips (if applicable)

The `name` attribute lets one change handler update any field. The spread copies the previous object so changing one field preserves the rest.

## Exercise for Students

Add a `material` field and show it in the draft preview.

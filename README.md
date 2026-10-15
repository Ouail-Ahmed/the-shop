# Branch 03: 03-design-system-and-styling

## React Concept Covered

React applies CSS through `className`, and a stylesheet can define reusable rules independently of JSX. CSS custom properties make design decisions such as colors, type sizes, and spacing consistent. Importing CSS from the entry module lets the design system apply across the component tree.

## What We Built in This Branch

We applied the existing wood-inspired palette and typography to the store shell, improved responsive page sizing, and styled the promotional eyebrow and discounted price. We removed the unused starter stylesheet.

## Key Files & Code Snippets

```jsx
:root {
	--color-background: #f3efe4;
	--color-text: #2f4a3a;
	--color-accent: #b8481a;
	--space-3: 16px;
}
.eyebrow {
	color: var(--color-accent);
	text-transform: uppercase;
}
```

`src/main.jsx` imports `index.css` once. The component uses `className="store-shell"`; all sizing and colors remain in CSS, where they can be tuned without changing component behavior.

## DevTools & Debugging Tips (if applicable)

Inspect computed styles in the browser Elements panel and resize the viewport to verify the single-column layout and heading scale.

## Exercise for Students

Add a design token for a second accent color and apply it to the featured price.

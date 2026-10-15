# Branch 05: 05-props-and-customization

## React Concept Covered

Props are read-only values a parent passes to a child. Destructuring props in the function parameters makes the values a component needs explicit. This one-way data flow keeps the source of product information clear while letting one component render many products.

## What We Built in This Branch

The featured furniture record now lives in `App` and supplies `ProductCard` with its title, price, image URL, material, and stock status. The card displays each value without owning or changing the product record.

## Key Files & Code Snippets

```jsx
function ProductCard({ title, price, imageUrl, material, inStock }) {
  return <article>
    <img src={imageUrl} alt={title} />
    <h3>{title}</h3>
    <p>{material} · {inStock ? 'In stock' : 'Made to order'}</p>
    <strong>${price.toFixed(2)}</strong>
  </article>;
}
      <Navbar />
      <HeroBanner />
      <ProductCard />
      <Footer />
    </>
  );
}
```

`App` owns the `featuredProduct` object and passes it with `<ProductCard {...featuredProduct} />`. The child destructures its props and treats them as immutable inputs.

## DevTools & Debugging Tips (if applicable)

Inspect `ProductCard` in React DevTools and compare its props with the `featuredProduct` object in `App`. Change one value in the parent and observe the child update.

## Exercise for Students

Add a `condition` prop and display a different note for new, vintage, or refurbished furniture.

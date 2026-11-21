# Branch 05: Props and product customization

## Changes from Lesson 04

In lesson 04, `ProductCard` contained the Rowan Side Table's content directly in its JSX and took no inputs. This branch moves the product record to the parent and makes the card render the record it receives. The page layout is unchanged; the product content is now data-driven and can be changed without editing the card's markup.

## What changed and where

- `src/App.jsx` defines a `featuredProduct` object with an ID, title, price, image URL, material, and stock flag. It passes each field to the card as its own prop:

  ```jsx
  <ProductCard
    title={featuredProduct.title}
    price={featuredProduct.price}
    imageUrl={featuredProduct.imageUrl}
    material={featuredProduct.material}
    inStock={featuredProduct.inStock}
  />
  ```
- `src/components/ProductCard.jsx` destructures `title`, `price`, `imageUrl`, `material`, and `inStock` from its props. It uses the image URL and title for the image and alt text, formats the product price, and selects the stock label from `inStock` with a conditional expression, `inStock ? "In stock" : "Made to order"`. This is conditional rendering: the JSX shows one of two results depending on a value. It is covered fully on react.dev's Conditional Rendering page, linked below.
- The existing featured section and separate original/sale price display remain in `src/App.jsx`; only the card's own product details have moved into the object.

## React concept

Props are read-only inputs supplied by a parent. Keeping `featuredProduct` in `App` makes the data owner explicit; `ProductCard` renders it but does not mutate it. Destructuring the props in the function parameters shows which product fields the component needs.

Writing every prop out is the clearest way to see what a component receives. You may later meet a shorthand, the spread `<ProductCard {...featuredProduct} />`, which passes every field of the object as a prop with the same name. It does the same job with less typing, but it hides which props the card uses, so this lesson writes them out. The catalog lessons use the spread form once the list gets longer.

## Check the result

Inspect `ProductCard` in React DevTools and compare its props to `featuredProduct` in `App`. Change the product title, image URL, or `inStock` value in the parent and confirm the card updates without changes to its JSX structure.

## Exercise

Add a `condition` field to `featuredProduct`, pass it through to `ProductCard`, and display whether the item is new, vintage, or refurbished.

## Read on react.dev

These pages cover props and conditional rendering, the ideas in this lesson.

- [Passing props to a component](https://react.dev/learn/passing-props-to-a-component)
- [Conditional rendering](https://react.dev/learn/conditional-rendering)

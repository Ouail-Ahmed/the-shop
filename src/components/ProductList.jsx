import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch("http://localhost:8000/products", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Could not load products");
        setProducts(await response.json());
      } catch (error) {
        if (error.name !== "AbortError") console.error(error);
      }
    }

    loadProducts();
    return () => controller.abort();
  }, []);

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default ProductList;

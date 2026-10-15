import { useEffect, useState } from "react";
import { API_URL } from "../api.js";
import ProductCard from "./ProductCard.jsx";

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch(`${API_URL}/products`, {
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

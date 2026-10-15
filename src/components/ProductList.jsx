import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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
        if (error.name !== "AbortError") setError(error.message);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadProducts();
    return () => controller.abort();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-state" aria-live="polite">
        <p>Loading Furniture Catalog...</p>
        <div className="skeleton-grid" aria-hidden="true">
          <div className="skeleton-card" />
          <div className="skeleton-card" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="error-banner" role="alert">
        Unable to load the furniture catalog. Start JSON Server with{" "}
        <code>npm run server</code> and try again.
      </p>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default ProductList;

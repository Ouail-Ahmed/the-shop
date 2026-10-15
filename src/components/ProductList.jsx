import { useEffect, useState } from "react";
import { API_URL } from "../api.js";
import ProductCard from "./ProductCard.jsx";

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  // One status value instead of separate isLoading and error flags, so the
  // component can never be "loading" and "failed" at the same time.
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState(""); // only read when status is "error"

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch(`${API_URL}/products`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Could not load products");
        setProducts(await response.json());
        setStatus("success");
      } catch (error) {
        if (error.name !== "AbortError") {
          setErrorMessage(error.message);
          setStatus("error");
        }
      }
    }

    loadProducts();
    return () => controller.abort();
  }, []);

  if (status === "loading") {
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

  if (status === "error") {
    return (
      <p className="error-banner" role="alert">
        Unable to load the furniture catalog ({errorMessage}). Start JSON Server with <code>npm run server</code> and try again.
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

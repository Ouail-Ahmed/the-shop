import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../api.js";

function ProductDetails({ id }) {
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState(""); // only read when status is "error"

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      try {
        const response = await fetch(`${API_URL}/products/${id}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Furniture item not found");
        setProduct(await response.json());
        setStatus("success");
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setErrorMessage(requestError.message);
          setStatus("error");
        }
      }
    }

    loadProduct();
    return () => controller.abort();
  }, [id]);

  if (status === "loading")
    return <p className="page-status">Loading furniture details...</p>;
  if (status === "error")
    return (
      <p className="error-banner" role="alert">
        {errorMessage}
      </p>
    );

  return (
    <article className="product-details">
      <img src={product.imageUrl} alt={product.title} />
      <div>
        <p className="eyebrow">{product.material}</p>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p className="detail-price">${product.price.toFixed(2)}</p>
        <p>{product.inStock ? "In stock" : "Made to order"}</p>
        <Link className="text-link" to="/shop">
          Back to the collection
        </Link>
      </div>
    </article>
  );
}

// Route-level wrapper. The key makes React treat each id as a different
// ProductDetails, so state from the previous product never leaks into the next one.
function ProductDetailsRoute() {
  const { id } = useParams();
  return <ProductDetails key={id} id={id} />;
}

export default ProductDetailsRoute;

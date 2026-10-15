import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      try {
        const response = await fetch(`http://localhost:8000/products/${id}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Furniture item not found");
        setProduct(await response.json());
      } catch (requestError) {
        if (requestError.name !== "AbortError") setError(requestError.message);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadProduct();
    return () => controller.abort();
  }, [id]);

  if (isLoading)
    return <p className="page-status">Loading furniture details...</p>;
  if (error)
    return (
      <p className="error-banner" role="alert">
        {error}
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

export default ProductDetails;

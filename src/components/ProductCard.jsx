import { useState } from "react";
import { Link } from "react-router-dom";

function ProductCard({
  id,
  title,
  price,
  imageUrl,
  material,
  inStock,
  onAddToCart,
}) {
  const [quantity, setQuantity] = useState(1);

  function handleQuickView() {
    console.log("Quick view product:", id);
  }

  function handleWishlist() {
    console.log("Wishlist product:", id);
  }

  return (
    <article>
      <img className="product-image" src={imageUrl} alt={title} />
      <div className="product-copy">
        <div>
          <h3>{title}</h3>
          <p>{material} · made in Vermont</p>
        </div>
        <strong>${price.toFixed(2)}</strong>
      </div>
      <p className="stock-status">{inStock ? "In stock" : "Made to order"}</p>
      <Link className="text-link" to={`/products/${id}`}>
        View details
      </Link>
      <div className="quantity-controls" aria-label={`${title} quantity`}>
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={quantity === 1}
          onClick={() => setQuantity((currentQuantity) => currentQuantity - 1)}
        >
          -
        </button>
        <output aria-live="polite">{quantity}</output>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQuantity((currentQuantity) => currentQuantity + 1)}
        >
          +
        </button>
        <button type="button" onClick={() => onAddToCart(quantity)}>
          Add to cart
        </button>
      </div>
      <div className="product-actions">
        <button type="button" onClick={handleQuickView}>
          Quick View
        </button>
        <button type="button" onClick={() => handleWishlist()}>
          Add to Wishlist
        </button>
      </div>
    </article>
  );
}

export default ProductCard;

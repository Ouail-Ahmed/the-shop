function ProductCard({ id, title, price, imageUrl, material, inStock }) {
  function handleQuickView() {
    console.log('Quick view product:', id);
  }

  function handleWishlist() {
    console.log('Wishlist product:', id);
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
      <p className="stock-status">{inStock ? 'In stock' : 'Made to order'}</p>
      <div className="product-actions">
        <button type="button" onClick={handleQuickView}>Quick View</button>
        <button type="button" onClick={() => handleWishlist()}>Add to Wishlist</button>
      </div>
    </article>
  );
}

export default ProductCard;

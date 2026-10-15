function ProductCard() {
  return (
    <article>
      <img
        className="product-image"
        src="https://images.unsplash.com/photo-1598300053653-0f3f8a5c5f4b?auto=format&fit=crop&w=1000&q=85"
        alt="Solid oak side table beside a lounge chair"
      />
      <div className="product-copy">
        <div>
          <h3>Rowan Side Table</h3>
          <p>Solid oak · made in Vermont</p>
        </div>
        <strong>$240</strong>
      </div>
    </article>
  );
}

export default ProductCard;
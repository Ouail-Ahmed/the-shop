import ProductList from "../components/ProductList.jsx";

function ShopPage({ onAddToCart }) {
  return (
    <section className="featured-section" id="collection">
      <div className="section-heading">
        <p className="eyebrow">Since 2018</p>
        <h1>Made for living</h1>
      </div>
      <ProductList onAddToCart={onAddToCart} />
    </section>
  );
}

export default ShopPage;
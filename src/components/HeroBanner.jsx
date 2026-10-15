import { Link } from "react-router-dom";

function HeroBanner({ message, storeName }) {
  return (
    <section className="hero-banner">
      <img
        className="hero-photo"
        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85"
        alt="Sunlit living room with natural wood furniture"
      />
      <div className="hero-copy">
        <p className="eyebrow">{message}</p>
        <h1>{storeName}, at home.</h1>
        <p>
          Considered pieces, honest materials, and room to make them your own.
        </p>
        <Link className="text-link" to="/shop">
          Explore the collection
        </Link>
      </div>
    </section>
  );
}

export default HeroBanner;

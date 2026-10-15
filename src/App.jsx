import Footer from "./components/Footer.jsx";
import HeroBanner from "./components/HeroBanner.jsx";
import Navbar from "./components/Navbar.jsx";
import ProductCard from "./components/ProductCard.jsx";

function App() {
  const storeName = "Craft & Oak";
  const establishedYear = 2018;
  const bannerMessage = "Thoughtful furniture, made to last.";
  const originalPrice = 240;
  const discountRate = 0.15;
  const salePrice = originalPrice * (1 - discountRate);
  const featuredProduct = {
    id: 'rowan-side-table',
    title: 'Rowan Side Table',
    price: originalPrice,
    imageUrl:
      'https://images.unsplash.com/photo-1598300053653-0f3f8a5c5f4b?auto=format&fit=crop&w=1000&q=85',
    material: 'Solid oak',
    inStock: true,
  };

  return (
    <div className="site-frame">
      <Navbar />
      <main>
        <HeroBanner message={bannerMessage} storeName={storeName} />
        <section className="featured-section" id="collection">
          <div className="section-heading">
            <p className="eyebrow">Since {establishedYear}</p>
            <h2>Made for living</h2>
          </div>
          <ProductCard {...featuredProduct} />
          <p className="featured-price">
            Featured table: <del>${originalPrice.toFixed(2)}</del>{" "}
            <strong>${salePrice.toFixed(2)}</strong>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;

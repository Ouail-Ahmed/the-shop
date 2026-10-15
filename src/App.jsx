import { useState } from "react";
import Footer from "./components/Footer.jsx";
import HeroBanner from "./components/HeroBanner.jsx";
import Navbar from "./components/Navbar.jsx";
import ProductList from "./components/ProductList.jsx";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const storeName = "Craft & Oak";
  const establishedYear = 2018;
  const bannerMessage = "Thoughtful furniture, made to last.";
  const addToCart = (quantity) => {
    setCartCount((currentCount) => currentCount + quantity);
  };

  return (
    <div className="site-frame">
      <Navbar cartCount={cartCount} />
      <main>
        <HeroBanner message={bannerMessage} storeName={storeName} />
        <section className="featured-section" id="collection">
          <div className="section-heading">
            <p className="eyebrow">Since {establishedYear}</p>
            <h2>Made for living</h2>
          </div>
          <ProductList onAddToCart={addToCart} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;

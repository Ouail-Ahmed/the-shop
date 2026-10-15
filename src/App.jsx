import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import AddProductPage from "./pages/AddProductPage.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import ShopPage from "./pages/ShopPage.jsx";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const addToCart = (quantity) => {
    setCartCount((currentCount) => currentCount + quantity);
  };

  return (
    <div className="site-frame">
      <Navbar cartCount={cartCount} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage onAddToCart={addToCart} />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProductPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

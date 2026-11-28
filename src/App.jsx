import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AddProductPage from "./pages/AddProductPage.jsx";
import ProductDetailsRoute from "./pages/ProductDetails.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ShopPage from "./pages/ShopPage.jsx";

function App() {
  const [cartCount, setCartCount] = useState(0);
  // Who is logged in. The token lives only in memory, so a page refresh logs out.
  const [auth, setAuth] = useState(null); // null or { user, accessToken }
  const addToCart = (quantity) => {
    setCartCount((currentCount) => currentCount + quantity);
  };

  return (
    <div className="site-frame">
      <Navbar
        cartCount={cartCount}
        user={auth?.user ?? null}
        onLogout={() => setAuth(null)}
      />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage onAddToCart={addToCart} />} />
          <Route path="/products/:id" element={<ProductDetailsRoute />} />
          <Route path="/login" element={<LoginPage onLogin={setAuth} />} />
          <Route
            path="/add-product"
            element={<AddProductPage accessToken={auth?.accessToken ?? null} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

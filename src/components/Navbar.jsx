import { Link, NavLink } from "react-router-dom";

function Navbar({ cartCount, user, onLogout }) {
  return (
    <header className="site-header">
      <Link className="wordmark" to="/">
        Craft <span>&amp; Oak</span>
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/shop">Shop</NavLink>
        {user?.role === "admin" && (
          <NavLink to="/add-product">Add product</NavLink>
        )}
        {user ? (
          <button type="button" onClick={onLogout}>
            Log out ({user.email})
          </button>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
      <Link className="header-note" to="/shop">
        Small-batch furniture
      </Link>
      <span className="cart-count" aria-label={`${cartCount} items in cart`}>
        Cart {cartCount}
      </span>
    </header>
  );
}

export default Navbar;

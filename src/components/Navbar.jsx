import { Link, NavLink } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <header className="site-header">
      <Link className="wordmark" to="/">
        Craft <span>&amp; Oak</span>
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
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

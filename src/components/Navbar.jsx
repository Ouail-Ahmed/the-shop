function Navbar() {
  return (
    <header className="site-header">
      <a className="wordmark" href="/">
        Craft <span>&amp; Oak</span>
      </a>
      <nav className="site-nav" aria-label="Main navigation">
        <a href="#collection">Collection</a>
        <a href="#about">Our story</a>
      </nav>
      <a className="header-note" href="#collection">Small-batch furniture</a>
    </header>
  );
}

export default Navbar;
function App() {
  const storeName = 'Craft & Oak';
  const establishedYear = 2018;
  const bannerMessage = 'Thoughtful furniture, made to last.';
  const originalPrice = 240;
  const discountRate = 0.15;
  const salePrice = originalPrice * (1 - discountRate);

  return (
    <main className="store-shell">
      <p className="eyebrow">{bannerMessage}</p>
      <h1>{storeName} Furniture</h1>
      <p>Independent furniture makers since {establishedYear}.</p>
      <p>
        Featured oak side table: <del>${originalPrice.toFixed(2)}</del>{' '}
        <strong>${salePrice.toFixed(2)}</strong>
      </p>
    </main>
  );
}

export default App;

import { products } from "../data/products.js";
import ProductCard from "./ProductCard.jsx";

function ProductList({ onAddToCart }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default ProductList;

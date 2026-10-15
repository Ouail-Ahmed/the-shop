import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <p className="eyebrow">404 · Workshop closed</p>
      <h1>Furniture Item or Page Not Found</h1>
      <p>
        The page may have moved, or this furniture piece is no longer in the
        collection.
      </p>
      <Link className="text-link" to="/shop">
        Return to the collection
      </Link>
    </section>
  );
}

export default NotFoundPage;

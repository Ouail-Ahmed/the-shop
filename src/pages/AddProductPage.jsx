import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api.js";

const initialFormData = {
  title: "",
  category: "chairs",
  price: "",
  description: "",
  imageUrl: "",
};

function AddProductPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState("idle"); // "idle" | "submitting" | "error"
  const [errorMessage, setErrorMessage] = useState(""); // only read when status is "error"

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");

    const product = {
      ...formData,
      price: Number(formData.price),
      inStock: true,
    };

    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error("Could not save this furniture piece");
      const createdProduct = await response.json();
      navigate(`/products/${createdProduct.id}`);
    } catch (error) {
      setErrorMessage(error.message);
      setStatus("error");
    }
  }

  return (
    <section className="add-product-page">
      <div className="section-heading">
        <p className="eyebrow">The workshop</p>
        <h1>Add a furniture piece</h1>
      </div>
      <form className="product-form" onSubmit={handleSubmit}>
        <label>
          Product name
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="sofas">Sofas</option>
            <option value="tables">Tables</option>
            <option value="chairs">Chairs</option>
            <option value="lamps">Lamps</option>
          </select>
        </label>
        <label>
          Price
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image URL
          <input
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-wide">
          Description
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <button
          className="form-submit"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Saving..." : "Add product"}
        </button>
      </form>
      {status === "error" && (
        <p className="error-banner" role="alert">
          {errorMessage}
        </p>
      )}
    </section>
  );
}

export default AddProductPage;
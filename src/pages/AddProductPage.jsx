import { useState } from "react";

const initialFormData = {
  title: "",
  category: "chairs",
  price: "",
  description: "",
  imageUrl: "",
};

function AddProductPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [showPreview, setShowPreview] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setShowPreview(true);
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
          <select name="category" value={formData.category} onChange={handleChange}>
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
        <button className="form-submit" type="submit">Preview listing</button>
      </form>
      {showPreview && (
        <p className="form-feedback" role="status">
          Draft ready: {formData.title} ({formData.category})
        </p>
      )}
    </section>
  );
}

export default AddProductPage;
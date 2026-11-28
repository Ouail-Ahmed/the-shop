import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api.js";

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("idle"); // "idle" | "submitting" | "error"
  const [errorMessage, setErrorMessage] = useState(""); // only read when status is "error"

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Could not log in");
      // { user, accessToken } goes up to App, which holds it in memory.
      onLogin({ user: data.user, accessToken: data.accessToken });
      navigate(data.user.role === "admin" ? "/add-product" : "/shop");
    } catch (error) {
      setErrorMessage(error.message);
      setStatus("error");
    }
  }

  return (
    <section className="add-product-page">
      <div className="section-heading">
        <p className="eyebrow">Welcome back</p>
        <h1>Log in</h1>
      </div>
      <form className="product-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button
          className="form-submit"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Logging in..." : "Log in"}
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

export default LoginPage;

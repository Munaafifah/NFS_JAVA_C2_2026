import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/app/dashboard";

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell login-page">
      <div className="card login-card">
        <p className="eyebrow">Day 13</p>
        <h2>Login to Support Desk</h2>
        <p className="login-subtitle">
          This login calls the Support Desk backend, stores the JWT in context, and redirects
          you to the protected area.
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label style={{ marginTop: "12px" }}>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error && <p className="message error-message" style={{ marginTop: "12px" }}>{error}</p>}

          <button type="submit" disabled={loading} style={{ marginTop: "16px" }}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="seeded-hint">
          <p className="seeded-hint-label">Seeded admin</p>
          <p className="seeded-hint-value">admin@example.com / Admin@12345</p>
        </div>
      </div>
    </div>
  );
}
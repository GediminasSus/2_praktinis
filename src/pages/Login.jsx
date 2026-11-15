import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");

    if (!email.trim() || !password) {
      setError("Įveskite el. paštą ir slaptažodį.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Įveskite tinkamą el. pašto adresą.");
      return;
    }

    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(
        error instanceof TypeError
          ? "Nepavyko susisiekti su serveriu. Patikrinkite, ar jis paleistas."
          : error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <h1>Prisijungimas</h1>

      {location.state?.message && (
        <p className="success-message" role="status">
          {location.state.message}
        </p>
      )}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        <fieldset disabled={isSubmitting}>
          <label htmlFor="loginEmail">
            El. paštas
            <input
              id="loginEmail"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label htmlFor="loginPassword">
            Slaptažodis
            <input
              id="loginPassword"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <button type="submit">
            {isSubmitting ? "Jungiamasi..." : "Prisijungti"}
          </button>
        </fieldset>
      </form>

      <p>
        Neturite paskyros? <Link to="/register">Registruokitės</Link>
      </p>
    </section>
  );
}

export default Login;
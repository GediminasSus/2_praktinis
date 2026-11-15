import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const { password, confirmPassword } = form;

    if (!name || !email || !password || !confirmPassword) {
      setError("Užpildykite visus laukus.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Įveskite tinkamą el. pašto adresą.");
      return;
    }

    if (password.length < 6) {
      setError("Slaptažodis turi būti bent 6 simbolių.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Slaptažodžiai nesutampa.");
      return;
    }

    setIsSubmitting(true);

    try {
      const usersResponse = await fetch("http://localhost:3001/users");

      if (!usersResponse.ok) {
        throw new Error("Nepavyko patikrinti naudotojų.");
      }

      const users = await usersResponse.json();

      const emailExists = users.some(
        (user) => user.email.trim().toLowerCase() === email,
      );

      if (emailExists) {
        throw new Error("Šis el. pašto adresas jau užregistruotas.");
      }

      const registerResponse = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!registerResponse.ok) {
        throw new Error("Registracija nepavyko. Bandykite dar kartą.");
      }

      navigate("/login", {
        replace: true,
        state: {
          message: "Registracija sėkminga. Dabar galite prisijungti.",
        },
      });
    } catch (error) {
      setError(
        error instanceof TypeError
          ? "Nepavyko susisiekti su serveriu. Patikrinkite, ar jis paleistas."
          : error.message,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <h1>Registracija</h1>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        <fieldset disabled={isSubmitting}>
          <label htmlFor="name">
            Vardas
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="email">
            El. paštas
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="password">
            Slaptažodis
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="confirmPassword">
            Pakartokite slaptažodį
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">
            {isSubmitting ? "Registruojama..." : "Registruotis"}
          </button>
        </fieldset>
      </form>

      <p>
        Jau turite paskyrą? <Link to="/login">Prisijunkite</Link>
      </p>
    </section>
  );
}

export default Register;

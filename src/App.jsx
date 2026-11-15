import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
  return (
    <>
      <header>
        <nav aria-label="Pagrindinė navigacija">
          <Link to="/">Pradžia</Link>
          <Link to="/login">Prisijungti</Link>
          <Link to="/register">Registruotis</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<p>Puslapis nerastas.</p>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
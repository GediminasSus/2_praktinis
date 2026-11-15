import { useContext } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeList from "./pages/RecipeList";

function App() {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <>
      <header>
        <nav aria-label="Pagrindinė navigacija">
          <Link to="/">Pradžia</Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard">Receptai</Link>
              <Link to="/favorites">Mėgstamiausi</Link>
              <span>Labas, {user.name}!</span>
              <button type="button" onClick={handleLogout}>
                Atsijungti
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Prisijungti</Link>
              <Link to="/register">Registruotis</Link>
            </>
          )}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={<RecipeList />} 
            />  
            
            <Route
              path="/favorites"
              element={<h1>Mėgstamiausi receptai</h1>}
            />
            <Route
              path="/recipe/:id"
              element={<h1>Recepto informacija</h1>}
            />
          </Route>

          <Route path="*" element={<p>Puslapis nerastas.</p>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
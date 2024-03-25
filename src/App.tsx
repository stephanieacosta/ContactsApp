import { useState } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import OverviewPage from "./pages/OverviewPage";
import ContactsPage from "./pages/ContactsPage";
import FavoritesPage from "./pages/FavoritesPage";
import { CalendarModal } from "./components/CalendarModal";
import { useApi } from "./hooks/useApi";

function App() {
  const { loading } = useApi(); // Obtener el estado de carga desde el hook useApi
  const [darkMode, setDarkMode] = useState(false); // Estado para controlar el modo oscuro

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      {loading && (
        <div
          className="loading"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            height: "100vh",
            fontWeight: "600",
            fontSize: "2rem",
          }}
        >
          Loading...
        </div>
      )}
      <BrowserRouter>
        <Nav darkMode={darkMode} />
        <button onClick={toggleDarkMode} className="buttonmode">
          <img
            width="35px"
            height="35px"
            src={darkMode ? "/sun.svg" : "/moon.svg"}
          ></img>
        </button>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
        <CalendarModal />
      </BrowserRouter>
    </div>
  );
}

export default App;

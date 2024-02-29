import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import OverviewPage from "./pages/OverviewPage";
import ContactsPage from "./pages/ContactsPage";
import FavoritesPage from "./pages/FavoritesPage";
import { CalendarModal } from "./components/CalendarModal";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
        <CalendarModal />
      </BrowserRouter>
    </>
  );
}

export default App;

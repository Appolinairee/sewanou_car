import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./Pages/Home";
import Footer from "./components/Footer/Footer";
import Contacts from "./components/Contact/Contact";
import Connexion from "./components/Connexion";
import CreateProduct from "./Pages/CreateProduct";
import Admin from "./Pages/Admin";

const AdminRoute = process.env.REACT_APP_ADMIN_ROUTE || '/administrateursewanoucar';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path={AdminRoute} element={<Admin />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

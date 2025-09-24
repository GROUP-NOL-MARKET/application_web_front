import "./App.css";
import Preloader from "./Components/Preloader";
import { useContext, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthContext } from "./Components/AuthContext";
import PageAccueil from "./Routes/PageAccueil";
import Register from "./Components/Authentification/Register";
import Login from "./Components/Authentification/Login";
import Navbar1 from "./Components/Accueil/Navbar/Navbar1";
import Navbar2 from "./Components/Accueil/Navbar/Navbar2";
import Footer from "./Components/Accueil/footer";
import Contact from "./Components/Contact";
import About from "./Components/About";
import Cart from "./Components/Cart";
import Paiement from "./Components/Paiement";
import Faq from "./Components/Faq";
import RecupProduct from "./Components/RecupProduct";
import Products from "./Components/Products/Products";
import AdminDashboard from "./Routes/AdminDashboard";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();

  // On définit sur quelles pages on ne veut pas afficher Navbar1 et Navbar2
  const hideNavbars =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/application_web_front/login" ||
    location.pathname === "/application_web_front/register"  ||
    location.pathname === "/application_web_front/recup_product";

  return (
    <div className="App">
      {/* {isLoading && <Preloader />}  */}
      <div>
        {!hideNavbars && (
          <div>
            <Navbar1 />
            <Navbar2 />
          </div>
        )}
      </div>

      <Routes>
        {/* <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider> */}
        <Route path="application_web_front/" element={<PageAccueil />} />
        <Route path="application_web_front/register" element={<Register/>} />
        <Route path="application_web_front/login" element={<Login/>} />
        <Route path="application_web_front/Contact" element={<Contact />} />
        <Route path="application_web_front/About" element={<About />} />
        <Route path="application_web_front/Cart" element={<Cart />} />
        <Route path="application_web_front/Paiement" element={<Paiement />} />
        <Route path="application_web_front/aide&Faq" element={<Faq />} />
        <Route path="application_web_front/products" element={<Products />} />
        <Route
          path="application_web_front/recup_product"
          element={<RecupProduct />}
        />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
      {!hideNavbars && <Footer />}
    </div>
  );
}

export default App;

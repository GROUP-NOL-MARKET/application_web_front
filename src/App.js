import "./App.css";
import Preloader from "./Components/Preloader";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PageAccueil from "./Routes/PageAccueil";
import Register from "./Components/Authentification/Register";
import Login from "./Components/Authentification/Login";
import Navbar1 from "./Components/Accueil/Navbar/Navbar1";
import Navbar2 from "./Components/Accueil/Navbar/Navbar2";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/Accueil/footer";
import Contact from "./Components/Contact";
import About from "./Components/About";
import Cart from "./Components/Cart";
import Paiement from "./Components/Paiement";
import Faq from "./Components/Faq";
import Products from "./Components/Products/Products";
import AdminDashboard from "./Routes/AdminDashboard";
import UserDashboard from "./Routes/UserDashboard";
import ChangePassword from "./Components/Dashboard_user/ChangePassword";
import AdminPrivateRoute from "./Components/Dashboard_admin/AdminPrivateRoute";
import Connexion from "./Components/Dashboard_admin/Connexion";
import UserPrivateRoute from "./Components/UserPrivateRoute";
import AllProducts from "./Components/Products/AllProducts";
import Promotion from "./Components/Products/Promotion";
import SearchProduct from "./Components/Products/SearchProduct";
import EnteteMobile from "./Components/Accueil/EnteteMobile";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Preloader au tout premier rendu (montage)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    },4000); // durée initiale du splash loader
    return () => clearTimeout(timer);
  }, []);

  // Pages sans navbars
  const hideNavbars =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/recup_product" ||
    location.pathname === "/reset-password";

  return (
    <div className="layout d-flex flex-column min-vh-100">
      {isLoading && <Preloader />}

      {!hideNavbars && (
        <>
          <EnteteMobile />
          <Navbar1 />
          <Navbar2 />
        </>
      )}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<PageAccueil />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Connexion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Paiement" element={<Paiement />} />
          <Route path="/aide&Faq" element={<Faq />} />
          <Route path="/products" element={<Products />} />
          <Route path="/all_products" element={<AllProducts />} />
          <Route path="/Promotion" element={<Promotion />} />
          <Route path="/searchProduct" element={<SearchProduct />} />
          <Route
            path="/admin/*"
            element={
              <AdminPrivateRoute>
                <AdminDashboard />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/user/*"
            element={
              <UserPrivateRoute>
                <UserDashboard />
              </UserPrivateRoute>
            }
          />
          <Route path="/reset-password" element={<ChangePassword />} />
        </Routes>
      </main>

      {!hideNavbars && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}

export default App;

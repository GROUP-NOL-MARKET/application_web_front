// import logo from './logo.svg';
import "./App.css";
// import Navbar from './Components/Navbar.guest/Navbar';
import { useContext } from "react";
import AdminDashboard from "./Routes/AdminDashboard";
import { Routes, Route } from "react-router-dom";
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

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="App">
      <div>
        {!isLoggedIn ? (
          <div>
            <Navbar1 />
            <Navbar2 />
          </div>
        ) : (
          <div>
            <Navbar1 />
            <Navbar2 />
          </div>
        )}
      </div>

      <Routes>
        <Route path="/" element={<PageAccueil />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Cart" element={<Cart/>}/>
        <Route path="/Paiement" element={<Paiement/>}/>
        <Route path="/aide&Faq" element={<Faq/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

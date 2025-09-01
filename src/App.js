// import logo from './logo.svg';
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import { ThemeProvider } from "@/contexts/theme-context";

// import Layout from "@/routes/layout";
// import DashboardPage from "@/routes/dashboard/page";
import { useContext } from "react";
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

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  // On définit sur quelles pages on ne veut pas afficher Navbar1 et Navbar2
  const hideNavbars = location.pathname === "/AdminDashboard";

  // const router = createBrowserRouter([
  //       {
  //           path: "/",
  //           element: <Layout />,
  //           children: [
  //               {
  //                   index: true,
  //                   element: <DashboardPage />,
  //               },
  //               {
  //                   path: "analytics",
  //                   element: <h1 className="title">Analytics</h1>,
  //               },
  //               {
  //                   path: "reports",
  //                   element: <h1 className="title">Reports</h1>,
  //               },
  //               {
  //                   path: "customers",
  //                   element: <h1 className="title">Customers</h1>,
  //               },
  //               {
  //                   path: "new-customer",
  //                   element: <h1 className="title">New Customer</h1>,
  //               },
  //               {
  //                   path: "verified-customers",
  //                   element: <h1 className="title">Verified Customers</h1>,
  //               },
  //               {
  //                   path: "products",
  //                   element: <h1 className="title">Products</h1>,
  //               },
  //               {
  //                   path: "new-product",
  //                   element: <h1 className="title">New Product</h1>,
  //               },
  //               {
  //                   path: "inventory",
  //                   element: <h1 className="title">Inventory</h1>,
  //               },
  //               {
  //                   path: "settings",
  //                   element: <h1 className="title">Settings</h1>,
  //               },
  //           ],
  //       },
  //   ]);

  return (
    
    <div className="App">
      <div>
        {!hideNavbars && (
          <div>
            <Navbar1 />
            <Navbar2 />
          </div>
        ) }
      </div>

      <Routes>
         {/* <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider> */}
        <Route path="application_web_front/" element={<PageAccueil />} />
        <Route path="application_web_front/register" element={<Register />} />
        <Route path="application_web_front/login" element={<Login/>}/>
        <Route path="application_web_front/Contact" element={<Contact/>}/>
        <Route path="application_web_front/About" element={<About/>}/>
        <Route path="application_web_front/Cart" element={<Cart/>}/>
        <Route path="application_web_front/Paiement" element={<Paiement/>}/>
        <Route path="application_web_front/aide&Faq" element={<Faq/>}/>
      </Routes>
      {!hideNavbars && (
        <Footer/>
      )}
      
    </div>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../Components/Dashboard_user/Sidebar";
import "../Styles/AdminDashbord/appDashboard.css";
import UserDashboardHome from "../Components/Dashboard_user/UserDashboardHome";
import Commandes from "../Components/Dashboard_user/Commandes";
import Messages from "../Components/Dashboard_user/Messages";
import Avis from "../Components/Dashboard_user/Avis";
import Bons from "../Components/Dashboard_user/Bons";
import Favoris from "../Components/Dashboard_user/Favoris";
import ProdutctsVus from "../Components/Dashboard_user/ProdutctsVus";
import GestionCompte from "../Components/Dashboard_user/GestionCompte";
import Logout from "../Components/Dashboard_user/Logout";
import Adresses from "../Components/Dashboard_user/Adresses";

const UserDashboard = () => {
  return (
    <div className="container mt-4 mb-3">
      <div className="row">
        <div className="col-lg-3 col-12 me-3">

          
          <Sidebar />
        </div>

        <main className="col">
          <Routes>
            <Route path="/" element={<UserDashboardHome />} />
            <Route path="/Commandes" element={<Commandes/>}/>
            <Route path="/messages" element={<Messages/>}/>
            <Route path="/avis" element={<Avis/>}/>
            <Route path="/bons" element={<Bons/>}/>
            <Route path="/favoris" element={<Favoris/>}/>
            <Route path="/products_vus" element={<ProdutctsVus/>}/>
            <Route path="/gestion" element={<GestionCompte/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/adresses" element={<Adresses/>}/>
           </Routes>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;

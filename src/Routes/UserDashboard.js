import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  return (
    <div className="user-dashboard-container position-relative">
      {/* ---- Bouton Hamburger (visible sur mobile seulement) ---- */}
      <div className="d-lg-none d-flex justify-content-between align-items-center px-4 py-2 border-bottom bg-white shadow-sm">
        <button
          className="btn btn-outline-primary"
          onClick={() => setIsSidebarOpen(true)}
        >
          ☰ Menu
        </button>
      </div>

      <div className="container mt-3 mb-3">
        <div className="row">
          {/* ---- Sidebar (Desktop visible, mobile via slide) ---- */}
          <div className="col-lg-3 d-none d-lg-block">
            <Sidebar />
          </div>

          {/* ---- Contenu principal ---- */}
          <main className="col mt-2 mt-lg-0">
            <Routes>
              <Route path="/" element={<UserDashboardHome />} />
              <Route path="/Commandes" element={<Commandes />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/avis" element={<Avis />} />
              <Route path="/bons" element={<Bons />} />
              <Route path="/favoris" element={<Favoris />} />
              <Route path="/products_vus" element={<ProdutctsVus />} />
              <Route path="/gestion" element={<GestionCompte />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/adresses" element={<Adresses />} />
            </Routes>
          </main>
        </div>
      </div>

      {/* ---- Overlay + Sidebar Mobile ---- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="sidebar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar Slide */}
            <motion.div
              className="sidebar-mobile bg-white shadow position-fixed top-0 start-0 h-100 p-3"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0 fw-bold petit_titre">Mon Menu</h5>
                <button
                  className="btn-close"
                  onClick={() => setIsSidebarOpen(false)}
                ></button>
              </div>
              <Sidebar onNavigate={()=>{setIsSidebarOpen(false)}}/>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDashboard;

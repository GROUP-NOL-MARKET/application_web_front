import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../Components/Dashboard_admin/Sidebar";
import Topbar from "../Components/Dashboard_admin/Topbar";
import DashboardHome from "../Components/Dashboard_admin/DashboardHome";
import UsersPage from "../Components/Dashboard_admin/UsersPage";
import ThemeProvider, {
  ThemeContext,
} from "../Components/Dashboard_admin/ThemeContext";
import "../Styles/AdminDashbord/appDashboard.css";
import AnalyseVente from "../Components/Dashboard_admin/AnalyseVente";
import ProfilSeller from "../Components/Dashboard_admin/ProfilSeller";
import Revenue from "../Components/Dashboard_admin/Revenue";
import BestProduct from "../Components/Dashboard_admin/BestProduct";
import ProductGrid from "../Components/Dashboard_admin/ProductGrid";
import ProductManagement from "../Components/Dashboard_admin/ProductManagement";
import AddProduct from "../Components/Dashboard_admin/AddProduct";
import Commandes from "../Components/Dashboard_admin/Commandes";
import Statistiques from "../Components/Dashboard_admin/Statistiques";
import Avis from "../Components/Dashboard_admin/Avis";
import Clients from "../Components/Dashboard_admin/Clients";
import Transactions from "../Components/Dashboard_admin/Transactions";
import Settings from "../Components/Dashboard_admin/Settings";

const AdminDashboard = () => {
  const theme = useContext(ThemeContext);
  return (
    <ThemeProvider>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <Topbar />
          <main className={`p-4 mt-5 ${theme}`} style={{ minHeight: "100vh" }}>
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="paramètres" element={<Settings />} />
              <Route path="analyticSell" element={<AnalyseVente />} />
              <Route path="profilSeller" element={<ProfilSeller />} />
              <Route path="revenue" element={<Revenue />} />
              <Route path="bestProduct" element={<BestProduct />} />
              <Route path="productGrid" element={<ProductGrid />} />
              <Route path="productManagement" element={<ProductManagement />} />
              <Route path="addProduct" element={<AddProduct />} />
              <Route path="commandes" element={<Commandes />} />
              <Route path="statistiques" element={<Statistiques />} />
              <Route path="avis" element={<Avis />} />
              <Route path="clients" element={<Clients />} />
              <Route path="transactions" element={<Transactions />} />
            </Routes>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminDashboard;

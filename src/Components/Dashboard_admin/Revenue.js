import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import Entete from "./dataset/Entete";
import "../../Styles/AdminDashbord/appDashboard.css";
import API from "../Authentification/apiAdmin";
import { CircularProgress } from "@mui/material";
import AddPromoModal from "./AddPromoModal";
import PromotionCard from "./PromotionCard";

const Revenue = () => {
  const { theme } = useContext(ThemeContext);
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [error, setError] = useState("");

  const fetchPromos = async () => {
    setLoading(true);
    try {
      const res = await API.get("/promos");
      setPromotions(res.data.data ?? res.data);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les promotions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette promotion ?")) return;
    try {
      await API.delete(`/admin/promos/${id}`);
      setPromotions((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erreur suppression.");
    }
  };

  const handleToggle = async (id, newActive) => {
    try {
      const res = await API.patch(`/admin/promos/${id}`, { active: newActive });
      setPromotions((prev) => prev.map(p => p.id === id ? res.data : p));
    } catch (err) {
      console.error(err);
      alert("Erreur mise à jour.");
    }
  };

  const handleSaved = (newPromo) => {
    // si API renvoie objet
    setPromotions((prev) => [newPromo, ...prev]);
  };

  const handleEdit = async (promo) => {
    // simple prompt-based quick edit (tu peux remplacer par modal d'édition)
    const newPrice = prompt("Nouveau prix", promo.new_price);
    if (newPrice === null) return;
    if (isNaN(parseFloat(newPrice))) { alert("Prix invalide"); return; }
    try {
      const res = await API.patch(`/admin/promos/${promo.id}`, { new_price: parseFloat(newPrice) });
      setPromotions(prev => prev.map(p => p.id === promo.id ? res.data : p));
    } catch (err) {
      console.error(err);
      alert("Erreur mise à jour");
    }
  };

  return (
    <div className="">
      <Entete title="Promotions" />
      <div className="card p-3 mt-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="petit_titre fw-bold">Gestion des promotions</h4>
          <div>
            <button className="btn btn-primary me-2" onClick={() => setShowAdd(true)}>Nouvelle promotion</button>
            <button className="btn btn-outline-secondary" onClick={fetchPromos}>Rafraîchir</button>
          </div>
        </div>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : promotions.length === 0 ? (
          <div>Aucune promotion pour l'instant.</div>
        ) : (
          promotions.map((promo) => (
            <PromotionCard
              key={promo.id}
              promo={promo}
              onDelete={handleDelete}
              onToggleActive={handleToggle}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>

      <AddPromoModal show={showAdd} onClose={() => setShowAdd(false)} onSaved={handleSaved} />
    </div>
  );
};


export default Revenue;

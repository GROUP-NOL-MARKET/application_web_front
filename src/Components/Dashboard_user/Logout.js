import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap'
import API from '../Authentification/api';
import { toast } from "react-toastify";

const Logout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        try {
            setLoading(true);
            await API.post("/logout");
            localStorage.removeItem("token");
            toast.success("Déconnexion réussie");
            navigate("/login");
        } catch (err) {
            console.error("Erreur logout", err.response?.data);
            toast.error("Erreur lors de la déconnexion");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>            <div className="shadow-sm border border-1 p-2">
            <div className="border-bottom border-2 border-black w-100 py-2 d-flex align-items-center">
                <h2 className="taux_moyen">Se déconnecter</h2>
            </div>
            <p className="texte_brut text-center mt-3">Cliquez sur le bouton suivant pour vous déconnecter</p>
            <Button className="logout w-100 rounded-5 " onClick={logout} disabled={loading}>

                {loading ? (
                    <Spinner size="sm" animation="border" />
                ) : (

                    <span className="petit_titre">Se déconnecter</span>)}</Button>
        </div>
        </div>
    )
}

export default Logout
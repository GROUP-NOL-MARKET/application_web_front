import React, { useState, useEffect } from 'react'
import utilisateur from "../assets/Images/icone/utilisateur.png";
import security from "../assets/Images/icone/security-lock.png";
import InfosProfil from './InfosProfil';
import ChangeNumero from './ChangeNumero';
import ModifierPassword from './ModifierPassword';
import Suppression from './Suppression';
import { Button } from 'react-bootstrap';
import Preloader from "./Preloader";
import { toast } from 'react-toastify';
import API from '../Authentification/api';
import Profile from './Profile';

const GestionCompte = () => {

    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState("");

    const [showPopUp1, setshowPopUp1] = useState(false);
    const [showPopUp2, setshowPopUp2] = useState(false);
    const [showPopUp3, setshowPopUp3] = useState(false);
    const [showPopUp4, setshowPopUp4] = useState(false);
    const [showPopUp5, setshowPopUp5] = useState(false);

    const closePopUp1 = () => setshowPopUp1(false);
    const openPopUp1 = () => setshowPopUp1(true);
    const closePopUp2 = () => setshowPopUp2(false);
    const openPopUp2 = () => setshowPopUp2(true);
    const closePopUp3 = () => setshowPopUp3(false);
    const openPopUp3 = () => setshowPopUp3(true);
    const closePopUp4 = () => setshowPopUp4(false);
    const openPopUp4 = () => setshowPopUp4(true);
    const closePopUp5 = () => setshowPopUp5(false);
    const openPopUp5 = () => setshowPopUp5(true);


    const fetchUserProfile = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        }
        try {
            const response = await API.get(
                "http://127.0.0.1:8000/api/user"
            );
            setUserEmail(response.data.email);
        } catch (error) {
            console.error("Erreur lors de la récupération du profil:", error);
            // Gérer la déconnexion si le token est invalide
        } finally {
            setLoading(false);
        }
    };

    // Appelez la fonction au montage du composant
    useEffect(() => {
        fetchUserProfile();
    }, []);


    const sendOtp = async () => {
        setLoading(true);
        openPopUp3();
        try {
            const response = await API.post(
                "http://127.0.0.1:8000/api/user/request-otp",
                { email: userEmail }
            );

            toast.success(response.data.message);

        } catch (error) {
            console.error("Erreur complète :", error);

            if (error.response) {
                console.error("Réponse du serveur Laravel :", error.response);
                console.error("Données renvoyées :", error.response.data);

                // Laravel envoie souvent ses erreurs sous 'message' ou 'errors'
                const message =
                    error.response.data?.message ||
                    (error.response.data?.errors
                        ? Object.values(error.response.data.errors).flat().join(", ")
                        : "Erreur serveur Laravel");

                toast.error(message);
            } else if (error.request) {
                console.error("Aucune réponse reçue :", error.request);
                toast.error("Aucune réponse du serveur. Vérifie ta connexion.");
            } else {
                console.error("Erreur inconnue :", error.message);
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }

    };


    return (
        <div>
            <div className="shadow-sm border border-1 p-2">
                <div className="border-bottom border-2 border-black w-100 py-2 d-flex align-items-center">
                    <h2 className="taux_moyen">Gestion du compte</h2>
                </div>
                <div className="container-fluid">
                    <div className="row mt-2">
                        <div className="col-lg-6 col-12 me-2 border border-1 shadow-sm p-2">
                            <div className="row">
                                <span className="col-2 me-1"><img src={utilisateur} alt="" className='img-fluid' /></span>
                                <div className='col d-flex align-items-center'>
                                    <h3 className="taux_moyen ">Informations du compte</h3>
                                </div>
                            </div>
                            <div className='d-flex flex-column'>
                                <div onClick={openPopUp1} style={{ cursor: "pointer" }} className="py-2 petit_titre">
                                    Informations de base
                                </div>
                                <div onClick={openPopUp2} style={{ cursor: "pointer" }} className='petit_titre'>
                                    Changer le numéro de téléphone
                                </div>
                            </div>
                        </div>
                        <div className='col-lg col-12 mt-3 mt-lg-0 border border-1 shadow-sm p-2'>
                            <div className="row">
                                <span className="col-2 me-1"><img src={security} alt="" className='img-fluid' /></span>
                                <div className='col d-flex align-items-center'>
                                    <h3 className="taux_moyen ">Sécurité du compte</h3>
                                </div>
                            </div>
                            <div className="d-flex flex-column">
                                <div onClick={() => sendOtp()} style={{ cursor: "pointer" }} className="py-2 petit_titre">
                                    Modifier le mot de passe
                                </div>
                                <div onClick={openPopUp4} style={{ cursor: "pointer" }} className='petit_titre'>
                                    Supprimer le compte
                                </div>
                            </div>
                        </div>

                    </div>
                    <div>
                        <Button className='mt-3 w-100 rounded-5'><span className="petit_titre" onClick={openPopUp5}>Ajouter une photo de profil</span></Button>
                    </div>
                </div>

            </div>
            {showPopUp1 && (
                <InfosProfil closePopUp1={closePopUp1} />)}
            {showPopUp2 && (
                <ChangeNumero closePopUp2={closePopUp2} />
            )}
            {showPopUp3 && (
                <ModifierPassword closePopUp3={closePopUp3} />)}
            {showPopUp4 && (
                <Suppression closePopUp4={closePopUp4} />)}
            {showPopUp5 && (
                <Profile closePopUp5={closePopUp5} />)}
        </div>
    )

}
export default GestionCompte
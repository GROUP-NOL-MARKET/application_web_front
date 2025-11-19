import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Authentification/api";

const UserDashboardHome = () => {
    //  Charger user depuis localStorage au démarrage
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const navigate = useNavigate();

    //  Rediriger si pas de token et récupérer user depuis l’API
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/connexion");
            return;
        }

        API.get("http://localhost:8000/api/user",)
            .then((response) => {
                setUser(response.data); // met à jour state → déclenche useEffect de synchro
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données:", error);
            });
    }, [navigate]);

    //  Sauvegarder user dans localStorage dès qu’il change
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    return (
        <div className="">
            <div className="shadow-sm border border-1 p-2">
                <div className="border-bottom border-2 border-black w-100 p-2 d-flex align-items-center">
                    <h2 className="taux_moyen">Mon profil</h2>
                </div>
                <div className="container-fluid">
                    <div className="row mt-2">
                        <div className="col-md-6 col-12 me-2 border border-1 border-black d-flex flex-column g-0">
                            <div className="bg-light d-flex align-items-center w-100">
                                <h2 className="taux_moyen ms-2 mt-2">Informations personnelles</h2>
                            </div>
                            <div className=" ms-2">
                                <div className="petit_titre my-1"> Email : <b>{user?.email}</b>  </div>
                                <div className="petit_titre my-1"> Nom: <b>{user?.lastName ? user.lastName : "Aucun enregistré"} </b> </div>
                                <div className="petit_titre my-1"> Prénom : <b>{user?.firstName ? user.firstName : "Aucun enregistré"}</b>  </div>
                                <div className="petit_titre my-1"> Deuxième prénom : <b>{user?.secondName ? user.secondName : "Aucun enregistré"}</b> </div>
                                <div className="petit_titre my-1"> Numéro de téléphone : <b>{user?.phone ? user.phone : "Aucun enregistré"}</b> </div>
                            </div>
                        </div>
                        <div className="col-md mt-3 mt-md-0 col-12 border border-1 border-black d-flex align-items-center flex-column g-0">
                            <div className="bg-light d-flex align-items-center w-100">
                                <h2 className="taux_moyen ms-2 mt-2">Adresses</h2>
                            </div>
                            <div className="petit_titre fw-bold">{user?.addresse ? user.addresse : "Aucun enregistré"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboardHome;

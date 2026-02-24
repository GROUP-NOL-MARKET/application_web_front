import React, { useContext, useEffect, useState } from "react";
import Entete from "./dataset/Entete";
import { Avatar, Rating } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEllipsisVertical, faStar } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "./ThemeContext";
import FooterDashboard from "./dataset/FooterDashboard";
import avis_dashboard_1 from "../assets/Images/avis_dashboard_1.webp";
import avis_dashboard_2 from "../assets/Images/avis_dashboard_2.webp";
import avis_dashboard_3 from "../assets/Images/avis_dashboard_3.webp";
import { toast } from "react-toastify";
import API from "../Authentification/apiAdmin";

const Avis = () => {
  const { theme } = useContext(ThemeContext);
  const [avis, setAvis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les avis depuis ton API
  useEffect(() => {
    const fetchAvis = async () => {
      try {

        const res = await API.get("/admin/avis"
        );
        setAvis(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors du chargement des avis");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvis();
  }, []);

  //  Calcul du score moyen
  const scoreMoyen =
    avis.length > 0
      ? (avis.reduce((acc, item) => acc + parseFloat(item.notation), 0) / avis.length).toFixed(1)
      : 0;

  //  Statistiques par note
  const pourcentageParNote = (note) => {
    if (avis.length === 0) return 0;
    const count = avis.filter((a) => parseInt(a.notation) === note).length;
    return Math.round((count / avis.length) * 100);
  };

  return (
    <div className="">
      {/* En-tête */}
      <Entete title="Avis" />

      {/*  Statistiques principales */}
      <div className="container-fluid">
        <div className="row mt-4">
          {/* Score moyen */}
          <div
            className="col-2 me-2 shadow-sm border border-1 d-flex flex-column align-items-center justify-content-center"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <Rating name="half-rating-read" value={parseFloat(scoreMoyen)} precision={0.5} readOnly />
            <h5 className="taux_moyen">{scoreMoyen}</h5>
            <h5 className="petit_titre">Score Avis</h5>
          </div>

          {/* Exemple de cartes statiques */}
          <div
            className="col-2 me-2 shadow-sm border border-1 d-flex flex-column align-items-center justify-content-center"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <img src={avis_dashboard_1} alt="" className="img-fluid w-50" />
            <h5 className="taux_moyen">{avis.length}</h5>
            <h5 className="petit_titre">Total Avis</h5>
          </div>
          <div
            className="col-2 me-2 shadow-sm border border-1 d-flex flex-column align-items-center justify-content-center"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <img src={avis_dashboard_2} alt="" className="img-fluid w-50" />
            <h5 className="taux_moyen">35%</h5>
            <h5 className="petit_titre">Nouveaux clients</h5>
          </div>
          <div
            className="col-2 me-2 shadow-sm border border-1 d-flex flex-column align-items-center justify-content-center"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <img src={avis_dashboard_3} alt="" className="img-fluid w-50" />
            <h5 className="taux_moyen">80%</h5>
            <h5 className="petit_titre">Clients réguliers</h5>
          </div>

          {/* Progression des notes */}
          <div
            className="col shadow-sm border border-1 p-2"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <ul key={n} className="d-flex flex-row list-unstyled align-items-center">
                <li className="petit_titre">{n}</li>
                <li>
                  <FontAwesomeIcon icon={faStar} style={{ color: "#F5B027" }} className="col" />
                </li>
                <li className="progress col">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${pourcentageParNote(n)}%`,
                      backgroundColor: "#F5B027",
                    }}
                    aria-valuenow={pourcentageParNote(n)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {pourcentageParNote(n)}%
                  </div>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>

      {/* Table des avis */}
      <div
        className="shadow-sm border border-1 mt-4"
        style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
      >
        <h5 className="taux_moyen m-2">Derniers avis acceptés</h5>
        {isLoading ? (
          <p className="text-center">Chargement des avis...</p>
        ) : (
          <div className="container-fluid">
            <table className="table table-striped">
              <tbody>
                {avis.map((avi) => (
                  <tr key={avi.id} className="row">
                    <td className="col-1 d-flex align-items-center justify-content-center">
                      <Avatar src={avi.image || ""} alt={avi.nom} className="img-fluid" />
                    </td>
                    <td className="d-flex flex-column col-2 align-items-center justify-content-center">
                      <h5 className="petit_titre fw-bold">{avi.user.name}</h5>
                      <p className="texte_brut">{avi.user.email}</p>
                    </td>
                    <td className="col-2 d-flex align-items-center justify-content-center">
                      <Rating name="half-rating-read" value={parseFloat(avi.notation)} precision={0.5} readOnly />
                      <span className="petit_titre">{avi.notation}</span>
                    </td>
                    <td className="col-4 d-flex align-items-center justify-content-center">
                      <div className="border border-2 texte_brut text-justify p-2">
                        {avi.appreciation}
                      </div>
                    </td>
                    <td className="d-flex flex-column col-2 align-items-center justify-content-center">
                      <div className="row">
                        <FontAwesomeIcon icon={faClock} className="col-2" style={{ color: "blue" }} />
                        <span className="texte_brut fw-bold col">
                          {new Date(avi.created_at).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                      <h6 className="texte_brut">
                        à {new Date(avi.created_at).toLocaleTimeString("fr-FR")}
                      </h6>
                    </td>
                    <td className="col-1 d-flex align-items-center justify-content-center">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <FooterDashboard />
    </div>
  );
};

export default Avis;

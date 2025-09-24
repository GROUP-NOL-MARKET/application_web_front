import React, { useContext } from "react";
import {Link} from "react-router-dom";
import Entete from "./dataset/Entete";
import { ThemeContext } from "./ThemeContext";
import img_profil from "../assets/Images/img_profil.webp";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faBell,
  faMessage,
  faEnvelope,
  faLocationDot,
  faPhone,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Button from "@mui/material/Button";
import { Form, FormControl, FormLabel, FormGroup, FormSelect } from "react-bootstrap";

const Settings = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="container-fluid">
      {/* En-tête  */}

      <Entete title="Paramètres" />

      {/* Premier content  */}

      <div className="container-fluid">
        <div className="row mt-4">
          {/* Première colonne  */}

          <div className="col-3 me-3 border-1 d-flex flex-column p-0">
            {/* Premier card  */}

            <div
              className="col shadow-sm border d-flex flex-column align-items-center justify-content-center p-2"
              style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
            >
              <div className="d-flex position-relative">
                <Avatar
                  src={img_profil}
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                    border: "2px solid #FA7F1B",
                  }}
                />
                <div
                  className="d-flex position-absolute bottom-0 end-0 rounded-circle p-2"
                  style={{
                    backgroundColor: "gray",
                    border: "1px solid #FA7F1B",
                  }}
                >
                  <FontAwesomeIcon icon={faCamera} />
                </div>
              </div>
              <h5 className="fw-bold petit_titre">John Smith</h5>
              <div
                className="border border-1 rounded-3 text-center p-1 petit_titre"
                style={{ backgroundColor: "red", color: "white" }}
              >
                Administrateur
              </div>
              <p className="text-primary texte_brut pt-2">
                Dernière visite : 01/04/2026
              </p>
              <Button className="bg-primary text-white w-100 rounded-5">
                Déconnecter
              </Button>
            </div>

            {/* Deuxième card  */}

            <div
              className="col shadow-sm border mt-4 d-flex flex-column align-items-center justify-content-center p-2"
              style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
            >
              <div className="row">
                <div className="col-1 d-flex align-items-center">
                  <FontAwesomeIcon icon={faBell} style={{ color: "gold" }} />
                </div>
                <div className="col petit_titre">Notifications (0)</div>
              </div>
              <div className="row mt-2">
                <div className="col-1 d-flex align-items-center">
                  <FontAwesomeIcon icon={faMessage} style={{ color: "blue" }} />
                </div>

                <div className="col petit_titre">Messages (0)</div>
              </div>
            </div>

            {/* Troisième card  */}

            <div
              className="col shadow-sm border border-1 d-flex flex-column mt-4 p-2 px-3"
              style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
            >
              <span className="texte_brut">
                {" "}
                <FontAwesomeIcon icon={faEnvelope} /> mail@gmail.com
              </span>
              <span className="texte_brut pt-2">
                {" "}
                <FontAwesomeIcon icon={faLocationDot} /> Rue 2106, Cotonou,
                9937+8H Cotonou
              </span>
              <span className="texte_brut pt-2">
                {" "}
                <FontAwesomeIcon icon={faPhone} /> (+229) 01 90 52 66 78
              </span>
              <span className="texte_brut pt-2">
                {" "}
                <FontAwesomeIcon icon={faWhatsapp} /> (+229) 01 90 52 66 78
              </span>
              <span className="texte_brut pt-2">
                {" "}
                <FontAwesomeIcon icon={faFile} /> Fichier d'informations du
                profil
              </span>
            </div>
          </div>

          {/* Deuxième colonne card  */}

          <div
            className="col  border border-1 shadow-sm p-3"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <h5 className="taux_moyen">Détails du profil</h5>
            <Form method="post">
              <div className="row mt-1">
                <FormGroup className="col me-3">
                  <FormLabel className="texte_brut">Nom</FormLabel>
                  <FormControl placeholder="AGBO"/>
                </FormGroup>
                <FormGroup className="col">
                  <FormLabel className="texte_brut">Prénom</FormLabel>
                  <FormControl placeholder="Jean"/>
                </FormGroup>
              </div>
               <div className="row mt-1">
                <FormGroup className="col me-3">
                  <FormLabel className="texte_brut">Pays</FormLabel>
                  <FormSelect>
                    <option>Bénin</option>
                    <option>Togo</option>
                    <option>Nigéria</option>
                    <option>Niger</option>
                  </FormSelect>
                </FormGroup>
                <FormGroup className="col">
                  <FormLabel className="texte_brut">Ville</FormLabel>
                  <FormSelect>
                    <option>Cotonou</option>
                    <option>Ouidah</option>
                  </FormSelect>
                </FormGroup>
              </div>
               <div className="row mt-1">
                <FormGroup className="col me-3">
                  <FormLabel className="texte_brut">Email</FormLabel>
                  <FormControl placeholder="moi@gmail.com"/>
                </FormGroup>
                <FormGroup className="col">
                  <FormLabel className="texte_brut">Numéro de téléphone</FormLabel>
                  <FormControl placeholder="01 ** ** ** **"/>
                </FormGroup>
              </div>
               <div className="row mt-1">
                <FormGroup className="col me-3">
                  <FormLabel className="texte_brut">BP</FormLabel>
                  <FormControl placeholder="**"/>
                </FormGroup>
                <FormGroup className="col">
                  <FormLabel className="texte_brut">Nom de l'entreprise</FormLabel>
                  <FormControl placeholder="Group Nol Market"/>
                </FormGroup>
              </div>
                <div className="row mt-1">
                <FormGroup className="col me-3">
                  <FormLabel className="texte_brut">Mot de passe</FormLabel>
                  <FormControl placeholder="****" type="password"/>
                  <Link className="texte_brut" style={{textDecoration:"none"}}>Changer le mot de passe</Link>
                </FormGroup>
                <FormGroup className="col">
                  <FormLabel className="texte_brut">Adresse</FormLabel>
                  <FormControl placeholder="Fidjrossè, Houenoussou"/>
                </FormGroup>
              </div>
              <Button className="text-lowercase petit_titre rounded-5 bg-primary mt-3" style={{color:"white"}}>Changer les informations</Button>
            </Form>
            <h5 className="taux_moyen mt-2">Outils du paneau d'administration</h5>
            <button className="bg-info p-2 b-0 rounded-5" style={{color:'white'}}>Bannières et offres</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

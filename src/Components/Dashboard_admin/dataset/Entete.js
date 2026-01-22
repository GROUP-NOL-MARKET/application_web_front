import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import "../../../Styles/AdminDashbord/appDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

const Entete = ({ title }) => {
  const { theme } = useContext(ThemeContext);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const currentTime = new Date().toLocaleTimeString();
  return (
    <div className="container-fluid">
      <div
        className="border border-1 shadow-sm row p-2
       d-flex align-items-center"
        style={{
          backgroundColor: theme === "dark" ? "black" : "white", 
        }}
      >
        <h4
          className="col-6 name_entreprise_dashboard"
          style={{ color: theme === "dark" ? "white" : "black" }}
        >
          {title}
        </h4>
        <h5 className="col-2 petit_titre d-flex justify-content-end" style={{ color: theme === "dark" ? "white" : "black" }}><FontAwesomeIcon icon={faArrowsRotate}/> Rafraîchir</h5>
        <h6
          className="col-4 petit_title d-flex align-items-center justify-content-center bg-light p-2"
        >
          {formattedDate} {currentTime}
        </h6>
      </div>
    </div>
  );
};

export default Entete;

import React from "react";
import { NavLink } from "react-router-dom";
import "../../Styles/UserDashboard/Gestion.css";
import cheklist from "../assets/Images/icone/checklist.png";
import user from "../assets/Images/icone/user.png";
import comment from "../assets/Images/icone/comment.png";
import avi from "../assets/Images/icone/etoiles-de-notation.png";
import bon from "../assets/Images/icone/coupon.png";
import favorie from "../assets/Images/icone/favorie.png";
import vu from "../assets/Images/icone/eye.png";
import compte from "../assets/Images/icone/utilisateur.png";
import adresse from "../assets/Images/icone/location.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ onNavigate }) => {


  const handleClick = () => {
    onNavigate?.();   // sécurise si la prop n'existe pas
  };

  return (
    <div className="container-fluid">
      <div className="border border-0 border-md-1 border-lg-1 shadow-md p-md-3 w-100">
        <ul className="list-unstyled w-100" style={{ lineHeight: "3.0" }}>
          <li className="petit_titre w-100">
            <NavLink
              to="/user"
              onClick={handleClick}
              className={({ isActive }) =>
                "nav-link text-truncate w-100 " + (isActive ? "active-link" : "text-dark")
              }
              end

            >
              <div className="row"><div className="col-3"><img className="w-100" src={user} alt="" /></div><h4 className="col petit_titre d-flex align-items-center text-truncate">Mon profil</h4></div>
            </NavLink>
          </li>
          <li className="petit_titre">
            <NavLink
              to="/user/Commandes"
              onClick={handleClick}
              className={({ isActive }) =>
                "nav-link text-truncate " + (isActive ? "active-link" : "text-dark")
              }

            >
              <div className="row"><div className="col-3"> <img className="w-100" src={cheklist} alt="" /></div><h4 className="col petit_titre d-flex align-items-center text-truncate">  Mes commandes</h4></div>
            </NavLink>
          </li>
          <li className="petit_titre">
            <NavLink
              to="/user/messages"
              onClick={handleClick}
              className={({ isActive }) =>
                "nav-link  " + (isActive ? "active-link" : "text-dark")
              }

            >
              <div className="row"><div className="col-3"><img className="w-100" src={comment} alt="" /></div><h4 className="col petit_titre d-flex align-items-center text-truncate">Boîte de réception</h4></div>
            </NavLink>
          </li>
          <li className="petit_titre">
            <NavLink
              to="/user/avis"
              onClick={handleClick}
              className={({ isActive }) =>
                "nav-link text-truncate " + (isActive ? "active-link" : "text-dark")
              }

            >
              <div className="row"><div className="col-3"> <img className="w-100" src={avi} alt="" /></div><h4 className="col petit_titre d-flex align-items-center text-truncate">Mes avis</h4> </div>
            </NavLink>
          </li>
          <li className="petit_titre">
            <NavLink
              className={({ isActive }) =>
                "nav-link text-truncate " + (isActive ? "active-link" : "text-dark")
              }

              to="/user/bons"
              onClick={handleClick}
            >
              <div className="row"><div className="col-3"><img className="w-100" src={bon} alt="" /></div><h4 className="col petit_titre d-flex align-items-center text-truncate">Bons d'achat</h4></div>
            </NavLink>
          </li>
          <li className="petit_titre">
            <NavLink
              to="/user/favoris"
              onClick={handleClick}
              className={({ isActive }) =>
                "nav-link text-truncate " + (isActive ? "active-link" : "text-dark")
              }

            >
              <div className="row"><div className="col-3"><img className="w-100" src={favorie} alt="" /></div><h4 className="col petit_titre d-flex align-items-center text-truncate">Favoris</h4></div>
            </NavLink>
          </li>
          <li className="petit_titre">
            <NavLink
              to="/user/products_vus"
              onClick={handleClick}
              className={({ isActive }) =>
                "nav-link text-truncate " + (isActive ? "active-link" : "text-dark")
              }

            >
              <div className="row"><div className="col-3"><img className="w-100" src={vu} alt="" /></div><h4 className="col petit_titre d-flex align-items-center text-truncate">Vus récemment</h4></div>
            </NavLink>
          </li>
          <li className="petit_titre">
            <NavLink
              to="/user/gestion"
              onClick={handleClick}
              className={({ isActive }) =>
                "nav-link text-truncate " + (isActive ? "active-link" : "text-dark")
              }

            >
              <div className="row"><div className="col-3"><img className="w-100" src={compte} alt="" /></div><h4 className="col petit_titre d-flex align-items-center text-truncate"> Gestion du compte</h4></div>
            </NavLink>
          </li>
          <li className="petit_titre">
            <NavLink
              className={({ isActive }) =>
                "nav-link text-truncate " + (isActive ? "active-link" : "text-dark")
              }
              to="/user/adresses"
              onClick={handleClick}
            >
              <div className="row">
                <div className="col-3"><img className="w-100" src={adresse} alt="" /></div>

                <h4 className="col petit_titre d-flex align-items-center text-truncate"> Mon adresse</h4>
              </div>
            </NavLink>
          </li>
          <li className="petit_titre">
            <NavLink
              to="/user/logout"
              onClick={handleClick}
              className={({ isActive }) =>
                "nav-link text-truncate" + (isActive ? "active-link" : "text-dark")
              }
            >
              <FontAwesomeIcon icon={faRightFromBracket} style={{ color: "red" }} />
              <span className="petit_titre" style={{ color: "red" }}>
                Déconnexion
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

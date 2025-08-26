import React from "react";
import { Button } from "react-bootstrap";
import img_entreprise from "../assets/Images/img_entreprise.jpg";
import "../../Styles/APropos.css";

const APropos = () => {
  return (
    <div>
      <div className="container mt-5">
      <h1 className="text-uppercase a_propos_title_1">A Propos de nous</h1></div>
      <div className="" style={{ backgroundColor: "#919191" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="entreprise_img w-100 h-50 py-4 p-sm-0 mt-sm-5 mb-md-4">
                <img
                  alt="entreprse_img"
                  className="w-100 py-4 p-sm-0 border-radius"
                  src={img_entreprise}
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12 text-white mt-5 mt-sm-0 mb-sm-3">
              <h1 className="mt-5 a_propos_title_2"><span style={{ color: "#fa7f1b" }}>GROUP N</span><span style={{color:"#0066BD"}}>OL MARKET</span></h1>
              <p className="text-justify a_propos_text">
                  Nous sommes une entreprise engagée dans la valorisation des
                richesses locales, en vous proposant une large sélection de
                produits locaux frais issus directement de nos producteurs
                partenaires, pour soutenir l’économie locale et garantir une
                qualité authentique. Chez nous, vous trouverez non seulement des
                trésors du terroir de qualité, mais aussi tout ce dont vous avez
                besoin pour votre quotidien : épicerie, boissons, articles pour
                animaux et bien plus encore. Notre mission est de vous offrir le
                meilleur de nos producteurs et fournisseurs, au juste prix, avec
                un service rapide et fiable.....
              </p>
              <Button>En savoir plus</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APropos;

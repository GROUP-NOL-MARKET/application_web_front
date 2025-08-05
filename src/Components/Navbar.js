import React from "react";
import IconButton from "react-bootstrap/IconButton";
import InputBase from "react-bootstrap/InputBase";
import SearchIcon from "react-bootstrap/SearchIcon";

const Navbar = () => {
  return (
    <div>
      <div className="bg-light nav">
        <div className="tel">
          <span>
            <i className="icon-phone"></i>
            <h3>(+229) 01 65 00 29 29</h3>
          </span>
        </div>
        <div>
          <h5>Contactez-nous</h5>
          <h5>A propos</h5>
        </div>
      </div>
      <div className="bg-white">
        <div>
          <img alt="logo" href="/Accueil" src="logo" />
        </div>
        <div className="search">
          <InputBase />
          <IconButton />
          <SearchIcon />
        </div>
        <div className="connexion">
          <logo></logo>
          <p>Mon compte</p>
          <h3>Inscription/Connexion</h3>
        </div>
        <div className="panier">
          <i className="icon-cart"></i>
          <p>Mon panier</p>
        </div>
        <div className="bg-black">
          <ul className="nav-links"></ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

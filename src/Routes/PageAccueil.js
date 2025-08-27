import { useEffect, useRef, useState } from "react";
import Header from "../Components/Accueil/Header";
import { AuthProvider } from "../Components/AuthContext";
import "../Styles/PageAccueil.css";
import Content from "../Components/Accueil/Content";
import Offres from "../Components/Accueil/Offres";
import FlashSale from "../Components/Accueil/FlashSale";
// import Page from "../Components/Accueil/Page";
import APropos from "../Components/Accueil/APropos";
import Avis from "../Components/Accueil/Avis";
import Navbar from "../Components/Accueil/Navbar/Navbar";

const PageAccueil = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const [animationDuration, setAnimationDuration] = useState(0);

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      const textWidth = textRef.current.offsetWidth;
      const containerWidth = containerRef.current.offsetWidth;

      const speed = 50; // px par seconde
      const timeToExit = (containerWidth + textWidth) / speed; // sortie à gauche
      const pauseTime = 0; // secondes d'arrêt au centre

      // durée totale de l’animation
      setAnimationDuration(pauseTime + timeToExit);
    }
  }, []);
  return (
    <AuthProvider>
      <div>
        <div id="js-preloader" class="js-preloader">
          <div class="preloader-inner">
            <span class="dot"></span>
            <div class="dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <Navbar />
        <div className="page_accueil">
          <div className="marquee-container text-uppercase" ref={containerRef}>
            <div
              className="marquee-text"
              ref={textRef}
              style={{ animationDuration: `${animationDuration}s` }}
            >
              Bienvenue sur Nol Market, votre destination pour des produits
              locaux de qualité ! Découvrez notre large gamme de produits frais
              et artisanaux, soigneusement sélectionnés pour vous offrir le
              meilleur de notre terroir. Profitez de nos offres exclusives et de
              la livraison rapide. Rejoignez-nous dès aujourd'hui et faites
              l'expérience d'un marché en ligne unique !
            </div>
          </div>
          <Header />
          <Offres />
          <Content />
          <FlashSale duration={2 * 24 * 60 * 60 * 1000} />
          <APropos />
          <Avis />
        </div>
      </div>
    </AuthProvider>
  );
};

export default PageAccueil;

import Header from "../Components/Accueil/Header";
import { AuthProvider } from "../Components/AuthContext";
import "../Styles/Styles.css";
import Offres from "../Components/Accueil/Offres";
import FlashSale from "../Components/Accueil/FlashSale";
// import Page from "../Components/Accueil/Page";
import APropos from "../Components/Accueil/APropos";
import Avis from "../Components/Accueil/Avis";
import Electromenager from "../Components/Accueil/Electromenager";
import ProduitsFrais from "../Components/Accueil/ProduitsFrais";
import ProduitsLocaux from "../Components/Accueil/ProduitsLocaux";
import Droguerie from "../Components/Accueil/Droguerie";
import Epicerie from "../Components/Accueil/Epicerie";
import Boissons from "../Components/Accueil/Boissons";
import Divers from "../Components/Accueil/Divers";
import PromoBanniere from "../Components/Accueil/PromoBanniere";
import Publicite from "../Components/Accueil/Publicite";
import PopularProducts from "../Components/Accueil/PopularProducts";
import Suite from "../Components/Accueil/Suite";

const PageAccueil = () => {
  return (
    <AuthProvider>
      <div>
        {/* <div id="js-preloader" className="js-preloader">
          <div className="preloader-inner">
            <span className="dot"></span>
            <div className="dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div> */}
        <div className="page_accueil min-vh-100">
          <Header />
          <Offres />
          <PopularProducts />
          <FlashSale duration={2 * 24 * 60 * 60 * 1000} />
          <ProduitsLocaux />
          <Boissons />

          <Suite />

          <Epicerie />

          <Electromenager />

          <Publicite />
          <ProduitsFrais />
          <Droguerie />



          <Divers />
          <APropos />
          <Avis />
          <PromoBanniere />
        </div>
      </div>
    </AuthProvider>
  );
};

export default PageAccueil;

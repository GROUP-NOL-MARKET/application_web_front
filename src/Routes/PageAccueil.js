import Header from "../Components/Accueil/Header";
import { AuthProvider } from "../Components/AuthContext";
import "../Styles/PageAccueil.css";
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
          <ProduitsLocaux />
          <Electromenager />
          <ProduitsFrais />
          <Droguerie />
          <Epicerie />
          <Boissons />
          <Divers />
          <FlashSale duration={2 * 24 * 60 * 60 * 1000} />
          <APropos />
          <Avis />
        </div>
      </div>
    </AuthProvider>
  );
};

export default PageAccueil;

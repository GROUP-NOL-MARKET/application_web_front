import { useContext, useState, useEffect } from "react";
import FedapayButton from "./FedapayButton";
import {
  Button,
  Form,
  FormControl,
  FormLabel,
  FormGroup,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { PanierContext } from "../Store/Panier_context";
import API from "./Authentification/api";
import moov from "./assets/Images/moovmoney.png";
import mtn from "./assets/Images/momo_img.png";
import MomoPay from "./MomoPay";
import MoovPay from "./MoovPay";

const Paiement = () => {
  const { products } = useContext(PanierContext);

  const [showPopUp1, setshowPopUp1] = useState(false);
  const [showPopUp, setshowPopUp] = useState(false);

    const closePopUp = () => setshowPopUp(false);
    const openPopup = () => setshowPopUp(true);
    const closePopUp1 = () => setshowPopUp1(false);
    const openPopup1 = () => setshowPopUp1(true);
  
    useEffect(() => {
      const isAnyPopupOpen =
        showPopUp1 || showPopUp;
  
      document.body.style.overflow = isAnyPopupOpen ? "hidden" : "auto";
  
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [showPopUp1, showPopUp]);

  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const [adresse, setAdresse] = useState({
    ville: "",
    quartier: "",
    rue: "",
    numero: "",
    localisation: "",
  });

  const [loadingAdresse, setLoadingAdresse] = useState(false);
  const [adresseValidee, setAdresseValidee] = useState(false);

  const [user, setUser] = useState({ firstName: "", email: "" }); //  Stocke les infos utilisateur

  const adresseRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s,'-]{3,200}$/;

  const adresseComplete = `${adresse.ville}, ${adresse.quartier}, ${adresse.rue}, ${adresse.numero}, ${adresse.localisation}`;

  // Récupération des infos utilisateur dès le chargement
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await API.get("/user");

        if (response.status === 200 && response.data) {
          setUser({
            firstName: response.data.firstName || "",
            email: response.data.email || "",
          });
        }
      } catch (error) {
        console.error("Erreur récupération utilisateur :", error.message);
      }
    };

    fetchUser();
  }, []);

  //  Soumission de l’adresse
  const handleAdresseSubmit = async (e) => {
    e.preventDefault();

    if (
      !adresse.ville ||
      !adresse.quartier ||
      !adresse.localisation
    ) {
      toast.error("Veuillez remplir tous les champs de l’adresse.");
      return;
    }

    if (!adresseRegex.test(adresse.localisation)) {
      toast.error("Adresse invalide, veuillez corriger.");
      return;
    }

    try {
      setLoadingAdresse(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Session expirée. Veuillez vous reconnecter.");
        window.location.href = "/login";
        return;
      }

      const response = await API.put(
        "/user/update-address",
        { addresse: adresseComplete },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        toast.success("Adresse enregistrée avec succès !");
        setAdresseValidee(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l’enregistrement de l’adresse.");
    } finally {
      setLoadingAdresse(false);
    }
  };

  return (
    <div className="bg-light">
      <div className="container">
        <div className="row">
          {/* ================= FORMULAIRE D’ADRESSE ================= */}
          <div className="col col-lg-8 my-4 me-lg-3 mx-2 mx-lg-0 bg-white shadow-sm rounded-3 p-4 border border-1">
            <h2 className="taux_moyen">Informations domicile client</h2>
            <Form className="w-100" onSubmit={handleAdresseSubmit}>
              {["ville", "quartier", "rue"].map((field) => (
                <FormGroup key={field}>
                  <FormLabel className="label_register">
                    {field.charAt(0).toUpperCase() + field.slice(1)} *
                  </FormLabel>
                  <FormControl
                    placeholder={`Entrez votre ${field}`}
                    className="input_register"
                    value={adresse[field]}
                    onChange={(e) =>
                      setAdresse({ ...adresse, [field]: e.target.value })
                    }
                    disabled={adresseValidee}
                  />
                </FormGroup>
              ))}
              <FormGroup>
                <FormLabel className="label_register">
                  Numéro de maison
                </FormLabel>
                <FormControl
                  placeholder={"Entrez votre numéro de maison"}
                  className="input_register"
                  value={adresse.numero}
                  onChange={(e) =>
                    setAdresse({ ...adresse, numero: e.target.value })
                  }
                  disabled={adresseValidee}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel className="label_register">Localisation *</FormLabel>
                <FormControl
                  as="textarea"
                  rows={4}
                  placeholder="Précisez les détails de localisation"
                  value={adresse.localisation}
                  onChange={(e) =>
                    setAdresse({ ...adresse, localisation: e.target.value })
                  }
                  disabled={adresseValidee}
                />
              </FormGroup>

              <Button
                className="mt-3 w-100 rounded-5"
                type="submit"
                disabled={loadingAdresse || adresseValidee}
              >
                {loadingAdresse ? (
                  <Spinner size="sm" animation="border" />
                ) : adresseValidee ? (
                  <span className="petit_titre">Adresse validée ✅</span>
                ) : (
                  <span className="petit_titre">Enregistrer l’adresse</span>
                )}
              </Button>
            </Form>
          </div>

          {/* ================= PANIER ET PAIEMENT ================= */}
          <div className="my-4 col-lg col-12">
            <div
              className="shadow-sm rounded-3 bg-white p-2 border border-1 menu-scroll"
              style={{ maxHeight: 300 }}
            >
              {products.map((product) => (
                <div className="row" key={product.id}>
                  <div className="col-6 me-2 d-flex align-items-center image_product">
                    <img
                      alt={product.name}
                      src={product.image}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col">
                    <div className="marque text-black-50">{product.marque}</div>
                    <div className="name">{product.name}</div>
                    <div className="type mt-2">Type : {product.type}</div>
                    <div className="type">Quantité : {product.quantity}</div>
                    <div className="disponibilité">
                      Disponibilité : {product.disponibilité}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Résumé du paiement */}
            <div className="shadow-sm bg-white border border-1 rounded-3 p-2 mt-2">
              <div className="row">
                <FormLabel className="title_prix_total col-7">
                  Prix total:
                </FormLabel>
                <h2 className="taux_moyen col">{totalPrice} FCFA</h2>
              </div>

              <div className="row">
                <div className="col-7 title_menu_cart">Total HT :</div>
                <div className="col texte_brut">{totalPrice} FCFA</div>
              </div>

              <div className="row">
                <div className="col-7 title_menu_cart">Rabais :</div>
                <div className="col texte_brut">0%</div>
              </div>

              <div className="row">
                <div className="col-7 title_menu_cart">Remise :</div>
                <div className="col texte_brut">Gratuit</div>
              </div>

              <div className="row">
                <h2 className="title_menu_cart col-7">
                  Adresse de livraison :
                </h2>
                <p className="col texte_brut">
                  {adresseComplete ? adresseComplete : "Non renseignée"}
                </p>
              </div>

              <div className="w-100 mt-1">
                <h2 className="title_prix_total">Payer avec :</h2>
                <ul className="d-flex flex-row gap-4">
                    
                  <li className="bg-light d-flex align-items-center justify-content-center bouton_paiement" onClick={openPopup} style={{borderRadius:"100%", cursor:"pointer"}}>
                    <img alt="" src={mtn} style={{width:"60px"}}/>
                  </li>
                  <li className="bg-light d-flex align-items-center justify-content-center bouton_paiement" onClick={openPopup1} style={{borderRadius:"100%", cursor:"pointer"}}>
                    {/* adresseValidee ? openPopup1 : null */}
                    <img alt="" src={moov} style={{width:"60px"}}/>
                  </li>
                </ul>
                {/* <FedapayButton amount={totalPrice} products={products} address={adresseComplete} /> */}

                {!adresseValidee && (
                  <p className="text-danger text-center mt-2 texte_brut">
                    Veuillez d’abord enregistrer votre adresse avant de payer.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
       {showPopUp && <MomoPay closePopUp={closePopUp} />}
      {showPopUp1 && <MoovPay closePopUp1={closePopUp1} />}
    </div>
  );
};

export default Paiement;

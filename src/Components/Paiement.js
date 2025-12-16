import { useContext, useState, useEffect } from "react";
import FedapayButton from "./FedapayButton";
import KkiaPay from "./kkiapay";
import {
  Button,
  Form,
  FormControl,
  FormLabel,
  FormGroup,
  Spinner,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchCommandes } from "../Store/CommandesSlice";
import { toast } from "react-toastify";
import { PanierContext } from "../Store/Panier_context";
import API from "./Authentification/api";
import moov from "./assets/Images/moovmoney.png";
import mtn from "./assets/Images/momo_img.png";
import MomoPay from "./MomoPay";
import MoovPay from "./MoovPay";

const Paiement = () => {
  const { products } = useContext(PanierContext);

  const dispatch = useDispatch();

  const [showPopUp1, setshowPopUp1] = useState(false);
  const [showPopUp, setshowPopUp] = useState(false);

  const closePopUp = () => setshowPopUp(false);
  const openPopup = () => setshowPopUp(true);
  const closePopUp1 = () => setshowPopUp1(false);
  const openPopup1 = () => setshowPopUp1(true);

  useEffect(() => {
    const isAnyPopupOpen = showPopUp1 || showPopUp;

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

    if (!adresse.ville || !adresse.quartier || !adresse.localisation) {
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

  const { clearCart } = useContext(PanierContext);

  const handleSuccess = async (payment) => {
    console.log("Réponse Kkiapay (dans Paiement):", payment);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Session expirée. Veuillez vous reconnecter.");
        window.location.href = "/login";
        return;
      }

      const payload = {
        transactionId: payment.transactionId ?? payment.transaction_id ?? null,
        amount: totalPrice,
        cart: products,
        phone: user.phone ?? "0000000000",
        requestId: payment.requestId ?? payment.request_id ?? null,
        paymentData: payment,
      };

      console.log("Payload vers backend (Paiement):", payload);

      const response = await API.post("/paiement/kkiapay/callback", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // backend renvoie status success + order_id
      if (response?.status === 200) {
        dispatch(fetchCommandes(1));

        // Vider le panier AVANT de rediriger (await clearCart si c'est async)
        await clearCart();

        toast.success("Paiement effectué et commande enregistrée !", {
          onClose: () => {
            window.location.href = "/"; // ou navigate("/paiement-reussi", { state: { orderId: response.data.order_id, amount: totalPrice } })
          },
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error(
        "Erreur lors du traitement de la commande (Paiement):",
        error
      );

      // Si erreur de validation du backend, afficher les messages s'ils existent
      if (error?.response?.status === 422 && error.response.data?.errors) {
        const errs = error.response.data.errors;
        const firstKey = Object.keys(errs)[0];
        const firstMsg = errs[firstKey][0];
        toast.error(firstMsg);
      } else if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erreur lors du traitement de la commande.");
      }
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
                      className="w-100 h-100"
                    />
                  </div>
                  <div className="col">
                    <div className="marque text-black-50">
                      {product.category}
                    </div>
                    <div className="name">{product.name}</div>
                    <div className="type mt-2">
                      Type : {product.sous_category}
                    </div>
                    <div className="type">Quantité : {product.quantity}</div>
                    <div className="disponibilité">
                      Disponibilité : {product.disponibility}
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

              <div className="w-100 mt-3">
                <h2 className="petit_titre fw-bold">
                  Procéder au paiement avec :
                </h2>
                <ul className="d-flex flex-row ">
                  <div>
                    <li
                      className="bg-light d-flex align-items-center justify-content-center bouton_paiement"
                      onClick={openPopup}
                      style={{ borderRadius: "100%", cursor: "pointer" }}
                    >
                      <img alt="" src={mtn} style={{ width: "70px" }} />
                    </li>
                    <p className="fw-bold" style={{ color: "#CCA204" }}>
                      Mtn momo
                    </p>
                  </div>

                  {/* <li
                    className="bg-light d-flex align-items-center justify-content-center bouton_paiement"
                    onClick={openPopup1}
                    style={{ borderRadius: "100%", cursor: "pointer" }}
                  >
                    
                    <img alt="" src={moov} style={{ width: "60px" }} />
                  </li> */}
                  <div className="mt-3">
                    <li className=" d-flex align-items-center justify-content-center w-100">
                      <KkiaPay
                        amount={totalPrice}
                        email="client@email.com"
                        phone="0123456789"
                        name="Client Abonné"
                        cart={products}
                        // reference={orderReference}
                        disabled={!adresseValidee}
                        onSuccess={handleSuccess}
                      />
                    </li>
                  </div>
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
      {showPopUp && <MomoPay closePopUp={closePopUp} product={products} amount={totalPrice}/>}
      {showPopUp1 && <MoovPay closePopUp1={closePopUp1} />}
    </div>
  );
};

export default Paiement;

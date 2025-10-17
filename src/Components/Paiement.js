import { useContext, useState } from "react";
import FedaPayButton from "./FedapayButton";
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

const Paiement = () => {
    const { products, clearPanier } = useContext(PanierContext);

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
    const [loadingPaiement, setLoadingPaiement] = useState(false);

    const adresseRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s,'-]{3,200}$/;

    const adresseComplete = `${adresse.ville},
    ${adresse.quartier},
    ${adresse.rue},
    ${adresse.numero},
    ${adresse.localisation}`

    // Enregistrer l'adresse
    const handleAdresseSubmit = async (e) => {
        e.preventDefault();

        // Vérification de base
        if (
            !adresse.ville ||
            !adresse.quartier ||
            !adresse.rue ||
            !adresse.numero ||
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

            // On envoie les infos au backend
            const response = await API.put(
                "http://127.0.0.1:8000/api/user/update-address",
                { addresse: adresseComplete }

            );

            if (response.status === 200) {
                toast.success("Adresse enregistrée avec succès !");
                setAdresseValidee(true); // ✅ Active le bouton Payer
            }
        } catch (error) {
            console.error(error.data);
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
                    <div className="col-12 col-lg-8 my-4 me-3 bg-white shadow-sm rounded-3 p-4 border border-1">
                        <h2 className="taux_moyen">Informations domicile client</h2>
                        <Form className="w-100" onSubmit={handleAdresseSubmit}>
                            <FormGroup>
                                <FormLabel className="label_register">Ville</FormLabel>
                                <FormControl
                                    placeholder="Cotonou"
                                    className="input_register"
                                    value={adresse.ville}
                                    onChange={(e) =>
                                        setAdresse({ ...adresse, ville: e.target.value })
                                    }
                                    disabled={adresseValidee}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel className="label_register">Quartier</FormLabel>
                                <FormControl
                                    placeholder="Fidjrossè"
                                    className="input_register"
                                    value={adresse.quartier}
                                    onChange={(e) =>
                                        setAdresse({ ...adresse, quartier: e.target.value })
                                    }
                                    disabled={adresseValidee}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel className="label_register">Rue</FormLabel>
                                <FormControl
                                    placeholder="Rue 2536"
                                    className="input_register"
                                    value={adresse.rue}
                                    onChange={(e) =>
                                        setAdresse({ ...adresse, rue: e.target.value })
                                    }
                                    disabled={adresseValidee}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel className="label_register">Numéro maison</FormLabel>
                                <FormControl
                                    placeholder="236"
                                    className="input_register"
                                    value={adresse.numero}
                                    onChange={(e) =>
                                        setAdresse({ ...adresse, numero: e.target.value })
                                    }
                                    disabled={adresseValidee}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel className="label_register">Localisation</FormLabel>
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
                                {loadingAdresse
                                    ? <Spinner size="sm" animation="border" />
                                    : adresseValidee
                                        ? <span className="petit_titre">Adresse validée ✅</span>
                                        : <span className="petit_titre">Enregistrer l’adresse </span>}
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
                                        <div className="marque text-black-50">
                                            {product.marque}
                                        </div>
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
                        <div className="shadow-sm bg-white border border-1 rounded-3 p-3 mt-2">
                            <div className="row">
                                <FormLabel className="title_prix_total col-7">
                                    Prix total:
                                </FormLabel>
                                <h2 className="taux_moyen col">{totalPrice} FCFA</h2>
                            </div>
                            <div className="row">
                                <div className="col-7 title_menu_cart">Total HT :</div>
                                <div className="col texte_brut">{totalPrice} fcfa</div>
                            </div>
                            <div className="row">
                                <div className="col-7 title_menu_cart">Rabais :</div>
                                <div className="col texte_brut">0%</div>
                            </div>
                            <div className="row">
                                <div className="col-7 title_menu_cart">Remise :</div>
                                <div className="col texte_brut">gratuit</div>
                            </div>
                            <div className="row ">
                                <div className="col-7 title_menu_cart">Prix total TTC :</div>
                                <div className="col texte_brut">{totalPrice} fcfa</div>
                            </div>
                            <div className="row">
                                <h2 className="title_menu_cart col-7"> Adresse de livraison : </h2>
                                <p className="col">Ville, quartier, Rue...</p>
                            </div>
                            <div className="w-100 mt-3">
                                <FedaPayButton
                                    disabled={!adresseValidee || loadingPaiement}
                                    amount={totalPrice}
                                    description="Paiement commande en ligne"
                                    onSuccess={async (transaction) => {
                                        toast.success(" Paiement réussi !");
                                        setLoadingPaiement(true);

                                        const token = localStorage.getItem("token");
                                        const commande = {
                                            produits: products.map((p) => ({
                                                id: p.id,
                                                quantite: p.quantity,
                                                price: p.price,
                                            })),
                                            total: totalPrice,
                                            statut: "validée",
                                            transaction_id: transaction.id,
                                        };

                                        try {
                                            await API.post(
                                                "http://127.0.0.1:8000/api/order/create",
                                                commande,
                                                { headers: { Authorization: `Bearer ${token}` } }
                                            );

                                            toast.success(" Commande enregistrée avec succès !");
                                            clearPanier();

                                            //  Redirection après paiement
                                            setTimeout(() => {
                                                window.location.href = "/";
                                            }, 2000);
                                        } catch (error) {
                                            toast.error("Erreur lors de la sauvegarde de la commande.");
                                        } finally {
                                            setLoadingPaiement(false);
                                        }
                                    }}
                                    onClose={() => toast.info("Paiement annulé par l’utilisateur.")}
                                />

                                {/* Petit message d’info pour guider l’utilisateur */}
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
        </div>
    );
};

export default Paiement;

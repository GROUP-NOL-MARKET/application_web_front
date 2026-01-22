import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Entete from "./dataset/Entete";
import { ThemeContext } from "./ThemeContext";
import img_profil from "../assets/Images/Logo_entreprise.webp";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faBell,
  faMessage,
  faEnvelope,
  faLocationDot,
  faPhone,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Button from "@mui/material/Button";
import {
  Form,
  FormControl,
  FormLabel,
  FormGroup,
  FormSelect,
  Spinner,
} from "react-bootstrap";
import Banniere from "./Banniere";
import ImageCouverture from "./ImageCouverture";
import Publicite from "./Publicite";
import { toast } from "react-toastify";
import APIAdmin from "../Authentification/apiAdmin";

const Settings = () => {
  const [showPopUp, setshowPopUp] = useState(false);
  const [showPopUp1, setshowPopUp1] = useState(false);
  const [showPopUp2, setshowPopUp2] = useState(false);

  const navigate = useNavigate();

  const closePopUp = () => {
    setshowPopUp(false);
  };
  const openPopUp = () => {
    setshowPopUp(true);
  };

  const closePopUp1 = () => {
    setshowPopUp1(false);
  };
  const openPopUp1 = () => {
    setshowPopUp1(true);
  };

  const closePopUp2 = () => {
    setshowPopUp2(false);
  };
  const openPopUp2 = () => {
    setshowPopUp2(true);
  };

  useEffect(() => {
    const isAnyPopupOpen = showPopUp1 || showPopUp2 || showPopUp;

    document.body.style.overflow = isAnyPopupOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPopUp1, showPopUp2, showPopUp]);
  const { theme } = useContext(ThemeContext);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: "",
    email: "",
    city: "",
    BP: "",
    entreprise_name: "",
    adresse: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);

  // --- REGEX VALIDATION ---
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,30}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // --- FETCH USER DATA ---

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        const response = await APIAdmin.get("/admin/admins");

        const data = response.data?.admin || response.data; // compatibilité
        setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          country: data.country || "",
          email: data.email || "",
          city: data.city || "",
          BP: data.BP || "",
          entreprise_name: data.entreprise_name || "",
          adresse: data.adresse || "",
        });
        let userPhone = data.phone || "";

        // Retirer indicatif pays +229 s’il existe
        userPhone = userPhone.replace(/^(\+?229)/, "");

        // Retirer tout sauf chiffres
        userPhone = userPhone.replace(/\D/g, "");

        // Limiter à 10 chiffres
        userPhone = userPhone.slice(0, 10);

        // Reformater : XX XX XX XX XX
        const formattedPhone = userPhone.replace(/(\d{2})(?=\d)/g, "$1 ");

        setForm((prev) => ({
          ...prev,
          phone: formattedPhone.trim(),
        }));
      } catch (error) {
        console.error("Erreur lors du chargement du profil:", error);

        // Token expiré
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          toast.warning("Votre session a expiré, veuillez vous reconnecter.");
          navigate("/login", { replace: true });
        }
      }
    };
    fetchAdmin();
  }, [navigate]);

  // --- HANDLE CHANGES ---
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleChangePhone = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 10);
    value = value.replace(/(\d{2})(?=\d)/g, "$1 ");

    setForm((prev) => ({ ...prev, phone: value }));
    setErrors((prev) => ({ ...prev, phone: "" }));
  };

  // --- VALIDATION FRONTEND ---
  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim())
      newErrors.firstName = "Le prénom est obligatoire.";
    else if (!nameRegex.test(form.firstName))
      newErrors.firstName =
        "Le prénom ne doit contenir que des lettres valides.";

    if (!form.lastName.trim()) newErrors.lastName = "Le nom est obligatoire.";
    else if (!nameRegex.test(form.lastName))
      newErrors.lastName = "Le nom ne doit contenir que des lettres valides.";

    if (!form.country) newErrors.country = "Choisissez un pays.";

    if (!form.email.trim())
      newErrors.email = "L'adresse email est obligatoire.";
    else if (!emailRegex.test(form.email.trim()))
      newErrors.email = "L'adresse email est invalide.";

    if (!form.city) newErrors.city = "Choisissez une ville";

    const cleanPhone = form.phone.replace(/\s/g, "");

    if (!form.phone) {
      newErrors.phone = "Entrez un numéro de téléphone";
    } else if (!/^01\d{8}$/.test(cleanPhone)) {
      newErrors.phone =
        "Le numéro doit commencer par 01 et contenir 10 chiffres au total.";
    } else {
      // Vérifie que les deux chiffres après '01' sont entre 20 et 29
      const secondPair = parseInt(cleanPhone.substring(2, 4), 10);
      if (secondPair < 50 || secondPair > 99) {
        newErrors.phone =
          "Les deux chiffres après '01' doivent être compris entre 20 et 29.";
      }
    }

    if (!form.BP) newErrors.BP = "Entrez votre BP";

    if (!form.entreprise_name)
      newErrors.entreprise_name = "Veuillez entrer un nom valide.";

    if (!form.adresse)
      newErrors.adresse = "Veuillez entrer une adresse valide.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- SUBMIT FORM ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("Session expirée. Veuillez vous reconnecter.");

        navigate("/admin", { replace: true });

        return;
      }
      const cleanPhone = form.phone.replace(/\s/g, "");

      const payload = {
        ...form,
        phone: cleanPhone,
      };
      const response = await APIAdmin.put("/admin/admins-info", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(response.data.message || "Profil mis à jour avec succès !");
      closePopUp1();
    } catch (error) {
      console.error("Erreur :", error);
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        toast.warning("Votre session a expiré, veuillez vous reconnecter.");
        navigate("/admin", { replace: true });
      } else {
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Déconnexion admin
  const logout = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      await APIAdmin.post(
        "/admin/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem("adminToken");
      toast.success("Déconnexion réussie");
      navigate("/admin/");
    } catch (err) {
      toast.error("Erreur lors de la déconnexion");
    }
  };

  return (
    <div className="container-fluid">
      {/* En-tête  */}

      <Entete title="Paramètres" />

      {/* Premier content  */}

      <div className="container-fluid">
        <div className="row mt-4">
          {/* Première colonne  */}

          <div className="col-3 me-3 border-1 d-flex flex-column p-0">
            {/* Premier card  */}

            <div
              className="col shadow-sm border d-flex flex-column align-items-center justify-content-center p-2"
              style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
            >
              <div className="d-flex position-relative">
                <Avatar
                  src={img_profil}
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                    border: "2px solid #FA7F1B",
                  }}
                />
                <div
                  className="d-flex position-absolute bottom-0 end-0 rounded-circle p-2"
                  style={{
                    backgroundColor: "gray",
                    border: "1px solid #FA7F1B",
                  }}
                >
                  <FontAwesomeIcon icon={faCamera} />
                </div>
              </div>
              <h5 className="fw-bold petit_titre">
                {form.lastName}   {form.firstName}
              </h5>
              <div className="bg-primary text-white border border-1 rounded-3 text-center p-1 petit_titre">
                Administrateur
              </div>
              <p className="text-primary texte_brut pt-2">
                Dernière visite : 01/04/2026
              </p>
              <Button
                className=" w-100 rounded-5"
                onClick={() => logout()}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Déconnecter
              </Button>
            </div>

            {/* Deuxième card  */}

            <div
              className="col shadow-sm border mt-4 d-flex flex-column align-items-center justify-content-center p-2"
              style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
            >
              <div className="row">
                <div className="col-1 d-flex align-items-center">
                  <FontAwesomeIcon icon={faBell} style={{ color: "gold" }} />
                </div>
                <div className="col petit_titre">Notifications (0)</div>
              </div>
              <div className="row mt-2">
                <div className="col-1 d-flex align-items-center">
                  <FontAwesomeIcon icon={faMessage} style={{ color: "blue" }} />
                </div>

                <div className="col petit_titre">Messages (0)</div>
              </div>
            </div>

            {/* Troisième card  */}

            <div
              className="col shadow-sm border border-1 d-flex flex-column mt-4 p-2 px-3"
              style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
            >
              <span className="texte_brut">
                {" "}
                <FontAwesomeIcon icon={faEnvelope} /> {form.email}
              </span>
              <span className="texte_brut pt-2">
                {" "}
                <FontAwesomeIcon icon={faLocationDot} /> Rue 2106, Cotonou,
                9937+8H Cotonou
              </span>
              <span className="texte_brut pt-2">
                {" "}
                <FontAwesomeIcon icon={faPhone} /> (+229) 01 65 00 29 29
              </span>
              <span className="texte_brut pt-2">
                {" "}
                <FontAwesomeIcon icon={faWhatsapp} /> (+229) 01 65 00 28 00
              </span>
              <span className="texte_brut pt-2">
                {" "}
                <FontAwesomeIcon icon={faFile} /> Fichier d'informations du
                profil
              </span>
            </div>
          </div>

          {/* Deuxième colonne card  */}

          <div
            className="col  border border-1 shadow-sm p-3"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <h5 className="taux_moyen">Détails du profil</h5>
            <Form method="post">
              <div className="row mt-1">
                <FormGroup className="col me-3">
                  <FormLabel className="texte_brut">Nom</FormLabel>
                  <FormControl
                    name="lastName"
                    placeholder="Group Nol"
                    isInvalid={!!errors.lastName}
                    value={form.lastName}
                    onChange={handleChange}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.lastName}
                  </FormControl.Feedback>
                </FormGroup>
                <FormGroup className="col">
                  <FormLabel className="texte_brut">Prénom</FormLabel>
                  <FormControl
                    name="firstName"
                    placeholder="Market"
                    isInvalid={!!errors.firstName}
                    value={form.firstName}
                    onChange={handleChange}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.firstName}
                  </FormControl.Feedback>
                </FormGroup>
              </div>
              <div className="row mt-1">
                <FormGroup className="col me-3">
                  <FormLabel className="texte_brut">Pays</FormLabel>
                  <FormSelect
                    name="country"
                    isInvalid={!!errors.country}
                    value={form.country}
                    onChange={handleChange}
                  >
                    <option value="">--Choisir--</option>
                    <option value="Bénin">Bénin</option>
                    <option value="Togo">Togo</option>
                    <option value="Nigéria">Nigéria</option>
                    <option value="Niger">Niger</option>
                  </FormSelect>
                  {/* <FormSelect.Feedback type="invalid">
                    {errors.country}
                  </FormSelect.Feedback> */}
                </FormGroup>
                <FormGroup className="col">
                  <FormLabel className="texte_brut">Ville</FormLabel>
                  <FormSelect
                    name="city"
                    isInvalid={!!errors.city}
                    value={form.city}
                    onChange={handleChange}
                  >
                     <option value="">--Choisir--</option>
                    <option value="Cotonou">Cotonou</option>
                    <option value="Ouidah">Ouidah</option>
                  </FormSelect>
                  {/* <FormSelect.Feedback type="invalid">
                    {errors.city}
                  </FormSelect.Feedback> */}
                </FormGroup>
              </div>
              <div className="row mt-1">
                <FormGroup className="col me-3">
                  <FormLabel className="texte_brut">Email</FormLabel>
                  <FormControl
                    name="email"
                    placeholder="moi@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.email}
                  </FormControl.Feedback>
                </FormGroup>
                <FormGroup className="col">
                  <FormLabel className="texte_brut">
                    Numéro de téléphone
                  </FormLabel>
                  <FormControl
                    name="phone"
                    placeholder="01 ** ** ** **"
                    isInvalid={!!errors.phone}
                    value={form.phone}
                    onChange={handleChangePhone}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.phone}
                  </FormControl.Feedback>
                </FormGroup>
              </div>
              <div className="row mt-1">
                <FormGroup className="col me-3">
                  <FormLabel className="texte_brut">BP</FormLabel>
                  <FormControl
                    name="BP"
                    placeholder="**"
                    type="number"
                    isInvalid={!!errors.BP}
                    value={form.BP}
                    onChange={handleChange}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.BP}
                  </FormControl.Feedback>
                </FormGroup>
                <FormGroup className="col">
                  <FormLabel className="texte_brut">
                    Nom de l'entreprise
                  </FormLabel>
                  <FormControl
                    name="entreprise_name"
                    placeholder="Group Nol Market"
                    isInvalid={!!errors.entreprise_name}
                    value={form.entreprise_name}
                    onChange={handleChange}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.entreprise_name}
                  </FormControl.Feedback>
                </FormGroup>
              </div>
              <div className="row mt-1">
                <FormGroup className="col me-3">
                  <FormLabel className="texte_brut">Mot de passe</FormLabel>
                  <FormControl placeholder="****" type="password" />
                  <Link
                    className="texte_brut"
                    style={{ textDecoration: "none" }}
                  >
                    Changer le mot de passe
                  </Link>
                </FormGroup>
                <FormGroup className="col">
                  <FormLabel className="texte_brut">Adresse</FormLabel>
                  <FormControl
                    name="adresse"
                    placeholder="Fidjrossè, Houenoussou"
                    isInvalid={!!errors.adresse}
                    value={form.adresse}
                    onChange={handleChange}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.adresse}
                  </FormControl.Feedback>
                </FormGroup>
              </div>
              <Button
                className="text-lowercase petit_titre rounded-5 bg-primary mt-3"
                style={{ color: "white" }}
                type="submit"
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <Spinner size="sm" animation="border" />
                ) : (
                  "Changer les informations"
                )}
              </Button>
            </Form>
            <h5 className="taux_moyen mt-2">
              Outils du paneau d'administration
            </h5>
            <button
              className="bg-info p-2 b-0 rounded-5 border-0"
              style={{ color: "white" }}
              onClick={() => openPopUp()}
            >
              Bannières et offres
            </button>
            <button
              className=" p-2 b-0 rounded-5 ms-3 border-0"
              style={{ color: "white", backgroundColor: "#B01D00" }}
              onClick={() => openPopUp1()}
            >
              Images de couverture
            </button>
            <button
              className=" p-2 b-0 rounded-5 ms-3 border-0"
              style={{ color: "white", backgroundColor: "#37CC66" }}
              onClick={() => openPopUp2()}
            >
              Publicité
            </button>
          </div>
        </div>
      </div>
      {showPopUp && <Banniere closePopUp={closePopUp} />}
      {showPopUp1 && <ImageCouverture closePopUp1={closePopUp1} />}
      {showPopUp2 && <Publicite closePopUp2={closePopUp2} />}
    </div>
  );
};

export default Settings;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Register.css";
import { Form, FormGroup, Button, Spinner, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "./api";
import {
  faArrowLeft,
  faEnvelope,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGoogle,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import img_entreprise from "../assets/Images/Logo_entreprise-removebg-preview.webp";
import ReactCountryDropdown from "react-country-dropdown";

const Register = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [modeEmail, setModeEmail] = useState(true);
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const handleNavigateHome = () => {
    navigate("/");
  };

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost:8000/auth/${provider}/redirect`;
  };

  const handleChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Retire tout sauf les chiffres
    value = value.slice(0, 10); // Limite à 10 chiffres
    value = value.replace(/(\d{2})(?=\d)/g, "$1 "); // Ajoute un espace après chaque 2 chiffres
    setPhone(value);
    setErrors({}); // Réinitialise les erreurs à chaque modification
  };

  const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  const cleanPhone = phone.replace(/\s/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const newErrors = {};

    if (password !== confirm_password) {
      newErrors.confirm_password = "Les mots de passe ne correspondent pas";
    } else if (!confirm_password) {
      newErrors.confirm_password = "Confirmez le mot de passe";
    } else {
    }

    // Vérifie si vide
    if (!cleanPhone.trim()) {
      newErrors.phone = "Entrez un numéro de téléphone.";
    } else if (!/^01\d{8}$/.test(cleanPhone)) {
      newErrors.phone =
        "Le numéro doit commencer par 01 et contenir 10 chiffres au total.";
    } else {
      // Vérifie que les deux chiffres après '01' sont entre 20 et 29
      const secondPair = parseInt(cleanPhone.substring(2, 4), 10);
      if (secondPair < 50 || secondPair > 99) {
        newErrors.phone =
          "Les deux chiffres après '01' doivent être compris entre 50 et 99.";
      }
    }

    if (!EmailRegex.test(email)) {
      newErrors.email = "L'email est invalide";
    } else if (!email.trim()) {
      newErrors.email = "Veuillez remplir ce champ";
    } else {
    }

    if (!PasswordRegex.test(password)) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères, 1 lettre, un chiffre et un caractère spécial";
    } else if (!password) {
      newErrors.password = "Veuillez remplir ce champ";
    } else {
      delete newErrors.setPassword;
    }

    if (!isChecked) {
      newErrors.isChecked =
        "Veuillez acceptez les termes et conditions d'utilisation";
    } else {
      delete newErrors.isChecked;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }
    try {
      const userInput = {
        email: modeEmail ? email : null,
        phone: !modeEmail ? cleanPhone : null,
        password: password,
        password_confirmation: confirm_password,
      };
      const res = await API.post("/register", userInput);
      setSuccess(res.data.message);
      toast.success("Inscription réussie");
      navigate("/login");
      localStorage.setItem("token", res.data.token); // Sauvegarde le token
    } catch (err) {
      if (err.response) {
        setErrors(err.response.data.message);
        toast.error(errors);
      } else {
        setSuccess("Erreur serveur");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="register_page">
      <div className="container-fluid mt-4">
        <div className="col-md-6 col-sm-10 offset-sm-1 offset-md-3 my-5 d-flex align-items-center justify-content-center">
          <div className="formulaire">
            <ul
              className="d-flex flex-row list-unstyled gap-2"
              style={{ color: "#0066BD", cursor: "pointer" }}
              onClick={handleNavigateHome}
            >
              <li>
                <FontAwesomeIcon icon={faArrowLeft} />
              </li>
              <li>Retour à l'accueil</li>
            </ul>
            <div className="en-tête d-flex flex-column align-items-center">
              <img
                src={img_entreprise}
                alt="Entreprise Logo"
                style={{ height: "60px" }}
              />
              <h1 className="Title_register" style={{ color: "#FA7F1B" }}>
                <span style={{ color: "#0066BD" }}>INSCRI</span>PTION
              </h1>
              <h6 className="Subtitle_register m-2">
                Bienvenu(e) sur la page d'inscription de Nol Market. Créez votre
                compte pour accéder à toutes les fonctionnalités
              </h6>
            </div>
            <div className="formulaire-content">
              <form
                method="post"
                className=" mt-3 container"
                onSubmit={handleSubmit}
              >
                {modeEmail ? (
                  <FormGroup className="m-2">
                    <Form.Label className="label_register">Email</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="email"
                        value={email}
                        className="input_register"
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={errors?.email ? true : false}
                      />
                      <Button onClick={() => setModeEmail(!modeEmail)}>
                        <FontAwesomeIcon icon={faMobile} />
                      </Button>
                    </InputGroup>

                    <Form.Control.Feedback type="invalid">
                      {errors?.email}
                    </Form.Control.Feedback>
                  </FormGroup>
                ) : (
                  <FormGroup className="m-2">
                    <Form.Label className="label_register">
                      Numéro de téléphone
                    </Form.Label>
                    <div className="row">
                      <div className="col-4 col-sm-3 col-md-4 col-lg-2 me-1" style={{pointerEvents:"none"}}>
                        <ReactCountryDropdown defaultCountry="BJ" />
                      </div>
                      <InputGroup className="col">
                        <Form.Control
                          type="tel"
                          placeholder="01 XX XX XX XX"
                          className="input_register"
                          value={phone}
                          onChange={handleChange}
                          isInvalid={errors?.phone ? true : false}
                        />
                        <Button onClick={() => setModeEmail(!modeEmail)}>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </Button>
                      </InputGroup>
                    </div>

                    <Form.Control.Feedback type="invalid">
                      {errors?.phone}
                    </Form.Control.Feedback>
                  </FormGroup>
                )}

                <FormGroup className="m-2">
                  <Form.Label className="label_register">
                    Mot de passe
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword1 ? "text" : "password"}
                      className="input_register"
                      placeholder=""
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      isInvalid={errors?.password ? true : false}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={togglePasswordVisibility1}
                    >
                      <FontAwesomeIcon
                        icon={showPassword1 ? faEyeSlash : faEye}
                      />
                    </Button>
                  </InputGroup>

                  <Form.Control.Feedback type="invalid">
                    {errors?.password && errors.password}
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="m-2">
                  <Form.Label className="label_register">
                    Confirmer le mot de passe
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword2 ? "text" : "password"}
                      className="input_register"
                      value={confirm_password}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      isInvalid={errors?.confirm_password ? true : false}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={togglePasswordVisibility2}
                    >
                      <FontAwesomeIcon
                        icon={showPassword2 ? faEyeSlash : faEye}
                      />
                    </Button>
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    {errors?.confirm_password && errors.confirm_password}
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup>
                  <div className="agree container">
                    <span style={{ hyphens: "auto" }}>
                      <input
                        className={`m-1 cursor-pointer ${
                          errors?.isChecked ? "is-invalid" : ""
                        }`}
                        type="checkbox"
                        checked={isChecked} // State variable to control checked status
                        onChange={(e) => setIsChecked(e.target.checked)}
                      />
                      En créant votre compte, vous acceptez nos termes et
                      conditions d'utilisation.
                      {errors?.isChecked && (
                        <div className="invalid-feedback">
                          {errors.isChecked}
                        </div>
                      )}
                    </span>
                  </div>
                </FormGroup>

                <Button
                  className="button_register w-100 text-center mt-3 mb-2"
                  type="submit"
                  disabled={isLoading}
                  style={{
                    position: "relative",
                  }}
                >
                  {isLoading ? (
                    <Spinner size="sm" animation="border" />
                  ) : (
                    "S'inscrire"
                  )}
                </Button>
              </form>
              <p className="link_connexion_register d-flex justify-content-center mt-2">
                Avez-vous déjà un compte ?{" "}
                <span style={{ fontWeight: "bold", color: "blue" }}>
                  <Link to="/login">Connectez-vous!!</Link>
                </span>
              </p>
              <div className="container">
                <div className="row h-auto d-flex align-items-center">
                  <hr
                    className="col-5"
                    style={{ color: "#FA7F1B", height: "1rem" }}
                  ></hr>
                  <p
                    className=" col-2 text-center"
                    style={{ color: "#0066BD", fontWeight: "bold" }}
                  >
                    OU
                  </p>
                  <hr
                    className="col-5"
                    style={{ color: "#FA7F1B", height: "1rem" }}
                  ></hr>
                </div>
              </div>

              <div className="register_reseaux_sociaux d-flex justify-content-center">
                <div className="social m-2">
                  <FontAwesomeIcon
                    icon={faGoogle}
                    className=""
                    onClick={() => handleSocialLogin("google")}
                  />
                </div>
                <div className="social m-2 d-flex align-items-center">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className=""
                    onClick={() => handleSocialLogin("facebook")}
                  />
                </div>
                <div className="social m-2">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className=""
                    onClick={() => handleSocialLogin("instagram")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

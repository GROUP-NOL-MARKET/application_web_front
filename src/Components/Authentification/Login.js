import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import API from "./api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img_entreprise from "../assets/Images/Logo_entreprise-removebg-preview.webp";
import {
  faFacebook,
  faInstagram,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEye,
  faEyeSlash,
  faEnvelope,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import "../../Styles/Login.css";
import { useSocialAuth } from "../../Hooks/UseSocialAuth";


// Préfixes béninois valides
const PREFIXES_BENIN = [
  "61", "62", "66", "67", "69", "90", "91", "96", "97", // MTN
  "60", "63", "64", "65", "68", "93", "94", "95",       // Moov Africa
  "21", "22", "23"                                        // Fixes
];

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [modeEmail, setModeEmail] = useState(true);
  const [errors, setErrors] = useState({});
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 10);
    value = value.replace(/(\d{2})(?=\d)/g, "$1 ");
    setPhone(value);
    setErrors({});
  };

  const handleNavigateHome = () => navigate("/");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const { handleSocialLogin } = useSocialAuth();


  const toggleMode = () => {
    setModeEmail(!modeEmail);
    setErrors({});
    if (!modeEmail) setEmail("");
    else setPhone("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);

    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    const cleanPhone = phone.replace(/\s/g, "");

    //  Validation email ou téléphone
    if (modeEmail) {
      if (!email.trim()) {
        newErrors.email = "Veuillez entrer un email";
      } else if (!emailRegex.test(email)) {
        newErrors.email = "L'email est invalide";
      }
    } else {
      if (!cleanPhone.trim()) {
        newErrors.phone = "Veuillez entrer un numéro de téléphone";
      } else if (!/^01\d{8}$/.test(cleanPhone)) {
        newErrors.phone = "Le numéro doit commencer par 01 et contenir 10 chiffres";
      } else {
        //  Validation stricte par préfixe béninois
        const prefix = cleanPhone.substring(2, 4);
        if (!PREFIXES_BENIN.includes(prefix)) {
          newErrors.phone = "Numéro invalide. Vérifiez votre opérateur (MTN ou Moov)";
        }
      }
    }

    // Validation mot de passe 
    if (!password) {
      newErrors.password = "Veuillez entrer votre mot de passe";
    } else if (!passwordRegex.test(password)) {
      newErrors.password = "Mot de passe incorrect (min 8 caractères, 1 lettre, 1 chiffre, 1 caractère spécial)";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      const cleanPhone = phone.replace(/\s/g, "");
      const userInput = {
        email: modeEmail ? email : null,
        phone: !modeEmail ? cleanPhone : null,
        password: password,
      };
      const res = await API.post("/login", userInput);
      setSuccess(res.data.message);
      localStorage.setItem("token", res.data.token);
      toast.success("Connexion réussie");
      navigate("/", { replace: true });
      window.location.reload();
    } catch (err) {
      if (err.response?.status === 404) {
        toast.error(err.response.data.error);
      } else if (err.response?.status === 422) {
        //  Corrigé : on lit bien le message avant de le passer au toast
        toast.error(err.response?.data?.message || "Une erreur est survenue");
      } else {
        toast.error("Identifiants invalides ou erreur serveur");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="connexion_form">
      <div className="container-fluid">
        <div className="row">
          <div className="offset-md-3 col-md-6 col-12">
            <div className="formulaire_connexion my-5 p-3">

              <ul
                className="d-flex flex-row list-unstyled gap-2"
                style={{ color: "#0066BD", cursor: "pointer" }}
                onClick={handleNavigateHome}
              >
                <li><FontAwesomeIcon icon={faArrowLeft} /></li>
                <li>Retour à l'accueil</li>
              </ul>

              <div className="en-tête d-flex flex-column align-items-center">
                <img src={img_entreprise} alt="Entreprise Logo" style={{ height: "75px" }} />
                <h1 className="Title_register" style={{ color: "#FA7F1B" }}>
                  <span style={{ color: "#0066BD" }}>CONN</span>EXION
                </h1>
                <h6 className="Subtitle_register m-2">
                  Bienvenu sur la page de connexion de Nol Market.
                  Connectez-vous pour accéder à toutes les fonctionnalités
                </h6>
              </div>

              <Form className="formulaire_connexion_content" method="post" onSubmit={handleSubmit}>

                {modeEmail ? (
                  <FormGroup className="m-2">
                    <Form.Label className="label_register">Email</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="email"
                        value={email}
                        className="input_register"
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={!!errors?.email}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={toggleMode}
                        title="Utiliser un numéro de téléphone"
                      >
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
                    <InputGroup>
                      {/*  Badge indicatif Bénin propre et aligné */}
                      <InputGroup.Text
                        style={{
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #ced4da",
                          borderRight: "none",
                          fontSize: "13px",
                          whiteSpace: "nowrap",
                          padding: "0 10px",
                        }}
                      >
                        🇧🇯 +229
                      </InputGroup.Text>

                      <Form.Control
                        type="tel"
                        placeholder="01 XX XX XX XX"
                        className="input_register"
                        value={phone}
                        onChange={handleChange}
                        isInvalid={!!errors?.phone}
                        style={{ borderLeft: "none" }}
                      />

                      <Button
                        variant="outline-secondary"
                        onClick={toggleMode}
                        title="Utiliser un email"
                      >
                        <FontAwesomeIcon icon={faEnvelope} />
                      </Button>
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                      {errors?.phone}
                    </Form.Control.Feedback>
                  </FormGroup>
                )}

                <FormGroup className="m-2">
                  <FormLabel className="label_register">Mot de passe</FormLabel>
                  <InputGroup>
                    <FormControl
                      className="input_register"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      isInvalid={!!errors?.password}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </Button>
                  </InputGroup>
                  <FormControl.Feedback type="invalid">
                    {errors?.password}
                  </FormControl.Feedback>
                </FormGroup>

                <Button
                  className="button_login w-100 mt-3 mb-3"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner size="sm" animation="border" /> : "Se connecter"}
                </Button>
              </Form>

              <p className="link_connexion_register d-flex justify-content-center mt-2">
                N'avez-vous pas de compte ?{" "}
                <span style={{ fontWeight: "bold", color: "blue" }}>
                  <Link to="/register"> Inscrivez-vous !!</Link>
                </span>
              </p>

              <div className="container">
                <div className="row h-auto d-flex align-items-center">
                  <hr className="col-5" style={{ color: "#FA7F1B", height: "1rem" }} />
                  <p className="col-2 text-center" style={{ color: "#0066BD", fontWeight: "bold" }}>
                    OU
                  </p>
                  <hr className="col-5" style={{ color: "#FA7F1B", height: "1rem" }} />
                </div>
              </div>

              <div className="register_reseaux_sociaux d-flex justify-content-center">
                <div className="social m-2">
                  <FontAwesomeIcon icon={faGoogle} onClick={() => handleSocialLogin("google")} />
                </div>
                <div className="social m-2 d-flex align-items-center">
                  <FontAwesomeIcon icon={faFacebook} onClick={() => handleSocialLogin("facebook")} />
                </div>
                <div className="social m-2">
                  <FontAwesomeIcon icon={faInstagram} onClick={() => handleSocialLogin("instagram")} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
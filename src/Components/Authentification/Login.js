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
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
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

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const handleNavigateHome = () =>{
    navigate("/");
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhoset:8000/auth/${provider}/redirect`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);

    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!email.trim()) {
      newErrors.email = "Veuillez remplir ce champ";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email invalide";
    } else {
      delete newErrors.email;
    }

    if (!password) {
      newErrors.password = "Veuillez entrer votre mot de passe";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Mot de passe incorrect (min 8 caractères, au moins 1 lettre et 1 chiffre)";
    } else {
      delete newErrors.password;
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }
    try {
      const userInput = {
        email: email,
        password: password,
      };
      const res = await API.post("/login", userInput);
      setSuccess(res.data.message);
      localStorage.setItem("token", res.data.token); // Sauvegarde token JWT
      toast.success("Connexion réussie");
      navigate("/", { replace: true });
      window.location.reload();
    } catch (err) {
      if (err.response?.status === 404) {
        toast.error(err.response.data.error); // erreurs validation Laravel
      } else if (err.response?.status === 422) {
        toast.error(err.response.data.error);
      } else {
        setSuccess("Identifiants invalides ou erreur serveur");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="connexion_form ">
      <div className="container-fluid">
        <div className="row">
          <div className="offset-md-3 col-md-6 col-12">
            <div className="formulaire_connexion my-5 p-3">
              <ul className="d-flex flex-row list-unstyled gap-2" style={{color:"#0066BD", cursor:"pointer"}} onClick={handleNavigateHome}>
                <li>
                <FontAwesomeIcon icon={faArrowLeft}/>
                </li>
                <li>Retour à l'accueil</li>
              </ul>
              
              <div className="en-tête d-flex flex-column align-items-center">
                <img
                  src={img_entreprise}
                  alt="Entreprise Logo"
                  style={{ height: "75px" }}
                />
                <h1 className="Title_register" style={{ color: "#FA7F1B" }}>
                  <span style={{ color: "#0066BD" }}>CONN</span>EXION
                </h1>
                <h6 className="Subtitle_register m-2">
                  Bienvenu sur la page de connexion de Nol Market.
                  Connectez-vous pour accéder à toutes les fonctionnalités
                </h6>
              </div>
              <Form
                className="formulaire_connexion_content"
                method="post"
                onSubmit={handleSubmit}
              >
                <FormGroup className="m-2">
                  <FormLabel className="label_register">Email</FormLabel>
                  <FormControl
                    className="input_register"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    isInvalid={errors?.email ? true : false}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors?.email && errors.email}
                  </FormControl.Feedback>
                </FormGroup>
                <FormGroup className="m-2">
                  <FormLabel className="label_register">Mot de passe</FormLabel>
                  <InputGroup>
                    <FormControl
                      className="input_register"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      isInvalid={errors?.password ? true : false}
                    />
                    <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </Button>
                  </InputGroup>
                  <FormControl.Feedback type="invalid">
                    {errors?.password && errors.password}
                  </FormControl.Feedback>
                </FormGroup>
                <Button
                  className="button_login w-100 mt-3 mb-3"
                  type="submit"
                  disabled={isLoading}
                  style={{
                    position: "relative",
                    width: "150px",
                    height: "50px",

                  }}
                >
                  {isLoading ? (
                    <Spinner size="sm" animation="border" />
                  ) : (
                    "Se connecter"
                  )}
                </Button>
              </Form>
              <p className="link_connexion_register d-flex justify-content-center mt-2">
                N'avez-vous pas de compte!{" "}
                <span style={{ fontWeight: "bold", color: "blue" }}>
                  <Link to="/register">
                    {" "}
                    Inscrivez-vous!!
                  </Link>
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

export default Login;

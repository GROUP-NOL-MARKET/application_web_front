import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faFacebook,
  faInstagram,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import "../../Styles/Login.css";
import connexion_img from "../assets/Images/connexion_img.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState("");

  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhoset:8000/auth/${provider}/redirect`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);

    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(email)) {
      newErrors.email = "Email invalide";
    } else if (!email.trim()) {
      newErrors.email = "Veuillez remplir ce champ";
    } else {
      delete newErrors.setEmail;
    }

    if (!passwordRegex.test(password)) {
      newErrors.password = "Mot de passe incorrect";
    } else if (!password) {
      newErrors.password = "Veuillez entrer votre mot de passe";
    } else {
      delete newErrors.setPassword;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      const endpoint = "/login"
      const userInput = [
        email,
        password,
      ]
      const response = await axios.post(endpoint, userInput);
      if(response){
        
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="connexion_form">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="formulaire_connexion m-5 p-2">
              <div className="en-tête d-flex flex-column align-items-center">
                <h1 className="Title_register" style={{ color: "#FA7F1B" }}>
                  <span style={{ color: "#0066BD" }}>CONN</span>EXION
                </h1>
                <h6 className="Subtitle_register m-2">
                  Bienvenu sur la page de connexion de Nol Market.
                  Connectez-vous pour accéder à toutes les fonctionnalités
                </h6>
              </div>
              <form
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
                    isInvalid={errors?.email?true:false}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors?.email && errors.email}
                  </FormControl.Feedback>
                </FormGroup>
                <FormGroup className="m-2">
                  <FormLabel className="label_register">Mot de passe</FormLabel>
                  <FormControl
                    className="input_register"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    isInvalid={errors?.password?true:false}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors?.password && errors.password}
                  </FormControl.Feedback>
                </FormGroup>
                <Button className="button_login w-100 mt-3 mb-3" type="submit" disabled={loading}>
                  Se connecter
                </Button>
              </form>
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
          <div className="col-md-6 position-relative d-flex d-none d-md-block">
            <div className="d-flex align-items-center">
              <img
                src={connexion_img}
                alt="connexion_img"
                className="connexion_img"
              />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

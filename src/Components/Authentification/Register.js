import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Register.css";
import { Form, FormGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Animation from "../animation/anime.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "./api";
import {
  faFacebook,
  faGoogle,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import img_entreprise from "../assets/Images/Logo_entreprise-removebg-preview.png";

const Register = () => {
  const [isLoading,setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost:8000/auth/${provider}/redirect`;
  };


  const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
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

    if (!EmailRegex.test(email)) {
      newErrors.email = "L'email est invalide";
    } else if (!email.trim()) {
      newErrors.email = "Veuillez remplir ce champ";
    } else {
    }

    // if (!NameRegex.test(lastName)) {
    //   newErrors.lastName = "Le nom de famille est invalide";
    // } else if (!lastName.trim()) {
    //   newErrors.lastName = "Veuillez remplir ce champ";
    // } else {
    //   delete newErrors.setLastName;
    // }

    // if (!NameRegex.test(firstName)) {
    //   newErrors.firstName = "Le prénom est invalide";
    // } else if (!firstName.trim()) {
    //   newErrors.firstName = "Veuillez remplir ce champ";
    // } else {
    //   delete newErrors.setFirstName;
    // }

    // if (!PhoneRegex.test(phone)) {
    //   newErrors.phone = "Le numéro de téléphone est invalide";
    // } else if (!phone.trim()) {
    //   newErrors.phone = "Veuillez remplir ce champ";
    // } else {
    //   delete newErrors.setPhone;
    // }

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
        email: email,
        password: password,
        password_confirmation: confirm_password,
        // firstName: firstName,
        // lastName: lastName,
        // phone: phone,
      };
      const res = await API.post("/register", userInput);
      setSuccess(res.data.message);
      toast.success(res.data.message);
      navigate("/application_web_front/login");
      localStorage.setItem("token", res.data.token); // Sauvegarde le token
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data); // récupère les erreurs Laravel
      } else {
        setSuccess("Erreur serveur");
      }
    } finally {
      setLoading(false);
    }

    // try {
    //   setLoading(true);
    //   const endPoint = "http://localhost:8000/api/register";
    //   const userInput = {
    //     email: email,
    //     password: password,
    //     password_confirmation: confirm_password,
    //     // firstName: firstName,
    //     // lastName: lastName,
    //     // phone: phone,
    //   };
    //   const response = await axios.post(endPoint, userInput, {
    //     headers: { "Content-Type": "application/json" },
    //     withCredentials: true,
    //   });
    //   if (response.status === 200 || response.status === 201) {
    //     let msg = response.data.data.message;
    //     toast.success(msg);
    //     navigate("application_web_front/login");
    //   }
    // } catch (error) {
    //   const payload = error.response?.data;
    //   const errors = payload?.errors ?? payload;
    //   console.log("Erreurs validation:", errors);
    // } finally {
    //   setLoading(false);
    // }
  };
  return (
    <div className="register_page">
      <div className="container-fluid mt-4">
        <div className="col-md-6 col-sm-10 offset-sm-1 offset-md-3 mt-5 mb-5 d-flex align-items-center justify-content-center">
          <div className="formulaire">
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
                {/* Les champs des noms et prénoms pour les petits écrans */}

                {/* <FormGroup className="m-2 d-md-none">
                  <Form.Label className="label_register ">Nom</Form.Label>
                  <Form.Control
                    className="input_register text-uppercase"
                    value={lastName}
                    placeholder="group"
                    onChange={(e) => setLastName(e.target.value)}
                    isInvalid={errors?.lastName ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.lastName && errors.lastName}
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="m-2 d-md-none">
                  <Form.Label className="label_register">Prénom</Form.Label>
                  <Form.Control
                    className="input_register text-capitalize"
                    placeholder="Entrez votre prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    isInvalid={errors?.firstName ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.firstName && errors.firstName}
                  </Form.Control.Feedback>
                </FormGroup> */}

                {/* Le nom et le prénom: leur champ pour les grands écrans */}

                {/* <div className="d-none d-md-block">
                  <div className="row">
                    <FormGroup
                      className="mt-1 col-md-5"
                      style={{ marginLeft: "2%" }}
                    >
                      <Form.Label className="label_register ">Nom</Form.Label>
                      <Form.Control
                        className="input_register text-uppercase"
                        value={lastName}
                        placeholder="group"
                        onChange={(e) => setLastName(e.target.value)}
                        isInvalid={errors?.lastName ? true : false}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.lastName && errors.lastName}
                      </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup
                      className="mt-1 col-md-6"
                      style={{ marginLeft: "4%" }}
                    >
                      <Form.Label className="label_register">Prénom</Form.Label>
                      <Form.Control
                        className="input_register text-capitalize"
                        placeholder="Entrez votre prénom"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        isInvalid={errors?.firstName ? true : false}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.firstName && errors.firstName}
                      </Form.Control.Feedback>
                    </FormGroup>
                  </div>
                </div> */}

                {/* Le reste des champs du formulaire  */}

                {/* <FormGroup className="m-2">
                  <Form.Label className="label_register">
                    Numéro de téléphone
                  </Form.Label>
                  <Form.Control
                    className="input_register"
                    placeholder="XX XX XX XX XX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    isInvalid={errors?.phone ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.phone && errors.phone}
                  </Form.Control.Feedback>
                </FormGroup> */}
                <FormGroup className="m-2">
                  <Form.Label className="label_register">Email</Form.Label>
                  <Form.Control
                    type="email"
                    className="input_register"
                    placeholder="moi@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={errors?.email ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.email && errors.email}
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="m-2">
                  <Form.Label className="label_register">
                    Mot de passe
                  </Form.Label>
                  <Form.Control
                    type="password"
                    className="input_register"
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={errors?.password ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.password && errors.password}
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="m-2">
                  <Form.Label className="label_register">
                    Confirmer le mot de passe
                  </Form.Label>
                  <Form.Control
                    type="password"
                    className="input_register"
                    value={confirm_password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    isInvalid={errors?.confirm_password ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.confirm_password && errors.confirm_password}
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup>
                  <div className="agree container">
                    <span style={{ hyphens: "auto" }}>
                      <input
                        className={`m-1 cursor-pointer ${errors?.isChecked ? "is-invalid" : ""}`}
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
                    <Lottie
                      animationData={Animation}
                      loop={true}
                      style={{ width: 40, height: 40, margin: "auto" }}
                    />
                  ) : (
                    "S'inscrire"
                  )}
                </Button>
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  pauseOnHover
                  draggable
                  theme="colored"
                />
              </form>
              <p className="link_connexion_register d-flex justify-content-center mt-2">
                Avez-vous déjà un compte ?{" "}
                <span style={{ fontWeight: "bold", color: "blue" }}>
                  <Link to="/application_web_front/login">
                    Connectez-vous!!
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

export default Register;

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Form, FormGroup, FormControl, FormLabel, Button, Spinner } from "react-bootstrap";
import API from "./Authentification/api";
import { toast } from "react-toastify";

const Contact = () => {

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);




  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {};

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nom.trim()) {
      newErrors.nom = "Ce champ est requis";
    } else if (!nameRegex.test(nom)) {
      newErrors.nom = "Entrez un nom valide";
    }

    if (!email.trim()) {
      newErrors.email = "Ce champ est requis";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Entrez un mail valide";
    }

    if (!message.trim()) {
      newErrors.message = "Ce champ est requis";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      const response = await API.post("/contact", {
        nom,
        email,
        message,
      });

      if (response.status === 201) {
        toast.success("Message envoyé avec succès !");
        setNom("");
        setEmail("");
        setMessage("");
        setErrors({});
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error("Une erreur est survenue lors de l’envoi du message.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="Contact" style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-7 col-12 mt-5 mb-5">
            <div className="row ">
              <div className="col-6">
                <FontAwesomeIcon icon={faLocationDot} size="3x" style={{ color: "#0066BD" }} className="m-2" />
                <p className="text" style={{ fontSize: "medium" }}>
                  Rue 2356, Cotonou Fidjrossè (Houenoussou), 9938+G4 Cotonou
                </p>
              </div>
              <div className="col-6">
                <FontAwesomeIcon icon={faPhone} size="3x" className="m-2" style={{ color: "#0066BD" }} />
                <p className="text mb-0" style={{ fontSize: "medium" }}>+229 01 65 00 28 00</p>
                <p className="text mt-0" style={{ fontSize: "medium" }}>+229 01 65 00 29 29</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <FontAwesomeIcon icon={faEnvelope} size="3x" className="m-2" style={{ color: "#0066BD" }} />
                <p className="text" style={{ fontSize: "medium" }}>groupnolmarket@gmail.com</p>
              </div>
              <div className="col-6">
                <FontAwesomeIcon icon={faFacebook} size="3x" className="m-2" style={{ color: "#0066BD" }} />
                <p className="text" style={{ fontSize: "medium", hyphens:"auto" }}>https://www.facebook.com/nolmarket</p>
              </div>
            </div>

            <div style={{ width: "100%", height: "400px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3102579121696!2d2.3653620999999996!3d6.353867000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023576c6ad8d417%3A0x73409770c025122f!2sSUPERMARCH%C3%89%20NOL%20MARKET!5e0!3m2!1sfr!2sbj!4v1755608586499!5m2!1sfr!2sbj"
                width="100%"
                height="100%"
                style={{ border: "0" }}
                allowFullScreen=""
                title="carte google map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="col-md-5 col-12 mt-5 mb-5">
            <h2 className="text-uppercase title m-2" style={{ fontSize: "28px", color: "#FA7F1B" }}>Envoyez nous un message</h2>
            <p className="text m-2" style={{ fontSize: "large" }}>
              Avez vous des suggestions ou quelques difficultés que nous
              pouvions résoudre, envoyez nous un message
            </p>
            <Form method="post" onSubmit={handleSubmit} className="formulaire_suggestion">
              <FormGroup className="m-2">
                <FormLabel className="label_register">Nom</FormLabel>
                <FormControl type="name" className="input_register" onChange={(e) => setNom(e.target.value)}
                  isInvalid={errors?.nom ? true : false} />
                <FormControl.Feedback type="invalid">
                  {errors?.nom && errors.nom}
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup className="m-2">
                <FormLabel className="label_register">Email</FormLabel>
                <FormControl
                  type="email"
                  placeholder="moi@gmail.com"
                  className="input_register"
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={errors?.email ? true : false}
                />
                <FormControl.Feedback type="invalid">
                  {errors?.email && errors.email}
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup className="m-2">
                <FormLabel className="label_register">Message</FormLabel>
                <FormControl as={"textarea"} rows={5} onChange={(e) => setMessage(e.target.value)}
                  isInvalid={errors?.message ? true : false} />
                <FormControl.Feedback type="invalid">
                  {errors?.message && errors.message}
                </FormControl.Feedback>
              </FormGroup>
              <Button className="text-white m-2 p- w-100 rounded-5" type="submit" style={{ background: "#0066BD" }}>
                {loading ? <Spinner animation="border" size="sm" /> : "Envoyer"}
              </Button>
            </Form>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Contact;

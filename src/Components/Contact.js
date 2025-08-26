import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Form, FormGroup, FormControl, FormLabel, Button } from "react-bootstrap";

const Contact = () => {
  return (
    <div className="Contact" style={{backgroundColor: "#F2F2F2"}}>
      <div className="container">
        <div className="row">
          <div className="col-md-7 mt-5 mb-5">
            <div className="row ">
              <div className="col-md-6">
                <FontAwesomeIcon icon={faLocationDot} size="3x" style={{color:"#0066BD"}} className="m-2"/>
                <p className="text" style={{fontSize:"large"}}>
                  Rue 2356, Cotonou Fidjrossè (Houenoussou), 9938+G4 Cotonou
                </p>
              </div>
              <div className="col-md-6">
                <FontAwesomeIcon icon={faPhone} size="3x"  className="m-2" style={{color:"#0066BD"}}/>
                  <p className="text mb-0" style={{fontSize:"large"}}>+229 01 65 00 28 00</p>
                  <p className="text mt-0" style={{fontSize:"large"}}>+229 01 65 00 29 29</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <FontAwesomeIcon icon={faEnvelope} size="3x" className="m-2" style={{color:"#0066BD"}}/>
                <p className="text" style={{fontSize:"large"}}>groupnol@gmail.com</p>
              </div>
              <div className="col-md-6">
                <FontAwesomeIcon icon={faFacebook} size="3x" className="m-2" style={{color:"#0066BD"}}/>
                <p className="text" style={{fontSize:"large"}}>https://www.facebook.com/nolmarket</p>
              </div>
            </div>

            <div style={{ width: "100%", height: "400px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3102579121696!2d2.3653620999999996!3d6.353867000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023576c6ad8d417%3A0x73409770c025122f!2sSUPERMARCH%C3%89%20NOL%20MARKET!5e0!3m2!1sfr!2sbj!4v1755608586499!5m2!1sfr!2sbj"
                width="100%"
                height="100%"
                style={{ border: "0" }}
                allowfullscreen=""
                title="carte google map"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="col-md-5 mt-5 mb-5">
            <h2 className="text-uppercase title m-2" style={{fontSize:"28px",color:"#FA7F1B"}}>Envoyez nous un message</h2>
            <p className="text m-2" style={{fontSize:"large"}}>
              Avez vous des suggestions ou quelques difficultés que nous
              pouvions résoudre, envoyez nous un message
            </p>
            <Form method="post" className="formulaire_suggestion">
              <FormGroup className="m-2">
                <FormLabel className="label_register">Nom</FormLabel>
                <FormControl type="name" className="input_register" />
              </FormGroup>
              <FormGroup className="m-2">
                <FormLabel className="label_register">Email</FormLabel>
                <FormControl
                  type="email"
                  placeholder="moi@gmail.com"
                  className="input_register"
                />
              </FormGroup>
              <FormGroup className="m-2">
                <FormLabel className="label_register">Message</FormLabel>
                <FormControl as={"textarea"} rows={5} />
              </FormGroup>
              <Button className="text-white m-2 p-2" style={{background: "#0066BD", borderRadius:"10px"}}>
                Envoyer
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

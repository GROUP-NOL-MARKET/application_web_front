import React, { useState } from "react";
import { Form, Button, FormControl, FormGroup, FormLabel, InputGroup, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import img_entreprise from "../assets/Images/Logo_entreprise-removebg-preview.webp";
import "../../Styles/AdminDashbord/Connexion.css";
import API from "../Authentification/apiAdmin";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        //  e.preventDefault() EN PREMIER — bloque le rechargement de page
        e.preventDefault();
        setLoading(true);

        try {
            const response = await API.post("/admin/login", {
                email,
                password,
            });

            const token = response.data.token;

            if (!token) {
                toast.error("Token non reçu du serveur");
                return;
            }

            // Sauvegarde le token
            localStorage.setItem("adminToken", token);

            // Vérifie que c'est bien sauvegardé
            console.log("Token sauvegardé :", localStorage.getItem("adminToken"));

            window.location.href = "/admin/dashboard";

        } catch (err) {
            console.error("Erreur login admin :", err.response?.data || err.message);
            toast.error("Email ou mot de passe invalide");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="connexion2">
            <div className="auth-wrapper">
                <div className="border border-1 bg-white shadow-sm form-box p-5 rounded-3">
                    <div className="en-tête d-flex flex-column align-items-center">
                        <img
                            src={img_entreprise}
                            alt="Entreprise Logo"
                            style={{ height: "60px" }}
                        />
                        <h1 className="Title_register" style={{ color: "#FA7F1B" }}>
                            <span style={{ color: "#0066BD" }}>CONNEXION </span>ADMIN
                        </h1>
                    </div>

                    {/* onSubmit sur le Form, plus de method="post" */}
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <FormLabel className="label_register">Email</FormLabel>
                            <FormControl
                                className="input_register"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FormGroup>

                        <FormGroup className="mt-3">
                            <FormLabel className="label_register">Mot de passe</FormLabel>
                            <InputGroup>
                                <FormControl
                                    className="input_register"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Button
                                    variant="outline-secondary"
                                    type="button" //  type="button" pour ne pas soumettre le form
                                    onClick={togglePasswordVisibility}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </Button>
                            </InputGroup>
                        </FormGroup>

                        {/*  type="submit" — déclenche onSubmit du Form */}
                        <Button
                            type="submit"
                            className="mt-4 w-100 rounded-5"
                            disabled={loading}
                        >
                            {loading
                                ? <Spinner animation="border" size="sm" />
                                : <span className="petit_titre fw-bold">Se connecter</span>
                            }
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
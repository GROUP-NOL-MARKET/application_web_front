import React, { useState } from "react";
import axios from "axios";
import { Form, Button, FormControl, FormGroup, FormLabel, InputGroup, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import img_entreprise from "../assets/Images/Logo_entreprise-removebg-preview.webp";
import "../../Styles/AdminDashbord/Connexion.css"

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/admin/login", {
                email,
                password,
            });

            localStorage.setItem("adminToken", response.data.token);
            window.location.href = "/admin/dashboard"; // Redirige vers le dashboard
        } catch (err) {
            setError(err);
            console.log(error);
            toast.error("Email ou mot de passe invalide");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="connexion2">
            <div className="auth-wrapper">
                <div className=" border border-1 bg-white shadow-sm form-box p-4 rounded-3">
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
                    <Form method="post">
                        <FormGroup>
                            <FormLabel className="label_register">
                                Email
                            </FormLabel>
                            <FormControl
                                className="input_register"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="mt-3">
                            <FormLabel className="label_register">
                                Mot de passe
                            </FormLabel>
                            <InputGroup>
                                <FormControl
                                    className="input_register"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                    />
                                </Button>
                            </InputGroup>
                        </FormGroup>
                        <Button onClick={handleSubmit} className="mt-4 w-100 rounded-5">{loading ? (<Spinner />) : (<span className="petit_titre fw-bold">Se connecter</span>)}</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;

import React, { useState, useEffect } from "react";
import "../../Styles/UserDashboard/Gestion.css";
import { Button, Form, FormGroup, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const InfosProfil = ({ closePopUp1 }) => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        secondName: "",
        email: "",
        dateNaissance: "",
        genre: "",
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(false);

    // --- REGEX VALIDATION ---
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // --- FETCH USER DATA ---
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    window.location.href = "/login";
                    return;
                }

                const response = await axios.get("http://127.0.0.1:8000/api/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = response.data?.user || response.data; // compatibilité
                setForm({
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    secondName: data.secondName || "",
                    email: data.email || "",
                    dateNaissance: data.dateNaissance || "",
                    genre: data.genre || "",
                });
            } catch (error) {
                console.error("Erreur lors du chargement du profil:", error);

                // Token expiré
                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    toast.warning("Votre session a expiré, veuillez vous reconnecter.");
                    window.location.href = "/login";
                }
            }
        };
        fetchUser();
    }, []);

    // --- HANDLE CHANGES ---
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    // --- VALIDATION FRONTEND ---
    const validate = () => {
        const newErrors = {};

        if (!form.firstName.trim()) newErrors.firstName = "Le prénom est obligatoire.";
        else if (!nameRegex.test(form.firstName))
            newErrors.firstName = "Le prénom ne doit contenir que des lettres valides.";

        if (!form.lastName.trim()) newErrors.lastName = "Le nom est obligatoire.";
        else if (!nameRegex.test(form.lastName))
            newErrors.lastName = "Le nom ne doit contenir que des lettres valides.";

        if (form.secondName && !nameRegex.test(form.secondName))
            newErrors.secondName = "Le deuxième prénom ne doit contenir que des lettres valides.";

        if (!form.email.trim()) newErrors.email = "L'adresse email est obligatoire.";
        else if (!emailRegex.test(form.email.trim()))
            newErrors.email = "L'adresse email est invalide.";

        if (!form.dateNaissance) newErrors.dateNaissance = "La date de naissance est obligatoire.";

        if (!form.genre) newErrors.genre = "Veuillez sélectionner un genre.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // --- SUBMIT FORM ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Session expirée. Veuillez vous reconnecter.");
                window.location.href = "/login";
                return;
            }

            const response = await axios.put(
                "http://127.0.0.1:8000/api/user/update",
                form,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success(response.data.message || "Profil mis à jour avec succès !");
            closePopUp1();
        } catch (error) {
            console.error("Erreur :", error);
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else if (error.response?.status === 401) {
                localStorage.removeItem("token");
                toast.warning("Votre session a expiré, veuillez vous reconnecter.");
                window.location.href = "/login";
            } else {
                toast.error("Une erreur est survenue. Veuillez réessayer.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="popup-overlay inset-0">
            <div className="popup rounded-3 p-3 shadow-sm">
                <button onClick={closePopUp1} className="bouton-close text-xxl" style={{ color: "red" }}>
                    ✕
                </button>

                <Form onSubmit={handleSubmit} method="post">
                    {/* --- Nom --- */}
                    <FormGroup className="m-2">
                        <Form.Label className="label_register">Nom</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            className="input_register"
                            isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                    </FormGroup>

                    {/* --- Prénom --- */}
                    <FormGroup className="m-2">
                        <Form.Label className="label_register">Prénom</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            className="input_register"
                            isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                    </FormGroup>

                    {/* Deuxième prénom */}
                    <FormGroup className="m-2">
                        <Form.Label className="label_register">Deuxième prénom</Form.Label>
                        <Form.Control
                            type="text"
                            name="secondName"
                            value={form.secondName}
                            onChange={handleChange}
                            className="input_register"
                            isInvalid={!!errors.secondName}
                        />
                        <Form.Control.Feedback type="invalid">{errors.secondName}</Form.Control.Feedback>
                    </FormGroup>

                    {/* --- Email --- */}
                    <FormGroup className="m-2">
                        <Form.Label className="label_register">Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="input_register"
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </FormGroup>

                    {/* --- Genre --- */}
                    <FormGroup className="m-2">
                        <Form.Label className="label_register">Genre</Form.Label>
                        <Form.Select
                            name="genre"
                            value={form.genre}
                            onChange={handleChange}
                            className="input_register"
                            isInvalid={!!errors.genre}
                        >
                            <option value="">-- Sélectionner --</option>
                            <option value="Masculin">Masculin</option>
                            <option value="Féminin">Féminin</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.genre}</Form.Control.Feedback>
                    </FormGroup>

                    {/* --- Date de naissance --- */}
                    <FormGroup className="m-2">
                        <Form.Label className="label_register">Date de naissance</Form.Label>
                        <Form.Control
                            type="date"
                            name="dateNaissance"
                            value={form.dateNaissance}
                            onChange={handleChange}
                            className="input_register"
                            isInvalid={!!errors.dateNaissance}
                        />
                        <Form.Control.Feedback type="invalid">{errors.dateNaissance}</Form.Control.Feedback>
                    </FormGroup>

                    <Button type="submit" disabled={isLoading} className="w-100 rounded-5 mt-2">
                        {isLoading ? <Spinner size='sm' animation="border" /> : "Modifier le profil"}
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default InfosProfil;

import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../../Styles/UserDashboard/Gestion.css";
import { Button, FormControl, Spinner } from "react-bootstrap";
import API from '../Authentification/api';

const ModifierPassword = ({ closePopUp3, length = 4 }) => {
    const inputsRef = useRef([]);
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isRequestDisabled, setIsRequestDisabled] = useState(false);

    // Compte à rebours
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        } else {
            setIsRequestDisabled(false);
        }
        return () => clearInterval(interval);
    }, [timer]);

    // Récupération email de l’utilisateur connecté
    const fetchUserProfile = async () => {
        const token = localStorage.getItem("token");
        if (!token) return (window.location.href = "/login");
        try {
            const response = await API.get("/user", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserEmail(response.data.email);
        } catch (error) {
            console.error("Erreur profil:", error);
        }
    };
    useEffect(() => { fetchUserProfile(); }, []);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (!/^[0-9]$/.test(value) && value !== "") return;
        if (value && index < length - 1) inputsRef.current[index + 1].focus();
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0)
            inputsRef.current[index - 1].focus();
        if (e.key === "ArrowLeft" && index > 0)
            inputsRef.current[index - 1].focus();
        if (e.key === "ArrowRight" && index < length - 1)
            inputsRef.current[index + 1].focus();
    };

    const getOtpCode = () => inputsRef.current.map(input => input.value).join('');

    const verifyOtp = async () => {

        const otpCode = getOtpCode();
        if (otpCode.length !== length) {
            toast.error("Veuillez remplir tous les champs du code.");
            return;
        }
        setLoading(true);

        try {
            const res = await API.post("/user/verify-otp", {
                email: userEmail,
                otp: otpCode,
            });

            toast.success(res.data.message);
            closePopUp3();
            // Stocker le code OTP validé temporairement
            localStorage.setItem("reset_otp", res.data.reset_token);
            navigate("/reset-password");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Code OTP invalide !");
        } finally {
            setLoading(false);
        }
    };

    const sendNewOtp = async () => {
        try {
            await API.post("/user/request-otp", { email: userEmail });
            toast.success("Nouveau code OTP envoyé !");
            inputsRef.current.forEach(input => (input.value = ""));
            inputsRef.current[0].focus();
        } catch (error) {
            toast.error("Impossible d'envoyer le code OTP.");
        }
    };

    const handleRequestNewOtp = async () => {
        setIsRequestDisabled(true);
        setTimer(60); // 1 minute
        await sendNewOtp();
    };

    return (
        <div className='popup-overlay'>
            <div className="popup rounded-3 shadow-sm p-3">
                <button onClick={closePopUp3} className="bouton-close" style={{ color: "red" }}>✕</button>
                <h3 className="text-center taux_moyen">Code de sécurité</h3>
                <p className="text-center texte_brut">
                    Entrez le code de sécurité envoyé à votre email
                </p>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                    <div className="row justify-content-center">
                        {Array.from({ length }).map((_, i) => (
                            <div className="col-lg-2 col me-1" key={i}>
                                <FormControl
                                    type="text"
                                    maxLength={1}
                                    className="text-center fs-3"
                                    style={{ height: "60px" }}
                                    ref={(el) => (inputsRef.current[i] = el)}
                                    onChange={(e) => handleChange(e, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                />
                            </div>
                        ))}
                    </div>
                    <Button type='submit' className='w-100 rounded-5 mt-3' onClick={verifyOtp}>
                        {loading ? <Spinner size="sm" animation='border' /> : "Réinitialiser le mot de passe"}
                    </Button>
                    <Button
                        className="border-0 bg-white petit_titre mt-2 text-primary"
                        disabled={isRequestDisabled}
                        onClick={handleRequestNewOtp}
                    >
                        {isRequestDisabled ? `Attendez ${timer}s` : "Demandez un nouveau code"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ModifierPassword;

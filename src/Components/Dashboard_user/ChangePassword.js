import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../Authentification/api'
import { Button, Form, FormControl, FormGroup, FormLabel, Spinner } from 'react-bootstrap'
import "../../Styles/ChangePassword.css"
import entreprise from "../assets/Images/Logo_entreprise-removebg-preview.webp"
import { toast } from 'react-toastify'

const ChangePassword = () => {

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const fetchUserProfile = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        }
        try {
            const response = await API.get(
                "/user",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPassword(response.data.password);
            setEmail(response.data.email);
        } catch (error) {
            console.error("Erreur lors de la récupération du profil:", error);
            // Gérer la déconnexion si le token est invalide
        } finally {
            setLoading(false);
        }
    };

    // Appelez la fonction au montage du composant
    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const newErrors = {};

        const PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

        if (oldPassword !== password) {
            newErrors.oldPassword = "Mot de passe incorrect"
        }

        if (newPassword !== confirmPassword) {
            newErrors.newPassword = "Les mots de passe ne correspondent pas"
        } else if (!confirmPassword) {
            newErrors.confirmPassword = "Vous devez confirmez le mot de passe";
        } else {
            delete newErrors.confirmPassword;
        }

        if (!newPassword) {
            newErrors.newPassword = "Veuillez entrez votre ancien mot de passe";
        } else if (!PasswordRegex.test(newPassword)) {
            newErrors.newPassword = "Votre mot de passe doit contenir au moins 8 caractères, une lettre,  un chiffre et un caractre spécial"
        } else {
            delete newErrors.newPassword;
        }

        if (!oldPassword) {
            newErrors.oldPassword = "Veuillez entrez votre ancien mot de passe";
        } else if (!PasswordRegex.test(oldPassword)) {
            newErrors.oldPassword = "Votre mot de passe doit contenir au moins 8 caractères, une lettre,  un chiffre et un caractre spécial"
        } else {
            delete newErrors.oldPassword;
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setLoading(false);
            return;
        }
        try {
            const otp = localStorage.getItem("reset_otp"); // récupère le code validé

            const userInput = {
                email: email,
                reset_token: otp,
                password: newPassword,
                password_confirmation: confirmPassword,
            };

            const res = await API.post("/user/reset-password", userInput);
            setSuccess(res.data.message);
            toast.success("Changement du mot de passe réussi");
            localStorage.removeItem("reset_otp");
            navigate("/user");
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data); // récupère les erreurs Laravel
            } else {
                setSuccess("Erreur serveur");
            }
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="changePassword">
            <div className='container-fluid' style={{ marginTop: "100px" }}>
                <div className="offset-3 col-6 d-flex flex-column rounded-3  border border-1 bg-white shadow-sm p-3">
                    <div className=" d-flex flex-column align-items-center justify-content-center">
                        <img src={entreprise} alt="" style={{ width: "150px" }} />
                    </div>
                    <h2 className="text-uppercase name_entreprise_dashboard mt-3"><span style={{ color: "#0066BD" }}>Changement du</span> <span style={{ color: "#fa7f1b" }}>mot de passe</span></h2>
                    <Form method="post">
                        <FormGroup>
                            <FormLabel className='label_register' >Mot de passe actuel</FormLabel>
                            <FormControl className='input_register' type='password' name='oldPassword' onChange={(e) => setOldPassword(e.target.value)} isInvalid={errors?.oldPassword ? true : false} />
                            <FormControl.Feedback type='invalid'>
                                {errors?.oldPassword && errors.oldPassword}
                            </FormControl.Feedback>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel className='label_register'>Nouveau mot de passe</FormLabel>
                            <FormControl className='input_register' type='password' name='newPassword' onChange={(e) => setNewPassword(e.target.value)} isInvalid={errors?.newPassword ? true : false} />
                            <FormControl.Feedback type='invalid'>
                                {errors?.newPassword && errors.newPassword}
                            </FormControl.Feedback>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel className='label_register'>Confirmez le nouveau mot de passe</FormLabel>
                            <FormControl className='input_register' type='password' name='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)} isInvalid={errors?.confirmPassword ? true : false} />
                            <FormControl.Feedback type="invalid">
                                {errors?.confirmPassword && errors.confirmPassword}
                            </FormControl.Feedback>
                        </FormGroup>
                        <Button className="rounded-5 w-100 mt-3" onClick={handleSubmit}>{loading ? (<Spinner size="sm" animation='border' />) : ("Valider")}  </Button>
                    </Form>

                </div>

            </div>
        </div>
    )
}

export default ChangePassword
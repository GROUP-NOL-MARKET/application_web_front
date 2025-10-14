import React, { useState } from 'react'
import "../../Styles/UserDashboard/Gestion.css"
import { Button, Form, FormControl, FormGroup, FormLabel, Spinner, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import API from '../Authentification/api';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Suppression = ({ closePopUp4 }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleDelete = async (e) => {
        e.preventDefault(true)
        setLoading(true)

        const newErrors = {};

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

        if (!password) {
            newErrors.password = "Vous devez entrer votre mot de passe";
        } else if (!passwordRegex.test(password)) {
            newErrors.password = "Le mot de passe n'est pas correct";
        } else {
            delete newErrors.password;
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            await API.post("/user/delete", { password: password });
            localStorage.removeItem("token");
            toast.success("Compte supprimé");
            navigate("/login");
        } catch (err) {
            if (err.response.status === 422) {
                toast.error(err.response.data.message);
            } else {
                console.error("Erreur logout", err.response?.data);
                toast.error("Erreur lors de la suppression");
            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="popup-overlay">
                <div className='popup shadow-sm rounded-3 p-3'>
                    <button
                        onClick={closePopUp4}
                        className="bouton-close text-xxl" style={{ color: "red" }}
                    >
                        ✕
                    </button>
                    <div>
                        <h3 className="taux_moyen">Suppression du compte</h3>
                        <Form mehod="post">
                            <FormGroup>
                                <div className="agree container">
                                    <FormLabel className="label_register">Mot de passe</FormLabel>
                                    <InputGroup>
                                        <FormControl type={showPassword ? "text" : "password"} className='input_register' name="password" onChange={(e) => setPassword(e.target.value)} isInvalid={errors?.password ? true : false} />
                                        <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                                            <FontAwesomeIcon
                                                icon={showPassword ? faEyeSlash : faEye}
                                            />
                                        </Button>
                                    </InputGroup>
                                    <FormControl.Feedback type="invalid">
                                        {errors?.password && errors.passord}
                                    </FormControl.Feedback>
                                    <span style={{ hyphens: "auto" }}>
                                        <input
                                            className={`m-1 cursor-pointer ${errors?.isChecked ? "is-invalid" : ""}`}
                                            type="checkbox"
                                            checked={isChecked} // State variable to control checked status
                                            onChange={(e) => setIsChecked(e.target.checked)}
                                        />
                                        Êtes-vous réellement sûr de vouloir supprimer votre compte ?
                                        {errors?.isChecked && (
                                            <div className="invalid-feedback">
                                                {errors.isChecked}
                                            </div>
                                        )}
                                    </span>
                                </div>
                            </FormGroup>
                            <div className='container-fluid'>
                                <div className="row mt-3">
                                    <Button className='offset-5 rounded-5 col-3 me-2' onClick={closePopUp4}>
                                        <span className="petit_titre">Annuler</span>
                                    </Button>
                                    <Button className="col-3 rounded-5 logout" type='submit' disabled={!isChecked} onClick={handleDelete}>
                                        {
                                            loading ? (<Spinner size="sm" animation='border' />) : (<span className="petit_titre">Supprimer</span>)
                                        }
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Suppression
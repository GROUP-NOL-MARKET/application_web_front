import { useState } from 'react'
import { Form, FormGroup, FormLabel, FormControl, Button, Spinner } from "react-bootstrap";
import API from "../Authentification/api"
import { toast } from "react-toastify";

const Rating = ({ closePopUp, commande }) => {
    const [loading, setLoading] = useState(false);
    const [notation, setNotation] = useState(null);
    const [appreciation, setAppreciation] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        const newErrors = {};

        // const appreciationRegex = `^.{5,}$`;
        if (!appreciation.trim()) {
            newErrors.appreciation = "Veuillez remplir ce champ";
            // } else if (!appreciationRegex.test(appreciation)) {
            //     newErrors.appreciation = "Veuillez entrer une appréciation valide";
        } else {
            delete newErrors.setAppreciation;
        }

        if (!notation.trim()) {
            newErrors.notation = "Veuillez remplir ce champ pour soumettre";
        } else {
            delete newErrors.setNotation;
        }


        if (Object.keys(newErrors).length > 0) {
            setLoading(false)
            return
        }

        try {
            const data = {
                notation,
                appreciation,
                order_id: commande,
            };

            const res = await API.post("/reviews", data);

            if (res.status === 200 || res.status === 201) {
                toast.success('Avis enregistré avec succès');
                closePopUp();
            }

        } catch (err) {
            setErrors(err);
            toast.error("Avis non enregistré");

        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="popup-overlay">
            <div className="popup shadow-sm p-3 rounded-3">
                <button
                    onClick={closePopUp}
                    className="bouton-close text-xxl"
                    style={{ color: "red" }}
                >
                    ✕
                </button>
                <Form onSubmit={handleSubmit}>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <h2 className='taux_moyen'>Notation</h2>
                        <p className="texte_brut">Veuillez remplir ce petit formulaire pour donner votre avis par rapport à la commande ou à votre expérience sur le site.</p>
                    </div>

                    <FormGroup className=''>
                        <FormLabel className='label_register' >Notation (De 1 à 5)</FormLabel>
                        <FormControl type='number' min={1}
                            max={5}
                            step={1}
                            maxLength={1} onChange={(e) => setNotation(e.target.value)}
                            isInvalid={errors?.notation ? true : false} />
                        <FormControl.Feedback type='invalid'>
                            {errors?.notation && errors.notation}
                        </FormControl.Feedback>

                    </FormGroup>
                    <FormGroup className=''>
                        <FormLabel className="label_register">Appréciation</FormLabel>
                        <FormControl as={'textarea'} rows={4} onChange={(e) => setAppreciation(e.target.value)}
                            isInvalid={errors?.appreciation ? true : false} />
                        <FormControl.Feedback>
                            {errors?.appreciation && errors.appreciation}
                        </FormControl.Feedback>
                    </FormGroup>
                    <Button type="submit" className="mt-2 w-100 rounded-5">{loading ? <Spinner /> : (" Soumettre")}</Button>
                </Form>

            </div>
        </div>
    )
}

export default Rating
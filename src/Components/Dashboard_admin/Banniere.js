import { useState } from 'react';
import { Form, FormLabel, FormControl, FormGroup, Button, Spinner } from 'react-bootstrap';
import API from '../Authentification/api'; // axios instance

const Banniere = ({ closePopUp }) => {
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);
    const [subTitle, setSubTitle] = useState('');
    const [percent, setPercent] = useState('');
    const [link, setLink] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const newErrors = {};
        const cleanPhone = phone.replace(/\s/g, '');

        if (!cleanPhone.trim()) {
            newErrors.phone = "Entrez un numéro de téléphone.";
        } else if (!/^01\d{8}$/.test(cleanPhone)) {
            newErrors.phone = "Le numéro doit commencer par 01 et contenir 10 chiffres au total.";
        } else {
            const secondPair = parseInt(cleanPhone.substring(2, 4), 10);
            if (secondPair < 50 || secondPair > 100) {
                newErrors.phone = "Les deux chiffres après '01' doivent être compris entre 50 et 100.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        const cleanPhone = phone.replace(/\s/g, '');
        const formData = new FormData();

        for (let i = 0; i < images.length; i++) {
            formData.append('images[]', images[i]);
        }
        if (video) formData.append('video', video);
        formData.append('subTitle', subTitle);
        formData.append('percent', percent);
        formData.append('link', link);
        formData.append('phone', cleanPhone);

        setLoading(true);
        setSuccess(false);

        try {
            const token = localStorage.getItem("adminToken");
            const res = await API.post('/admin/banniere', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 200 || res.status === 201) {
                setSuccess(true);
                setSubTitle('');
                setPercent('');
                setLink('');
                setPhone('');
                setImages([]);
                setVideo(null);
                setTimeout(() => closePopUp(), 1500);
            }
        } catch (err) {
            console.error('Erreur envoi bannière :', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup shadow-sm p-3 rounded-3">
                <button
                    onClick={closePopUp}
                    className="bouton-close text-xxl"
                    style={{ color: 'red' }}
                >
                    ✕
                </button>
                <Form method="post" onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel className="label_register">Images de la publicité</FormLabel>
                        <FormControl
                            name="images"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setImages(e.target.files)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel className="label_register">Vidéo du background</FormLabel>
                        <FormControl
                            name="video"
                            type="file"
                            accept="video/*"
                            onChange={(e) => setVideo(e.target.files[0])}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel className="label_register">Sous-titre</FormLabel>
                        <FormControl
                            value={subTitle}
                            onChange={(e) => setSubTitle(e.target.value)}
                            className="input_register"
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel className="label_register">Pourcentage de réduction</FormLabel>
                        <FormControl
                            type='number'
                            value={percent}
                            onChange={(e) => setPercent(e.target.value)}
                            className="input_register"
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel className="label_register">Lien de redirection</FormLabel>
                        <FormControl
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="input_register"
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel className="label_register">Numéro de téléphone</FormLabel>
                        <FormControl
                            type="text"
                            value={phone}
                            placeholder="01 XX XX XX XX"
                            maxLength={14}
                            isInvalid={!!errors.phone}
                            onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, '');
                                value = value.slice(0, 10);
                                value = value.replace(/(\d{2})(?=\d)/g, '$1 ');
                                setPhone(value);
                                setErrors({});
                            }}
                            className="input_register"
                        />
                        <FormControl.Feedback type="invalid">{errors.phone}</FormControl.Feedback>
                    </FormGroup>

                    {success && (
                        <p className="text-success text-center mt-2">✅ Bannière publiée avec succès</p>
                    )}

                    <Button className="w-100 rounded-5 mt-3" type="submit" disabled={loading}>
                        {loading ? <Spinner animation="border" /> : 'Publier'}
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Banniere;

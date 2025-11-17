import { Form, Button, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { Avatar } from '@mui/material'
import { useState } from 'react'
import API from "../Authentification/api"
import { toast } from 'react-toastify'

const Profile = ({ closePopUp5 }) => {
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setImage(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        if (!image) return alert('Veuillez sélectionner une image')

        const formData = new FormData()
        formData.append('profil', image)

        try {
            const response = await API.post('http://127.0.0.1:8000/api/upload-profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            toast.success('Profil mis à jour avec succès ')
            closePopUp5()
        } catch (error) {
            console.error(error)
            toast.error("Erreur lors du téléversement")
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="popup-overlay">
            <div className="popup rounded-3 p-3">
                <button
                    onClick={closePopUp5}
                    className="bouton-close text-xxl"
                    style={{ color: "red" }}
                >
                    ✕
                </button>

                <Form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center">
                        <div className="d-flex position-relative">
                            <Avatar
                                src={preview || ""}
                                alt="profil"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    border: "2px solid #FA7F1B",
                                }}
                            />
                            <label
                                htmlFor="fileInput"
                                className="d-flex position-absolute bottom-0 end-0 rounded-circle p-2"
                                style={{
                                    backgroundColor: "gray",
                                    border: "1px solid #FA7F1B",
                                    cursor: "pointer",
                                }}
                            >
                                <FontAwesomeIcon icon={faCamera} />
                            </label>
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="rounded-5 w-100 mt-3">
                        <span className="petit_titre">{loading ? (<Spinner />) : ("Soumettre")}</span>
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Profile

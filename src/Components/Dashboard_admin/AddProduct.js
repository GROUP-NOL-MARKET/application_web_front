import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Entete from "./dataset/Entete";
import FooterDashboard from "./dataset/FooterDashboard";
import { ThemeContext } from "./ThemeContext";
import API from "../Authentification/apiAdmin";
import {
    Form,
    FormGroup,
    FormControl,
    FormLabel,
    Button,
    Spinner,
} from "react-bootstrap";

const AddProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    const [productData, setProductData] = useState({
        name: "",
        reference: "",
        price: "",
        quantity: "",
        family: "",
        category: "",
        sous_category: "",
        disponibility: "",
        description: "",
    });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [trashLoading, setTrashLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const token = localStorage.getItem("adminToken");

    // Charger le produit si mode édition
    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            setIsEditing(true);
            setLoading(true);
            try {
                const res = await API.get(
                    `/admin/products/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setProductData(res.data);
            } catch (error) {
                toast.error("Erreur lors du chargement du produit");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e, isDraft = false) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            Object.entries(productData).forEach(([key, value]) => {
                formData.append(key, value);
            });

            if (images.length > 0) {
                for (let i = 0; i < images.length; i++) {
                    formData.append("image", images[i]);
                }
            }

            formData.append("status", isDraft ? "draft" : "published");

            // Si mode édition → on ajoute _method=PUT
            if (isEditing) {
                formData.append("_method", "PUT");
            }

            // URL cible
            const url = isEditing
                ? `/admin/products/${id}`
                : "/admin/products";

            // Envoi unique (POST pour les 2 cas)
            await API.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success(isEditing ? "Produit modifié ✅" : "Produit ajouté 🚀");
            navigate("/admin/productGrid");
        } catch (error) {
            console.error(error);
            if (error.response?.data?.errors) {
                const messages = Object.values(error.response.data.errors)
                    .flat()
                    .join("\n");
                toast.error(messages);
            } else {
                toast.error("Erreur lors de l’enregistrement ❌");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <Entete title={isEditing ? "Modifier un produit" : "Ajouter un produit"} />

            <div
                className="col shadow-sm border border-1 p-3 mt-3"
                style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
            >
                <Form onSubmit={(e) => handleSubmit(e, false)}>
                    <FormGroup className="mb-3">
                        <FormLabel className="label_register">Image du produit</FormLabel>
                        <FormControl
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </FormGroup>

                    {[
                        ["name", "Nom du produit"],
                        ["reference", "Référence"],
                        ["price", "Prix"],
                        ["quantity", "Quantité"],
                        ["family", "Famille"],
                        ["category", "Catégorie"],
                        ["sous_category", "Sous-catégorie"],
                        ["disponibility", "Disponibilité"],
                    ].map(([name, label]) => (
                        <FormGroup key={name} className="mb-3">
                            <FormLabel className="label_register">{label}</FormLabel>
                            <FormControl
                                className="input_register"
                                name={name}
                                value={productData[name] || ""}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    ))}

                    <FormGroup className="mb-3">
                        <FormLabel className="label_register">Description</FormLabel>
                        <FormControl
                            as="textarea"
                            rows={4}
                            name="description"
                            value={productData.description || ""}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <div className="d-flex gap-2">
                        <Button
                            variant="secondary"
                            disabled={loading}

                        >
                            {trashLoading ? <Spinner animation="border" size="sm" /> : "Brouillon"}
                        </Button>
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : "Enregistrer"}
                        </Button>
                    </div>
                </Form>
            </div>

            <FooterDashboard />
        </div>
    );
};

export default AddProduct;

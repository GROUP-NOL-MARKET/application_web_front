import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Entete from "./dataset/Entete";
import FooterDashboard from "./dataset/FooterDashboard";
import { ThemeContext } from "./ThemeContext";
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Spinner,
} from "react-bootstrap";

const AddProduct = () => {
  const { theme } = useContext(ThemeContext);

  const [productData, setProductData] = useState({
    name: "",
    reference: "",
    price: "",
    quantity: "",
    family: "",
    category: "",
    subcategory: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

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
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("Session expirée. Veuillez vous reconnecter !");
        return;
      }

      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      for (let i = 0; i < images.length; i++) {
        formData.append("image", images[i]);
      }
      formData.append("status", isDraft ? "draft" : "published");

      await axios.post("http://localhost:8000/api/admin/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        isDraft
          ? "Produit enregistré comme brouillon ✅"
          : "Produit publié avec succès 🚀"
      );

      // Réinitialiser le formulaire
      setProductData({
        name: "",
        reference: "",
        price: "",
        quantity: "",
        family: "",
        category: "",
        sous_category: " ",
        disponibility: "",
        description: "",
      });
      setImages([]);
    } catch (error) {
      console.error(error.data);
      toast.error("Erreur lors de l’ajout du produit ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <Entete title="Ajouter un produit" />

      <div
        className="col shadow-sm border border-1 p-3 mt-3"
        style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
      >
        <h5 className="fw-bold">Paramètres du produit</h5>
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
          <div className="row">
            <FormGroup className="col-6 mb-2">
              <FormLabel className="label_register">Nom du produit</FormLabel>
              <FormControl
                className="input_register"
                name="name"
                value={productData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup className="col-6 mb-2">
              <FormLabel className="label_register">Disponibilité</FormLabel>
              <FormControl
                className="input_register"
                name="disponibility"
                value={productData.disponibility}
                onChange={handleChange}
              />
            </FormGroup>
          </div>

          <div className="row">
            <FormGroup className="col-6 mb-2">
              <FormLabel className="label_register">Référence</FormLabel>
              <FormControl
                className="input_register"
                name="reference"
                value={productData.reference}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className="col-6 mb-2">
              <FormLabel className="label_register">Prix</FormLabel>
              <FormControl
                className="input_register"
                name="price"
                type="number"
                value={productData.price}
                onChange={handleChange}
              />
            </FormGroup>
          </div>

          <div className="row">
            <FormGroup className="col-6 mb-2">
              <FormLabel className="label_register">Quantité</FormLabel>
              <FormControl
                className="input_register"
                name="quantity"
                type="number"
                value={productData.quantity}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className="col-6 mb-2">
              <FormLabel className="label_register">Famille</FormLabel>
              <FormControl
                className="input_register"
                name="family"
                value={productData.family}
                onChange={handleChange}
              />
            </FormGroup>
          </div>

          <div className="row">
            <FormGroup className="col-6 mb-2">
              <FormLabel className="label_register">Catégorie</FormLabel>
              <FormControl
                className="input_register"
                name="category"
                value={productData.category}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className="col-6 mb-2">
              <FormLabel className="label_register">Sous-catégorie</FormLabel>
              <FormControl
                className="input_register"
                name="sous_category"
                value={productData.sous_category}
                onChange={handleChange}
              />
            </FormGroup>
          </div>

          <FormGroup className="mb-3">
            <FormLabel className="label_register">Description</FormLabel>
            <FormControl
              as="textarea"
              rows={4}
              name="description"
              value={productData.description}
              onChange={handleChange}
            />
          </FormGroup>

          <div className="d-flex gap-2">
            <Button
              variant="secondary"
              className="fw-bold"
              disabled={loading}

            >
              Brouillon
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="fw-bold"
              disabled={loading}
              onClick={(e) => handleSubmit(e, true)}
            >
              {loading ? <Spinner animation="border" size="auto" /> : "Publier"}
            </Button>
          </div>
        </Form>
      </div>

      <FooterDashboard />
    </div>
  );
};

export default AddProduct;

import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import API from "../Authentification/apiAdmin";
import { toast } from "react-toastify";

const ImageCouverture = ({ closePopUp1 }) => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const loadImages = async () => {
    try {
      const res = await API.get("/admin/cover-images");
      setImages(res.data.data || []);
    } catch (err) {
      console.error("Erreur fetch cover images:", err);
      toast.error("Impossible de charger les images");
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.info("Sélectionne une image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);

    setLoading(true);

    try {
      await API.post("/admin/cover-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Image ajoutée");
      setFile(null);
      setDescription("");
      loadImages();

      window.dispatchEvent(new Event("coverImagesUpdated"));
    } catch (err) {
      console.error(err.response?.data);
      toast.error("Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id) => {
    try {
      await API.patch(`/admin/cover-images/${id}/toggle-active`);
      setImages((prev) =>
        prev.map((img) =>
          img.id === id ? { ...img, active: !img.active } : img
        )
      );
      window.dispatchEvent(new Event("coverImagesUpdated"));
    } catch (err) {
      console.error(err.response?.data);
      toast.error("Impossible de changer le statut");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette image ?")) return;
    try {
      await API.delete(`/admin/cover-images/${id}`);
      setImages((prev) => prev.filter((i) => i.id !== id));

      toast.info("Supprimé");
      window.dispatchEvent(new Event("coverImagesUpdated"));
    } catch (err) {
      console.error(err.response?.data);
      toast.error("Impossible de supprimer");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup shadow-sm p-3 rounded-3">

        <button onClick={closePopUp1} className="bouton-close text-xxl" style={{ color: "red" }}>
          ✕
        </button>

        {/* LISTE */}
        <section>
          <h2 className="petit_titre">Liste des images</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {images.length === 0 ? (
                <tr><td colSpan="4">Aucune image</td></tr>
              ) : (
                images.map((img) => (
                  <tr key={img.id}>
                    <td>{img.id}</td>
                    <td>
                      <img src={img.url} alt="" style={{ width: 120 }} />
                    </td>
                    <td>
                      <div>{img.description}</div>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant={img.active ? "secondary" : "success"}
                        onClick={() => toggleActive(img.id)}
                      >
                        {img.active ? "Désactiver" : "Activer"}
                      </Button>

                      <Button
                        size="sm"
                        variant="danger"
                        className="ms-2"
                        onClick={() => handleDelete(img.id)}
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        {/* FORM */}
        <section className="mt-3">
          <h2 className="petit_titre">Ajouter une image</h2>

          <Form onSubmit={handleSubmit}>

            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button className="mt-3 w-100" disabled={loading} type="submit">
              {loading ? "Envoi..." : "Enregistrer"}
            </Button>

          </Form>
        </section>

      </div>
    </div>
  );
};

export default ImageCouverture;

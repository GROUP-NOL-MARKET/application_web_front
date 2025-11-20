import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import API from "../Authentification/apiAdmin"; // adapte le chemin
import { toast } from "react-toastify";

const ImageCouverture = ({ closePopUp1 }) => {
  const [images, setImages] = useState([]); // liste depuis API
  const [files, setFiles] = useState([]); // fichiers sélectionnés
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch initial
  const loadImages = async () => {
    try {
      const res = await API.get("/admin/cover-images");
      setImages(res.data.data || []);
    } catch (err) {
      console.error("Erreur fetch cover images:", err.msg);
      toast.error("Impossible de charger les images");
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleImageChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) {
      toast.info("Sélectionne au moins une image");
      return;
    }

    const formData = new FormData();
    files.forEach((f) => formData.append("images", f));
    formData.append("description", description);
    // active par défaut false, tu peux ajouter checkbox pour l'activer
    setLoading(true);
    try {
      const res = await API.post("/admin/cover-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Images ajoutées");
      setFiles([]);
      setDescription("");

      // optional: si tu veux forcer le carousel à se mettre à jour, dispatch event
      window.dispatchEvent(new Event("coverImagesUpdated"));
    } catch (err) {
      console.error(err.data);
      toast.error("Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id) => {
    try {
      await API.patch(`/admin/cover-images/${id}/toggle-active`);
      setImages((prev) =>
        prev.map((img) => (img.id === id ? { ...img, active: !img.active } : img))
      );
      window.dispatchEvent(new Event("coverImagesUpdated"));
    } catch (err) {
      console.error(err.data);
      toast.error("Impossible de changer le statut");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette image ?")) return;
    try {
      await API.delete(`/admin/cover-images/${id}`);
      setImages((prev) => prev.filter((i) => i.id !== id));
      window.dispatchEvent(new Event("coverImagesUpdated"));
      toast.info("Supprimé");
    } catch (err) {
      console.error(err.data);
      toast.error("Impossible de supprimer");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup shadow-sm p-3 rounded-3">
        <button onClick={closePopUp1} className="bouton-close text-xxl" style={{ color: "red" }}>
          ✕
        </button>

        <section>
          <h2 className="petit_titre">Liste des images</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="col-1">id</th>
                <th className="col-3">image</th>
                <th className="col-4">Description</th>
                <th className="col-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {images.length === 0 ? (
                <tr><td colSpan="4">Aucune image</td></tr>
              ) : (
                images.map((img) => (
                  <tr key={img.id}>
                    <th scope="row" className="col-1">{img.id}</th>
                    <td className="col-3"><img src={img.url} alt={img.title || ""} style={{width:120}}/></td>
                    <td className="col-4">
                      <div className="texte_brut">{img.title}</div>
                      <div className="small">{img.description}</div>
                    </td>
                    <td className="col-4">
                      <Button size="sm" variant={img.active ? "secondary" : "success"} onClick={() => toggleActive(img.id)}>
                        {img.active ? "Désactiver" : "Activer"}
                      </Button>
                      <Button size="sm" className="ms-2" variant="danger" onClick={() => handleDelete(img.id)}>Supprimer</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        <section className="mt-3">
          <h2 className="petit_titre">Enregistrer une image</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="petit_titre">Image(s)</Form.Label>
              <Form.Control type="file" multiple accept="image/*" onChange={handleImageChange} />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label className="petit_titre">Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            <Button type="submit" className="mt-3 w-100" disabled={loading}>
              {loading ? "Envoi..." : "Enregistrer"}
            </Button>
          </Form>
        </section>
      </div>
    </div>
  );
};

export default ImageCouverture;

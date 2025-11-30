import React, {useEffect,useState} from "react";
import { toast } from "react-toastify";
import { Form, Button, Spinner } from "react-bootstrap";
import APIAdmin from "../Authentification/apiAdmin";

const Publicite = ({ closePopUp2 }) => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadImages = async () => {
    try {
      const res = await APIAdmin.get("/admin/publicite");
      setImages(res.data.data || []);
    } catch (err) {
      console.error("Erreur fetch publicite images:", err);
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
    formData.append("image", file, file.name);

    setLoading(true);

    console.log(file);
console.log(formData.get("image"));

    try {
      await APIAdmin.post("/admin/publicite", formData);

      toast.success("Image ajoutée");
      setFile(null);
      loadImages();

      window.dispatchEvent(new Event("publiciteImagesUpdated"));
    } catch (err) {
      console.error(err.response?.data.message);
      toast.error("Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id) => {
    try {
      await APIAdmin.patch(`/admin/publicite/${id}/toggle-active`);
      setImages((prev) =>
        prev.map((img) =>
          img.id === id ? { ...img, active: !img.active } : img
        )
      );
      window.dispatchEvent(new Event("publiciteImagesUpdated"));
    } catch (err) {
      console.error(err.response?.data);
      toast.error("Impossible de changer le statut");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette image ?")) return;
    try {
      await APIAdmin.delete(`/admin/publicite/${id}`);
      setImages((prev) => prev.filter((i) => i.id !== id));

      toast.info("Supprimé");
      window.dispatchEvent(new Event("publiciteImagesUpdated"));
    } catch (err) {
      console.error(err.response?.data);
      toast.error("Impossible de supprimer");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup shadow-sm p-3 rounded-3">
        <button
          onClick={closePopUp2}
          className="bouton-close text-xxl"
          style={{ color: "red" }}
        >
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {images.length === 0 ? (
                <tr>
                  <td colSpan="4">Aucune image</td>
                </tr>
              ) : (
                images.map((img) => (
                  <tr key={img.id}>
                    <td>{img.id}</td>
                    <td>
                      <img src={img.url} alt="" style={{ width: 120 }} />
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
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>

            <Button className="mt-3 w-100" disabled={loading} type="submit">
              {loading ? <Spinner animation='border'/> : "Enregistrer"}
            </Button>
          </Form>
        </section>
      </div>
    </div>
  );
};

export default Publicite;

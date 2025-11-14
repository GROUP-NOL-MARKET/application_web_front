import { useState, useEffect } from "react";
import axios from "axios";
import API from "../Authentification/apiAdmin";
import { Button, Form, FormControl, FormGroup, FormLabel, Spinner } from "react-bootstrap";
import { toast } from "react-toastify"

const AddPromoModal = ({ show, onClose, onSaved }) => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newPrice, setNewPrice] = useState("");
    const [startAt, setStartAt] = useState("");
    const [endAt, setEndAt] = useState("");
    const [saving, setSaving] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setSearchResults([]);
        setSelectedProduct(null);
        setNewPrice("");
        setError("");
    }, [show]);

    useEffect(() => {
        if (query.length < 2) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        const cancelToken = axios.CancelToken.source();
        setIsSearching(true);

        (async () => {
            try {
                const res = await API.get("/products", {
                    params: { search: query },
                    cancelToken: cancelToken.token,
                });
                setSearchResults(res.data.data ?? res.data);
            } catch (err) {
                if (!axios.isCancel(err)) {
                    console.error(err);
                }
            } finally {
                setIsSearching(false);
            }
        })();

        return () => cancelToken.cancel();
    }, [query]);

    const percentage = selectedProduct
        ? Math.round(
            ((selectedProduct.price - (parseFloat(newPrice) || 0)) /
                selectedProduct.price) *
            100
        )
        : 0;

    const handleSave = async (e) => {
        e.preventDefault();
        setError("");
        if (!selectedProduct) return setError("Sélectionne un produit.");
        if (!newPrice || isNaN(parseFloat(newPrice)))
            return setError("Prix promo invalide.");

        if (!startAt || !endAt) return setError("Remplissez tous les champs");
        setSaving(true);
        try {
            const payload = {
                product_id: selectedProduct.id,
                initial_price: selectedProduct.price,
                pourcentage_vendu: isNaN(percentage) ? 0 : percentage,
                new_price: parseFloat(newPrice),
                start_at: startAt || null,
                end_at: endAt || null,
            };
            const res = await API.post("/admin/promos", payload);
            onSaved(res.data);
            toast.success("Promotion enregistrée")
            onClose();
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Erreur lors de la création.");
        } finally {
            setSaving(false);
        }
    };

    if (!show) return null;

    return (
        <div className="popup-overlay">
            <div className="popup shadow-sm p-3 rounded-3">
                <button
                    onClick={onClose}
                    className="bouton-close text-xxl"
                    style={{ color: "red" }}
                >
                    ✕
                </button>
                <Form onSubmit={handleSave}>
                    <div className="modal-body">
                        <div className="mb-2 position-relative">
                            <FormLabel className="label_register">
                                Rechercher le produit
                            </FormLabel>
                            <div className="d-flex align-items-center gap-2">
                                <FormControl
                                    className="input_register"
                                    placeholder="Tape le nom du produit..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    disabled={saving}
                                />
                                {isSearching && (
                                    <Spinner
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        style={{ color: "#FA7F1B" }}
                                    />
                                )}
                            </div>

                            <div
                                className="list-group mt-1"
                                style={{ maxHeight: 180, overflow: "auto" }}
                            >
                                {searchResults.map((p) => (
                                    <button
                                        type="button"
                                        className={`list-group-item list-group-item-action ${selectedProduct?.id === p.id ? "active" : ""
                                            }`}
                                        key={p.id}
                                        onClick={() => {
                                            setSelectedProduct(p);
                                            setNewPrice((p.price * 0.9).toString()); // par défaut -10%
                                            setSearchResults([]);
                                            setQuery(p.name);
                                        }}
                                    >
                                        {p.name} — {p.price} FCFA
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedProduct && (
                            <div>
                                <div className="row">
                                    <FormGroup className="col-md-6">
                                        <FormLabel className="label_register">
                                            Prix original
                                        </FormLabel>
                                        <FormControl
                                            className="input_register"
                                            value={selectedProduct.price}
                                            readOnly
                                        />
                                    </FormGroup>

                                    <FormGroup className="col-md-6">
                                        <FormLabel className="label_register">
                                            Nouveau prix promo
                                        </FormLabel>
                                        <FormControl
                                            className="input_register"
                                            value={newPrice}
                                            onChange={(e) => setNewPrice(e.target.value)}
                                            inputMode="decimal"
                                        />
                                    </FormGroup>
                                </div>

                                <div className="mt-2">
                                    <strong>Réduction estimée :</strong>{" "}
                                    {isNaN(percentage) ? 0 : percentage}%
                                </div>

                                <div className="row mt-2">
                                    <FormGroup className="col-md-6">
                                        <FormLabel className="label_register">Début</FormLabel>
                                        <FormControl
                                            type="datetime-local"
                                            className="form-control"
                                            value={startAt}
                                            onChange={(e) => setStartAt(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup className="col-md-6">
                                        <label className="label_register">Fin</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            value={endAt}
                                            onChange={(e) => setEndAt(e.target.value)}
                                        />
                                    </FormGroup>
                                </div>
                            </div>
                        )}

                        {error && <div className="alert alert-danger mt-2">{error}</div>}
                    </div>

                    <div className="modal-footer gap-3">
                        <Button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            <span className="petit_titre">Annuler</span>
                        </Button>
                        <Button
                            type="submit"
                            className="btn btn-primary"
                            disabled={saving || isSearching}
                        >
                            <span className="petit_titre">
                                {saving ? "Enregistrement..." : "Ajouter la promotion"}
                            </span>
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AddPromoModal;

import { useState, useEffect } from "react";
import axios from "axios";
import API from "../Authentification/apiAdmin";


const AddPromoModal = ({ show, onClose, onSaved }) => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newPrice, setNewPrice] = useState("");
    const [startAt, setStartAt] = useState("");
    const [endAt, setEndAt] = useState("");
    const [saving, setSaving] = useState(false);
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
            return;
        }
        const cancelToken = axios.CancelToken.source();
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
            }
        })();
        return () => cancelToken.cancel();
    }, [query]);

    const percentage = selectedProduct
        ? Math.round(((selectedProduct.price - (parseFloat(newPrice) || 0)) / selectedProduct.price) * 100)
        : 0;

    const handleSave = async (e) => {
        e.preventDefault();
        setError("");
        if (!selectedProduct) return setError("Sélectionne un produit.");
        if (!newPrice || isNaN(parseFloat(newPrice))) return setError("Prix promo invalide.");
        setSaving(true);
        try {
            const payload = {
                product_id: selectedProduct.id,
                initial_price: selectedProduct.price,
                new_price: parseFloat(newPrice),
                start_at: startAt || null,
                end_at: endAt || null,
            };
            const res = await API.post("/promo", payload);
            onSaved(res.data);
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
        <div className="modal-backdrop">
            <div className="modal-dialog modal-lg">
                <div className="modal-content p-3">
                    <div className="modal-header">
                        <h5 className="modal-title">Ajouter une promotion</h5>
                        <button className="btn btn-sm btn-light" onClick={onClose}>Fermer</button>
                    </div>
                    <form onSubmit={handleSave}>
                        <div className="modal-body">
                            <div className="mb-2">
                                <label>Rechercher produit</label>
                                <input
                                    className="form-control"
                                    placeholder="Tape le nom du produit..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <div className="list-group mt-1" style={{ maxHeight: 180, overflow: "auto" }}>
                                    {searchResults.map((p) => (
                                        <button
                                            type="button"
                                            className={`list-group-item list-group-item-action ${selectedProduct?.id === p.id ? "active" : ""}`}
                                            key={p.id}
                                            onClick={() => {
                                                setSelectedProduct(p);
                                                setNewPrice((p.price * 0.9).toString()); // default -10%
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
                                <>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Prix original</label>
                                            <input className="form-control" value={selectedProduct.price} readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Nouveau prix promo</label>
                                            <input
                                                className="form-control"
                                                value={newPrice}
                                                onChange={(e) => setNewPrice(e.target.value)}
                                                inputMode="decimal"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <strong>Réduction estimée :</strong> {isNaN(percentage) ? 0 : percentage}% (calculé automatiquement)
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label>Début</label>
                                            <input type="datetime-local" className="form-control" value={startAt} onChange={(e) => setStartAt(e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Fin</label>
                                            <input type="datetime-local" className="form-control" value={endAt} onChange={(e) => setEndAt(e.target.value)} />
                                        </div>
                                    </div>
                                </>
                            )}

                            {error && <div className="alert alert-danger mt-2">{error}</div>}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
                            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? "Enregistrement..." : "Ajouter la promotion"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default AddPromoModal;
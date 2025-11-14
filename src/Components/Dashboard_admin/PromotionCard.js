const PromotionCard = ({ promo, onDelete, onToggleActive, onEdit }) => {
    const soldPct = Math.floor((promo.product?.selled / promo.product?.quantity) * 100);
    const discountPercent = Math.round(((promo.initial_price - promo.new_price) / promo.initial_price) * 100);
    return (
        <div className="card mb-3">
            <div className="row g-0 align-items-center">
                <div className="col-md-2 text-center p-2">
                    <img src={promo.product?.image ?? promo.product?.img ?? "/placeholder.png"} alt={promo.product?.name} style={{ maxHeight: 90, objectFit: "contain" }} />
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title mb-1">{promo.product?.name}</h5>
                        <p className="card-text mb-0">
                            <span className="fw-bold text-success">{promo.new_price} FCFA</span>{" "}
                            <small className="text-muted"><s>{promo.initial_price} FCFA</s></small>{" "}
                            <span className="badge bg-warning text-dark ms-2">{discountPercent}%</span>
                        </p>
                        <p className="card-text"> <small className="text-muted">
                            De {promo.start_at ? new Date(promo.start_at).toLocaleString("fr-FR", {
                                dateStyle: "short",
                                timeStyle: "short"
                            }) : "—"}
                            {" "}à{" "}
                            {promo.end_at ? new Date(promo.end_at).toLocaleString("fr-FR", {
                                dateStyle: "short",
                                timeStyle: "short"
                            }) : "—"}
                        </small></p>
                    </div>
                </div>
                <div className="col-md-4 text-end pe-3">
                    <div className="d-flex flex-column align-items-end gap-2">
                        <div style={{ width: "120px" }}>
                            <div className="progress" style={{ height: 20 }}>
                                <div
                                    className="progress-bar progress-bar-striped progress-bar-animated"
                                    role="progressbar"
                                    aria-valuenow={soldPct}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    style={{ width: `${soldPct}%` }}
                                >
                                    {soldPct}% vendu
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-sm btn-outline-danger me-2" onClick={() => onDelete(promo.id)}>Supprimer</button>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => onEdit(promo)}>Éditer</button>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" checked={promo.active} onChange={() => onToggleActive(promo.id, !promo.active)} />
                            <label className="form-check-label">{promo.active ? "Actif" : "Inactif"}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PromotionCard;
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVouchers } from "../../Store/VouchersSlice";
import coupon from "../assets/Images/icone/coupon.png";
import Lottie from "lottie-react";
import Animation from "../animation/loading_gray.json";

const Bons = () => {
    const dispatch = useDispatch();
    const { data: vouchers, loading, currentPage, totalPages } = useSelector((state) => state.vouchers);

    const [activeTab, setActiveTab] = useState("actif");
    const token = localStorage.getItem("token");

    // Charger les bons si le store est vide
    useEffect(() => {
        if (vouchers.length === 0) {
            dispatch(fetchVouchers({ token, page: currentPage }));
        }
    }, [dispatch, token, vouchers.length, currentPage]);

    // Pagination
    const handleNextPage = useCallback(() => {
        if (currentPage < totalPages) {
            dispatch(fetchVouchers({ token, page: currentPage + 1 }));
        }
    }, [dispatch, token, currentPage, totalPages]);

    const handlePrevPage = useCallback(() => {
        if (currentPage > 1) {
            dispatch(fetchVouchers({ token, page: currentPage - 1 }));
        }
    }, [dispatch, token, currentPage]);

    // Filtres optimisés
    const vouchersActifs = useMemo(() => vouchers.filter(v => v.status === "actif"), [vouchers]);
    const vouchersInactifs = useMemo(() => vouchers.filter(v => v.status !== "actif"), [vouchers]);

    return (
        <div className="shadow-sm border border-1 p-2">
            <div className="border-bottom border-2 border-black w-100 py-2 d-flex align-items-center">
                <h2 className="taux_moyen">Bons d'achat</h2>
            </div>

            {/* Onglets */}
            <div className="row">
                <div className="col-lg-1 col-4 py-2">
                    <button
                        className={`nav-link text-truncate ${activeTab === "actif" ? "active-tab" : "text-dark"}`}
                        onClick={() => setActiveTab("actif")}
                    >
                        Actif
                    </button>
                </div>
                <div className="col-lg-2 col py-2">
                    <button
                        className={`nav-link text-truncate ${activeTab === "inactif" ? "active-tab" : "text-dark"}`}
                        onClick={() => setActiveTab("inactif")}
                    >
                        Inactif
                    </button>
                </div>
            </div>

            <div className="mt-3">
                {loading ? (
                    <Lottie animationData={Animation} loop={true} style={{ width: 50, height: 50, margin: "auto" }} />
                ) : activeTab === "actif" ? (
                    vouchersActifs.length > 0 ? (
                        vouchersActifs.map((voucher) => (
                            <div key={voucher.id} className="border border-1 col rounded-3 mb-3 p-2">
                                <div className="row">
                                    <div className="col-lg-3 col-4 img_coupon" >
                                        <img src={coupon} alt="coupon" className="h-100 w-auto" />
                                    </div>
                                    <div className="col">
                                        <h2 className="name_entreprise_dashboard">{voucher.title}</h2>
                                        <h5 className="petit_titre">{voucher.sub_title}</h5>
                                        <span className="col-3 me-2 pt-3 texte_brut">
                                            Code : <b>{voucher.code}</b>
                                        </span>
                                        <span className="col texte_brut">
                                            Valeur : <b>{voucher.valeur}</b>
                                        </span>
                                        <p className="texte_brut">
                                            Valide du <b>{voucher.date}</b> au <b>{voucher.until}</b>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="d-flex flex-column align-items-center justify-content-center my-3">
                            <img src={coupon} alt="" style={{ height: "50px", width: "auto" }} />
                            <p className="p-1 m-0 texte_brut">Aucun bon actif pour l’instant</p>
                        </div>
                    )
                ) : vouchersInactifs.length > 0 ? (
                    vouchersInactifs.map((voucher) => (
                        <div key={voucher.id} className="border border-1 col rounded-3 mb-3 opacity-50">
                            <div className="row">
                                <div className="col-3">
                                    <img src={coupon} alt="coupon" className="img-fluid" />
                                </div>
                                <div className="col">
                                    <h2 className="name_entreprise_dashboard">{voucher.title}</h2>
                                    <p className="texte_brut">Expiré depuis le <b>{voucher.until}</b></p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="d-flex flex-column align-items-center justify-content-center my-3">
                        <img src={coupon} alt="" style={{ height: "50px", width: "auto" }} />
                        <p className="p-1 m-0 texte_brut">Aucun bon inactif pour l’instant</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {!loading && vouchers.length > 0 && (
                <div className="d-flex justify-content-center align-items-center mt-3">
                    <button className="btn btn-outline-dark me-2" disabled={currentPage === 1} onClick={handlePrevPage}>
                        Précédent
                    </button>
                    <span className="texte_brut">Page {currentPage} sur {totalPages}</span>
                    <button className="btn btn-outline-dark ms-2" disabled={currentPage === totalPages} onClick={handleNextPage}>
                        Suivant
                    </button>
                </div>
            )}
        </div>
    );
};

export default Bons;

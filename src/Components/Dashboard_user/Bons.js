import React, { useState, useEffect } from 'react';
import coupon from "../assets/Images/icone/coupon.png";
import Lottie from "lottie-react";
import Animation from "../animation/loading_gray.json";

const Bons = () => {
    const [activeTab, setActiveTab] = useState("actif");
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchVouchers = async (page = 1) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await fetch(`http://127.0.0.1:8000/api/vouchers?page=${page}&per_page=5`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Erreur lors du chargement des bons");
            const data = await response.json();

            setVouchers(data.data || []);
            setCurrentPage(data.current_page || 1);
            setTotalPages(data.last_page || 1);
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVouchers(currentPage);
    }, [currentPage]);

    const vouchersActifs = vouchers.filter(v => v.status === "actif");
    const vouchersInactifs = vouchers.filter(v => v.status !== "actif");



    return (
        <div className="shadow-sm border border-1 p-2">
            <div className="border-bottom border-2 border-black w-100 py-2 d-flex align-items-center">
                <h2 className="taux_moyen">Bons d'achat</h2>
            </div>

            <div className='row'>
                <div className="col-1 py-2">
                    <button
                        className={`nav-link text-truncate ${activeTab === "actif" ? "active-tab" : "text-dark"}`}
                        onClick={() => setActiveTab("actif")}
                    >
                        Actif
                    </button>
                </div>
                <div className="col-2 py-2">
                    <button
                        className={`nav-link text-truncate ${activeTab === "inactif" ? "active-tab" : "text-dark"}`}
                        onClick={() => setActiveTab("inactif")}
                    >
                        Inactif
                    </button>
                </div>
            </div>

            <div className="mt-3">
                {activeTab === "actif" ? (
                    loading ? (
                        <Lottie
                            animationData={Animation}
                            loop={true}
                            style={{ width: 80, height: 80, margin: "auto" }}
                        />
                    ) :
                        vouchersActifs.length > 0 ? (
                            vouchersActifs.map((voucher) => (
                                <div key={voucher.id} className="border border-1 col rounded-3 mb-3 p-2">
                                    <div className="row">
                                        <div className="col-3" style={{ height: "150px" }}>
                                            <img src={coupon} alt="coupon" className="h-100 w-auto" />
                                        </div>
                                        <div className="col">
                                            <h2 className='name_entreprise_dashboard'>{voucher.title}</h2>
                                            <h5 className='petit_titre'>{voucher.sub_title}</h5>
                                            <span className='col-3 me-2 pt-3 texte_brut'>Code : <b>{voucher.code}</b></span>
                                            <span className='col texte_brut'>Valeur : <b>{voucher.valeur}</b></span>
                                            <p className='texte_brut'>
                                                Valide du <b>{voucher.date}</b> au <b>{voucher.until}</b>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='d-flex flex-column align-items-center justify-content-center my-3'>
                                <img src={coupon} alt="" style={{ height: "50px", width: "auto" }} />
                                <p className='p-1 m-0 texte_brut'>Aucun bon actif pour l’instant</p>
                            </div>
                        )
                ) : (
                    vouchersInactifs.length > 0 ? (
                        vouchersInactifs.map((voucher) => (
                            <div key={voucher.id} className="border border-1 col rounded-3 mb-3 opacity-50">
                                <div className="row">
                                    <div className="col-3">
                                        <img src={coupon} alt="coupon" className="img-fluid" />
                                    </div>
                                    <div className="col">
                                        <h2 className='name_entreprise_dashboard'>{voucher.title}</h2>
                                        <p className='texte_brut'>Expiré depuis le <b>{voucher.until}</b></p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='d-flex flex-column align-items-center justify-content-center my-3'>
                            <img src={coupon} alt="" style={{ height: "50px", width: "auto" }} />
                            <p className='p-1 m-0 texte_brut'>Aucun bon inactif pour l’instant</p>
                        </div>
                    )
                )}
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center align-items-center mt-3">
                <button
                    className="btn btn-outline-dark me-2"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                >
                    Précédent
                </button>
                <span className="texte_brut">
                    Page {currentPage} sur {totalPages}
                </span>
                <button
                    className="btn btn-outline-dark ms-2"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default Bons;

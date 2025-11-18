import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import Preloader from "../Preloader";
import { AuthContext } from "../AuthContext";
import { FavoriteContext } from "../../Store/Favoris_context";
import { PanierContext } from "../../Store/Panier_context";
import VusProduct from "./VusProduct";

const AllProducts = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sous_category = queryParams.get("sous_category");

    const [selectedProduct, setSelectedProduct] = useState(null);

    const [showPopUp, setshowPopUp] = useState(false);

    const closePopUp = () => { setSelectedProduct(null); setshowPopUp(false); }
    const openPopUp = (product) => { setSelectedProduct(product); setshowPopUp(true); }

    const { isLoggedIn } = useContext(AuthContext);
    const { addFavorite } = useContext(FavoriteContext);
    const { addProductToCart } = useContext(PanierContext);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const url = new URL("http://127.0.0.1:8000/api/products");
                url.searchParams.append("page", page);

                // Ajouter le filtre seulement si on a une sous-catégorie
                if (sous_category && sous_category.trim() !== "") {
                    url.searchParams.append("sous_category", sous_category);
                }

                const response = await fetch(url);
                const result = await response.json();

                setProducts(result.data);
                setTotalPages(result.total_pages);
            } catch (error) {
                console.error(" Erreur lors de la récupération des produits :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [sous_category, page]);

    if (loading) {
        return <Preloader />;
    }

    return (
        <div className="container mt-4">
            {/* En-tête */}
            <div className="row">
                <h1 className="col-md-9 col-lg-10 col-sm-8 col-10 title mt-2 mt-md-0">
                    {sous_category ? `${sous_category}` : "Tous les produits"}
                </h1>
            </div>
            <hr style={{ color: "#FA7F1B", height: "0.2rem" }} className="m-0" />

            {/* Liste des produits */}
            <div className="row mt-md-3 mt-0 ">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="col-md-3 col-sm-4 col-lg-2  mb-4 col-6">
                            <div className="d-flex flex-column border border-1 shadow-sm p-2">
                                <img
                                    src={
                                        product.image.startsWith("http")
                                            ? product.image
                                            : `http://127.0.0.1:8000/storage/${product.image}`
                                    }
                                    className=" img_product"
                                    alt={product.name}
                                    onClick={() => openPopUp(product)}
                                />
                                <div className="card-body">
                                    <h5 className="text-truncate petit_titre">{product.name}</h5>
                                    <p className="card-text petit_titre fw-bold">{product.price} FCFA</p>
                                    <h5 className="card-text petit_titre">{product.category} </h5>
                                    {!isLoggedIn ? (
                                        <div className="d-flex flex-row justify-content-center gap-3 my-2">
                                            <FontAwesomeIcon
                                                icon={faCartShopping}
                                                onClick={() => addProductToCart(product)}
                                                style={{ cursor: "pointer", color: "#0066BD" }}

                                            />

                                        </div>) : (
                                        <div className="d-flex flex-row justify-content-center gap-3 my-2">
                                            <FontAwesomeIcon
                                                icon={faCartShopping}
                                                onClick={() => addProductToCart(product)}
                                                style={{ cursor: "pointer", color: "#0066BD" }}
                                            />
                                            <FontAwesomeIcon
                                                icon={faHeart}
                                                onClick={() => addFavorite(product.id)}
                                                style={{ cursor: "pointer", color: "#FA7F1B" }}
                                            />

                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted">
                        Aucun produit trouvé {sous_category ? "dans cette sous-catégorie" : ""}.
                    </p>
                )}
            </div>

            {/* Pagination */}
            <nav aria-label="Page navigation example" className="d-flex justify-content-center my-4">
                <ul className="pagination ">
                    <li className="page-item">
                        <button className="page-link" disabled={page === 1} onClick={() => setPage(page - 1)} aria-label="Previous">
                            <span aria-hidden="true" >
                                &laquo;
                            </span>
                        </button>
                    </li>
                    <li className="page-item"><span className="page-link">Page {page} / {totalPages}</span></li>
                    <li className="page-item">
                        <button className="page-link" disabled={page === totalPages} onClick={() => setPage(page + 1)} aria-label="Next">
                            <span aria-hidden="true" >
                                &raquo;
                            </span>
                        </button>
                    </li>
                </ul>
            </nav>
            {showPopUp && (
                <VusProduct closePopUp={closePopUp} product={selectedProduct} />
            )}
        </div>
    );
};

export default AllProducts;

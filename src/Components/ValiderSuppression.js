import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { PanierContext } from '../Store/Panier_context'

const ValiderSuppression = ({ closePopUp }) => {
    const {clearCart} = useContext(PanierContext);
    return (
        <div>
            <div className="popup-overlay">
                <div className="popup rounded-3 p-3">
                    <button
                        onClick={closePopUp}
                        className="bouton-close text-xxl"
                        style={{ color: "red", fontSize: "20px", border: "none", background: "none" }}
                    >
                        ✕
                    </button>
                    <div className="d-flex flex-column">
                        <div>
                            <h5 className=' petit_titre'>Êtes-vous sûr de vouloir vider le panier?</h5>
                        </div>
                        <div className="row mt-3">
                            <Button className="rounded-5 offset-4 col-3 me-2" style={{ backgroundColor: "green", color: "white" }} onClick={async()=>{ await clearCart() ; closePopUp();}}>Oui</Button>
                            <Button className="rounded-5 col-3" style={{ backgroundColor: "red", color: "white" }} onClick={closePopUp}>Non</Button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ValiderSuppression
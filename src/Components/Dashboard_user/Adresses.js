import React, {useState} from 'react'
import location from "../assets/Images/icone/location.png";
import { Button } from 'react-bootstrap';
import AjoutAdresse from './AjoutAdresse';

const Adresses = () => {
    const [showPopUp, setshowPopUp] = useState(false);

    const closePopUp = () => setshowPopUp(false); 
    const openPopUp = () => setshowPopUp(true);

    return (
        <div>          <div className="shadow-sm border border-1 p-2">
            <div className="border-bottom border-2 border-black w-100 py-2 d-flex align-items-center">
                <h2 className="taux_moyen">Adresses</h2>
            </div>
            <div className='d-flex flex-column align-items-center justify-content-center my-3'>
                <img src={location} alt="" style={{ height: "50px", width: "auto" }} />
                <p className='p-1 m-0 texte_brut'>Aucune adresse ajoutée pour l'instant</p>
                <p className='p-0 m-0 texte_brut texte-center'>Cliquez sur le bouton ci-dessous pour ajouter votre adresses</p>
                <Button onClick={openPopUp} className="mt-2"><span className='petit_titre'>Ajouter une adresse</span></Button>
            </div>
        </div>
         {showPopUp && (
            <AjoutAdresse closePopUp={closePopUp}/>
        )}
        </div>
       
    )
}

export default Adresses
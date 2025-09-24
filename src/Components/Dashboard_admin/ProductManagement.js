import React from "react";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faImage } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./dataset/Dropdown";
import Entete from "./dataset/Entete";
import { Button } from "@mui/material";

const ProductManagement = () => {
  return (
    <div className="container-fluid">
      {/* En-tête  */}

      <Entete title="Gestion des produits" />

      {/* Premier content  */}

      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-9">
            <div className="row">
              <Button
                className="col-3 me-2 bg-success rounded-5"
                style={{ color: "white" }}
              >
                Ajouter un produit{" "}
                <FontAwesomeIcon icon={faCirclePlus} className="ms-1" />
              </Button>
              <Button
                className="col-3 bg-primary rounded-5"
                style={{ color: "white" }}
              >
                Exporter sous csv
              </Button>
            </div>
            <div className="mt-2">
              <p className="texte_brut">
                Produits: Tous (18.000) |
                <span style={{ color: "blue" }}> Publiés: </span>(17.000) |{" "}
                <span style={{ color: "blue" }}> Supprimés: </span>(500) |{" "}
                <span style={{ color: "blue" }}> Brouillons: </span>(500)
              </p>
            </div>
          </div>
          <div className="col">
            <div className="row overflow-hidden border border-1">
              {/* Champ de recherche */}
              <div className="col-10">
                <InputBase
                  placeholder="Recherher un produit"
                  inputProps={{ "aria-label": "search" }}
                  className="w-100 px-3 h-100"
                  sx={{ height: "100%" }}
                />
              </div>

              {/* Bouton de recherche */}
              <div className="col-2" style={{ backgroundColor: "#0066BD" }}>
                <IconButton
                  type="button"
                  className="w-100 h-100"
                  sx={{
                    color: "white",
                    borderRadius: 0,
                    ":hover": {
                      backgroundColor: "#0066BD",
                    },
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deuxième content  */}
      <div className="container-fluid">
        <ul className="d-flex flex-row list-unstyled">
          <li className="me-2">
            <Dropdown
              type="Statut de stock"
              dropdown_item_1=""
              dropdown_item_2=""
              dropdown_item_3=""
            />
          </li>
          <li className="me-2">
            <Dropdown
              type="Catégories de produits"
              dropdown_item_1=""
              dropdown_item_2=""
              dropdown_item_3=""
            />
          </li>
          <li className="me-2">
            <Dropdown
              type="Meilleurs ventes"
              dropdown_item_1=""
              dropdown_item_2=""
              dropdown_item_3=""
            />
          </li>
          <li className="me-2">
            <Dropdown
              type="Type de produits"
              dropdown_item_1=""
              dropdown_item_2=""
              dropdown_item_3=""
            />
          </li>
          <li className="me-2">
            <Dropdown
              type="Dernière modification"
              dropdown_item_1=""
              dropdown_item_2=""
              dropdown_item_3=""
            />
          </li>
          <li className="offset-2 col">
            <div className="row">
              <Button
                className="bg-success col-6 me-2 rounded-4"
                style={{ color: "white" }}
              >
                Appliquer
              </Button>
              <Button
                className="bg-danger col rounded-5"
                style={{ color: "white" }}
              >
                Annuler
              </Button>
            </div>
          </li>
        </ul>
      </div>

      {/* troisième content  */}

      <div className="container-fluid">
        <div className="texte_brut fw-bold">Produits vus : 1/2500</div>
        <div>
          <table class="table table-striped">
            <thead>
              <tr className="petit_titre">
                <th scope="col">
                  <FontAwesomeIcon icon={faImage} />
                </th>
                <th scope="col">Reférence</th>
                <th scope="col">Nom</th>
                <th scope="col">Famille</th>
                <th scope="col">Prix</th>
                <th scope="col">Catégories</th>
                <th scope="col">Description</th>
                <th scope="col">disponibilité</th>
                <th scope="col">Quantité</th>
                <th scope="col">Sous catégories</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Image</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>Mark</td>
              </tr>
              <tr>
                <th scope="row">Image</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>Mark</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination  */}

      <nav aria-label="Page navigation example" className="mt-2">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href=" " aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href=" ">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href=" ">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href=" ">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href=" " aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductManagement;

import React, { useContext } from "react";
import Entete from "./dataset/Entete";
import { Avatar, Rating } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faEllipsisVertical,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "./ThemeContext";
import { avis } from "../Product_Data";
import FooterDashboard from "./dataset/FooterDashboard";
import avis_dashboard_1 from "../assets/Images/avis_dashboard_1.png";
import avis_dashboard_2 from "../assets/Images/avis_dashboard_2.png";
import avis_dashboard_3 from "../assets/Images/avis_dashboard_3.png";

const Avis = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="container-fluid">
      {/* Entete  */}

      <Entete title="Avis" />

      {/* Premier content  */}

      <div className="container-fluid">
        <div className="row mt-4">
          <div
            className="col-2 me-2 shadow-sm border border-1 d-flex flex-column align-items-center justify-content-center"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
            />
            <h5 className="taux_moyen"> 4.5</h5>
            <h5 className="petit_titre">Score Avis</h5>
          </div>
          <div
            className="col-2 me-2 shadow-sm border border-1 d-flex flex-column align-items-center justify-content-center"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <img src={avis_dashboard_1} alt="" className="img-fluid w-50" />
            <h5 className="taux_moyen"> 235</h5>
            <h5 className="petit_titre">Score des clients</h5>
          </div>
          <div
            className="col-2 me-2 shadow-sm border border-1 d-flex flex-column align-items-center justify-content-center"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <img src={avis_dashboard_2} alt="" className="img-fluid w-50" />
            <h5 className="taux_moyen"> 35%</h5>
            <h5 className="petit_titre">Nouveaux clients</h5>
          </div>
          <div
            className="col-2 me-2 shadow-sm border border-1 d-flex flex-column align-items-center justify-content-center"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <img src={avis_dashboard_3} alt="" className="img-fluid w-50" />
            <h5 className="taux_moyen"> 80%</h5>
            <h5 className="petit_titre">Clients réguliers</h5>
          </div>
          <div
            className="col shadow-sm border border-1 p-2"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <ul className="d-flex flex-row list-unstyled align-items-center">
              <li className="petit_titre">5</li>
              <li>
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ color: "#F5B027" }}
                  className="col"
                />
              </li>
              <li className="progress col">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "100%", backgroundColor: "#F5B027" }}
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  100%
                </div>
              </li>
            </ul>
            <ul className="d-flex flex-row list-unstyled align-items-center">
              <li className="petit_titre">4</li>
              <li>
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ color: "#F5B027" }}
                  className="col"
                />
              </li>

              <li className="progress col">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "95%", backgroundColor: "#F5B027" }}
                  aria-valuenow="95"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  95%
                </div>
              </li>
            </ul>
            <ul className="d-flex flex-row list-unstyled align-items-center">
              <li className="petit_titre">3</li>
              <li>
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ color: "#F5B027" }}
                  className="col"
                />
              </li>

              <li className="progress col">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "80%", backgroundColor: "#F5B027" }}
                  aria-valuenow="80"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  80%
                </div>
              </li>
            </ul>
            <ul className="d-flex flex-row list-unstyled align-items-center">
              <li className="petit_titre">2</li>
              <li>
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ color: "#F5B027" }}
                  className="col"
                />
              </li>

              <li className="progress col">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "75%", backgroundColor: "#F5B027" }}
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  75%
                </div>
              </li>
            </ul>
            <ul className="d-flex flex-row list-unstyled align-items-center">
              <li className="petit_titre">1</li>
              <li>
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ color: "#F5B027" }}
                  className="col"
                />
              </li>

              <li className="progress col">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "0%", backgroundColor: "#F5B027" }}
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  0%
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Deuxième content  */}

      <div
        className="shadow-sm border border-1 mt-4"
        style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
      >
        <h5 className="taux_moyen m-2">Derniers avis acceptés</h5>
        <div className="container-fluid">
          <table class="table table-striped">
            <tbody>
              {avis.map((avi) => (
                <tr className="row">
                  <td className="col-1 d-flex align-items-center justify-content-center">
                    <Avatar src={avi.image} alt="" className="img-fluid" />
                  </td>
                  <td className="d-flex flex-column col-2 align-items-center justify-content-center">
                    <h5 className="petit_titre fw-bold">{avi.name} </h5>
                    <p className="texte_brut">{avi.email} </p>
                  </td>
                  <td className="col-2 d-flex align-items-center justify-content-center">
                    <Rating
                      name="half-rating-read"
                      value={avi.notation}
                      precision={0.5}
                      readOnly
                    />
                    <span className="petit_titre">{avi.notation} </span>
                  </td>
                  <td className="col-4 d-flex align-items-center justify-content-center">
                    <div className="border border-2 texte_brut text-justify p-2">
                      {avi.appreciation}
                    </div>
                  </td>
                  <td className="d-flex flex-column col-2 align-items-center justify-content-center">
                    <div className="row">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="col-2"
                        style={{ color: "blue" }}
                      />
                      <span className="texte_brut fw-bold col">
                        {avi.date}{" "}
                      </span>
                    </div>
                    <h6 className="texte_brut"> à {avi.heure} </h6>
                  </td>
                  <td className="col-1 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

      {/* Footer  */}

      <FooterDashboard />
    </div>
  );
};

export default Avis;

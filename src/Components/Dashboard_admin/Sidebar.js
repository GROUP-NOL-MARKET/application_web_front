import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { ThemeContext } from "./ThemeContext";
import { SidebarMenu } from "./SidebarMenu";
import img_profil from "../assets/Images/Logo_entreprise.webp";
import "../../Styles/AdminDashbord/sidebar.css";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <aside
      className={`${theme === "dark" ? "sidebar-dark" : "sidebar-light"} 
      d-flex flex-column p-3 shadow-sm border`}
      style={{ minWidth: "275px", maxWidth: "275px", minHeight: "100vh" }}
    >
      {/* Avatar */}
      <div className="text-center mb-3">
        <Avatar
          src={img_profil}
          sx={{
            width: 100,
            height: 100,
            border: "2px solid #FA7F1B",
            margin: "auto",
          }}
        />
      </div>

      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        <div className="accordion accordion-flush" id="sidebarAccordion">
          {SidebarMenu.map((item, index) => {
            /* ---------- ACCORDION ---------- */
            if (item.type === "accordion") {
              return (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${item.id}`}
                    >
                      <img src={item.icon} className="col-1 me-2 img" alt={item.title} />
                      {item.title}
                    </button>
                  </h2>

                  <div
                    id={`collapse-${item.id}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#sidebarAccordion"
                  >
                    <div className="accordion-body">
                      {item.children.map((child, i) => (
                        <NavLink
                          key={i}
                          to={child.path}
                          end
                          className={({ isActive }) =>
                            "nav-link text-truncate " +
                            (isActive ? "active" : "text-dark")
                          }
                        >
                          <img
                            src={child.icon}
                            className="col-1 me-2 img"
                            alt={child.label}
                          />
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            /* ---------- SIMPLE LINK ---------- */
            return (
              <li className="nav-item" key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    "nav-link text-truncate " +
                    (isActive ? "active" : "text-dark")
                  }
                >
                  <img src={item.icon} className="col-1 me-2 img" />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </div>
      </ul>
    </aside>
  );
};

export default Sidebar;
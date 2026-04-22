import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { ThemeContext } from "./ThemeContext";
import { SidebarMenu } from "./SidebarMenu";
import img_profil from "../assets/Images/Logo_entreprise.webp";
import "../../Styles/AdminDashbord/sidebar.css";
import { DashboardLayoutContext } from "../../Routes/DashboardLayoutContext";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { sidebarOpen, setSidebarOpen } = useContext(DashboardLayoutContext);

  return (
    <>
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          sidebar
          ${theme === "dark" ? "sidebar-dark" : "sidebar-light"}
          ${sidebarOpen ? "open" : ""}
        `}
      >
        {/* Avatar */}
        <div className="text-center my-3">
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
              if (item.type === "accordion") {
                return (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${item.id}`}
                      >
                        <img
                          src={item.icon}
                          className="me-2 img"
                          alt={item.title}
                        />
                        {item.title}
                      </button>
                    </h2>

                    <div
                      id={`collapse-${item.id}`}
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        {item.children.map((child, i) => (
                          <NavLink
                            key={i}
                            to={child.path}
                            className="nav-link"
                            onClick={() => setSidebarOpen(false)}
                          >
                            <img
                              src={child.icon}
                              className="me-2 img"
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

              return (
                <li className="nav-item" key={index}>
                  <NavLink
                    to={item.path}
                    className="nav-link"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <img
                      src={item.icon}
                      className="me-2 img"
                      alt={item.label}
                    />
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </div>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
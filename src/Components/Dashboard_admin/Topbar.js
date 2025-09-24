import React, { useEffect, useState, useRef } from "react";
import "./Notifications/Notifications.css";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import notification from "../assets/Images/icone/notification.png";
import comment from "../assets/Images/icone/comment.png";
import { Avatar } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import img_soleil from "../assets/Images/icone/symbole-de-temps-soleil.png";
import img_lune from "../assets/Images/icone/croissant-de-lune.png";
import NotificationDropdown from "./Notifications/NotificationDropdown";
import "../../Styles/AdminDashbord/topbar.css";

const Topbar = ({ initial = [], fetchMore, onAction }) => {
  const { theme, toggleThemeMode } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(initial);
  const ref = useRef(null);

  // fermer si clic en dehors
  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleAccept = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "accepted" } : n))
    );
    if (onAction) onAction("accept", id);
  };

  const handleDecline = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "declined" } : n))
    );
    if (onAction) onAction("decline", id);
  };

  const handleLoadMore = async () => {
    if (!fetchMore) return;
    const more = await fetchMore(); // doit retourner un tableau
    setNotifications((prev) => [...prev, ...more]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  return (
    <nav
      className={`${
        theme === "dark" ? "topbar-dark" : "topbar-light"
      } navbar navbar-expand border-bottom d-flex position-fixed top-0 `}
      style={{ zIndex: 1 }}
    >
      <div className="container-fluid">
        <div className="row g-0 rounded-5 overflow-hidden col-8  border border-1">
          {/* Champ de recherche */}
          <div className="col-10">
            <InputBase
              placeholder="Tapez ici..."
              inputProps={{ "aria-label": "search" }}
              className="w-100 px-3 h-100"
              sx={{ height: "100%" }}
            />
          </div>

          {/* Bouton de recherche */}
          <div className="col-2">
            <IconButton
              type="button"
              className="w-100 h-100"
              sx={{
                backgroundColor: "#0066BD",
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

        <div className="d-flex align-items-center offset-1 col-3">
          <div className="row">
            <div className="col-2 d-flex align-items-center">
              <div onClick={toggleThemeMode}>
                {theme === "light" ? (
                  <img
                    src={img_lune}
                    alt="icône de lune"
                    className="img-fluid"
                  />
                ) : (
                  <img src={img_soleil} alt="" className="img-fluid" />
                )}
              </div>
            </div>
            <div
              className="col-2 d-flex align-items-center"
              onClick={() => setOpen((o) => !o)}
            >
              <img
                src={notification}
                alt="cloche de notification"
                className="img-fluid"
                style={{ cursor: "pointer" }}
                
              />
              {unreadCount > 0 && (
                <span className="notif-badge">{unreadCount}</span>
              )}
            </div>
            {open && (
              <NotificationDropdown
                notifications={notifications}
                onClose={() => setOpen(false)}
                onAccept={handleAccept}
                onDecline={handleDecline}
                onLoadMore={handleLoadMore}
              
              />
            )}
            <div className="col-2 d-flex align-items-center">
              <img src={comment} alt="icône de message" className="img-fluid" />
            </div>
            <div className="dropdown col-6">
              <a
                className="d-flex align-items-center text-decoration-none dropdown-toggle "
                href=" "
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Avatar alt="avatar" className="rounded-circle" />
                <span className="ms-2">Admin</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href=" ">
                    Profil
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href=" ">
                    Déconnexion
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Topbar;

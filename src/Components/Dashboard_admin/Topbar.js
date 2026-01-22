import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
} from "react";
import "./Notifications/Notifications.css";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import notificationIcon from "../assets/Images/icone/notification.png";
import messageIcon from "../assets/Images/icone/comment.png";
import { Avatar } from "@mui/material";
import { ThemeContext } from "./ThemeContext";
import imgSoleil from "../assets/Images/icone/symbole-de-temps-soleil.png";
import imgLune from "../assets/Images/icone/croissant-de-lune.png";
import NotificationDropdown from "./Notifications/NotificationDropdown";
import MessageDropdown from "./Messages/MessageDropdown";
import "../../Styles/AdminDashbord/topbar.css";
import API from "../Authentification/apiAdmin";

const Topbar = ({
  initial = [],
  fetchMoreNotifications,
  fetchMoreMessages,
}) => {
  const { theme, toggleThemeMode } = useContext(ThemeContext);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openMessages, setOpenMessages] = useState(false);
  const [notifications, setNotifications] = useState(initial);
  const [messages, setMessages] = useState(initial);
  const refNotifications = useRef(null);
  const refMessages = useRef(null);
  const navigate = useNavigate();

  // Charger plus de notifications
  const handleLoadMoreNotifications = useCallback(async () => {
    if (!fetchMoreNotifications) return;
    const more = await fetchMoreNotifications();
    setNotifications((prev) => [...prev, ...more]);
  }, [fetchMoreNotifications]);

  // Charger plus de messages
  const handleLoadMoreMessages = useCallback(async () => {
    if (!fetchMoreMessages) return;
    const more = await fetchMoreMessages();
    setMessages((prev) => [...prev, ...more]);
  }, [fetchMoreMessages]);

  // Calcul des non lus
  const unreadNotifications = notifications.filter((n) => n.can_act).length;
  const unreadMessages = messages.filter((m) => !m.read).length;

  useEffect(() => {
    API.get("/admin/notifications").then((res) => setNotifications(res.data));
  }, []);

  const handleAccept = (id) => {
    API.post(`/admin/notifications/${id}/accept`).then(() => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, can_act: false } : n))
      );
    });
  };

  //  Marquer comme lus quand on ouvre le dropdown message
  useEffect(() => {
    if (openMessages && unreadMessages > 0) {
      setMessages((prev) => prev.map((m) => ({ ...m, read: true })));
    }
  }, [openMessages]);

  // Déconnexion admin
  const logout = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      await API.post(
        "/admin/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem("adminToken");
      toast.success("Déconnexion réussie");
      navigate("/admin/");
    } catch (err) {
      toast.error("Erreur lors de la déconnexion");
    }
  };

  return (
    <nav
      className={`navbar navbar-expand border-bottom d-flex position-fixed top-0 ${
        theme === "dark" ? "topbar-dark" : "topbar-light"
      }`}
      style={{ zIndex: 1 }}
    >
      <div className="container-fluid">
        {/* Champ de recherche */}
        <div className="row g-0 rounded-5 overflow-hidden col-8 border border-1">
          <div className="col-10">
            <InputBase
              placeholder="Tapez ici..."
              inputProps={{ "aria-label": "search" }}
              className="w-100 px-3 h-100"
              sx={{ height: "100%" }}
            />
          </div>

          <div className="col-2">
            <IconButton
              type="button"
              className="w-100 h-100"
              sx={{
                backgroundColor: "#0066BD",
                color: "white",
                borderRadius: 0,
                ":hover": { backgroundColor: "#004d94" },
              }}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </div>

        {/* Section droite */}
        <div className="d-flex align-items-center offset-1 col-3">
          <div className="row w-100 align-items-center">
            {/* Thème */}
            <div
              className="col-2 d-flex justify-content-center"
              onClick={toggleThemeMode}
            >
              <img
                src={theme === "light" ? imgLune : imgSoleil}
                alt="toggle theme"
                className="img-fluid"
                style={{ cursor: "pointer" }}
              />
            </div>

            {/* Notifications */}
            <div
              className="col-2 d-flex justify-content-center position-relative"
              ref={refNotifications}
            >
              <img
                src={notificationIcon}
                alt="notifications"
                className="img-fluid"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setOpenNotifications((prev) => !prev);
                  setOpenMessages(false);
                }}
              />
              {unreadNotifications > 0 && (
                <span className="notif-badge">{unreadNotifications}</span>
              )}
              {openNotifications && (
                <NotificationDropdown
                  notifications={notifications}
                  onClose={() => setOpenNotifications(false)}
                  onAccept={handleAccept}
                  onDecline={() => {}}
                  onLoadMore={handleLoadMoreNotifications}
                />
              )}
            </div>

            {/* Messages */}
            <div
              className="col-2 d-flex justify-content-center position-relative"
              ref={refMessages}
            >
              <img
                src={messageIcon}
                alt="messages"
                className="img-fluid"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setOpenMessages((prev) => !prev);
                  setOpenNotifications(false);
                }}
              />
              {/* Badge rouge quand message non lu */}
              {unreadMessages > 0 && (
                <span className="message-badge">{unreadMessages}</span>
              )}
              {openMessages && (
                <MessageDropdown
                  messages={messages}
                  onClose={() => setOpenMessages(false)}
                  onLoadMore={handleLoadMoreMessages}
                />
              )}
            </div>

            {/* Avatar + Menu */}
            <div className="dropdown col-6 d-flex justify-content-end">
              <a
                className="d-flex align-items-center text-decoration-none dropdown-toggle"
                href=" "
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Avatar alt="Admin avatar" className="rounded-circle" />
                <span className="ms-2">Admin</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/admin/paramètres">
                    Paramètres
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-danger" onClick={logout}>
                    Déconnexion
                  </Link>
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

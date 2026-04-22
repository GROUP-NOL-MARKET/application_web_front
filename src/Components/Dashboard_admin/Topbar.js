import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IconButton,
  InputBase,
  Avatar,
  Badge,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import { ThemeContext } from "./ThemeContext";
import NotificationDropdown from "./Notifications/NotificationDropdown";
import MessageDropdown from "./Messages/MessageDropdown";
import API from "../Authentification/apiAdmin";
import { toast } from "react-toastify";

import "../../Styles/AdminDashbord/topbar.css";

const Topbar = () => {
  const { theme, toggleThemeMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openMessages, setOpenMessages] = useState(false);

  const unreadNotifications = notifications.filter(n => n.can_act).length;
  const unreadMessages = messages.filter(m => !m.read).length;

  useEffect(() => {
    API.get("/admin/notifications").then(res => setNotifications(res.data));
  }, []);

  const logout = async () => {
    try {
      await API.post("/admin/logout");
      localStorage.removeItem("adminToken");
      toast.success("Déconnexion réussie");
      navigate("/admin/");
    } catch {
      toast.error("Erreur lors de la déconnexion");
    }
  };

  return (
    <header
      className={`topbar ${theme === "dark" ? "topbar-dark" : "topbar-light"}`}
    >
      {/* GAUCHE : Recherche */}
      <div className="topbar-left">
        <div className="search-box">
          <InputBase placeholder="Rechercher…" />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
      </div>

      {/* DROITE */}
      <div className="topbar-right">
        {/* Theme */}
        <IconButton onClick={toggleThemeMode}>
          {theme === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </IconButton>

        {/* Notifications */}
        <IconButton
          onClick={() => {
            setOpenNotifications(!openNotifications);
            setOpenMessages(false);
          }}
        >
          <Badge badgeContent={unreadNotifications} color="error">
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>

        {openNotifications && (
          <NotificationDropdown
            notifications={notifications}
            onClose={() => setOpenNotifications(false)}
          />
        )}

        {/* Messages */}
        <IconButton
          onClick={() => {
            setOpenMessages(!openMessages);
            setOpenNotifications(false);
          }}
        >
          <Badge badgeContent={unreadMessages} color="error">
            <MailOutlineIcon />
          </Badge>
        </IconButton>

        {openMessages && (
          <MessageDropdown
            messages={messages}
            onClose={() => setOpenMessages(false)}
          />
        )}

        {/* Avatar */}
        <div className="dropdown">
          <IconButton data-bs-toggle="dropdown">
            <Avatar />
          </IconButton>

          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <Link className="dropdown-item" to="/admin/paramètres">
                Paramètres
              </Link>
            </li>
            <li>
              <button className="dropdown-item text-danger" onClick={logout}>
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
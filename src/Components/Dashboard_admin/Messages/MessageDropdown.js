import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import MessageItem from "./MessageItem";
import API from "../../Authentification/apiAdmin";
import "./Messages.css";
import { Spinner } from "react-bootstrap";

export default function MessageDropdown({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Empêche la fermeture si clic à l'intérieur du panneau
  useEffect(() => {
    const handleClickOutside = (e) => {
      const dropdown = document.querySelector(".message-dropdown");
      if (dropdown && !dropdown.contains(e.target)) {
        onClose(); // seulement si clic *en dehors*
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Charger les messages depuis Laravel
  const fetchMessages = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await API.get("/admin/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Erreur chargement messages:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 20000);
    return () => clearInterval(interval);
  }, []);

  //e.stopPropagation() pour bloquer la fermeture automatique
  return createPortal(
    <div
      className="message-dropdown"
      role="dialog"
      aria-label="Messages panel"
      onClick={(e) => e.stopPropagation()} // ⬅️ bloque propagation interne
    >
      <div className="message-panel">
        <div className="message-header">
          <h3 className="message-title">Messages</h3>
          <div className="message-filters">
            <button className="filter active">
              Tous <span>({messages.length})</span>
            </button>
          </div>
        </div>

        <div className="message-list">
          {loading ? (
            <div className="empty">
              <Spinner animation="border" size="sm" />
            </div>
          ) : messages.length === 0 ? (
            <div className="empty">Aucun message</div>
          ) : (
            messages.map((msg) => (
              <MessageItem
                key={msg.id}
                item={{
                  name: msg.nom,
                  message: msg.message,
                  time: new Date(msg.created_at).toLocaleString(),
                  avatar: "/avatar.png",
                }}
              />
            ))
          )}
        </div>

        <div className="message-footer">
          <button className="load-more p-1 text-center" onClick={fetchMessages}>
            Rafraîchir
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

import React from "react";
import { createPortal } from "react-dom";
import MessageItem from "./MessageItem";
import { demoNotifications } from "../../Product_Data";

export default function NotificationDropdown({
  messages,
  onClose,
  onLoadMore,
}) {
  // rendu via portal pour être au-dessus du reste de l'UI
  return createPortal(
    <div
      className="message-dropdown"
      role="dialog"
      aria-label="Messages panel"
    >
      <div className="message-panel">
        <div className="message-header">
          <h3 className="message-title">Messages</h3>
          <div className="message-filters">
            <button className="filter active">
              Tous <span>({messages.length})</span>
            </button>
            <button className="filter">
              Suivis <span>(0)</span>
            </button>
            <button className="filter">
              Commandes <span>(0)</span>
            </button>
          </div>
        </div>

        <div className="message-list">
          {messages.length === 0 && (
            <div className="empty">Aucune notification</div>
          )}
          {demoNotifications.map((n) => (
            <MessageItem
              key={n.id}
              item={n}
            />
          ))}
        </div>

        <div className="message-footer">
          <button className="load-more p-1 text-center" onClick={onLoadMore}>
            Voir plus
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

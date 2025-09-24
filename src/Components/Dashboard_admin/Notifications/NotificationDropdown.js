import React from "react";
import { createPortal } from "react-dom";
import NotificationItem from "./NotificationItem";
import { demoNotifications } from "../../Product_Data";

export default function NotificationDropdown({
  notifications,
  onClose,
  onAccept,
  onDecline,
  onLoadMore,
}) {
  // rendu via portal pour être au-dessus du reste de l'UI
  return createPortal(
    <div
      className="notif-dropdown"
      role="dialog"
      aria-label="Notifications panel"
    >
      <div className="notif-panel">
        <div className="notif-header">
          <h3 className="notif-title">Notifications</h3>
          <div className="notif-filters">
            <button className="filter active">
              Tous <span>({notifications.length})</span>
            </button>
            <button className="filter">
              Suivis <span>(0)</span>
            </button>
            <button className="filter">
              Commandes <span>(0)</span>
            </button>
          </div>
        </div>

        <div className="notif-list">
          {notifications.length === 0 && (
            <div className="empty">Aucune notification</div>
          )}
          {demoNotifications.map((n) => (
            <NotificationItem
              key={n.id}
              item={n}
              onAccept={() => onAccept(n.id)}
              onDecline={() => onDecline(n.id)}
            />
          ))}
        </div>

        <div className="notif-footer">
          <button className="load-more p-1 text-center" onClick={onLoadMore}>
            Voir plus
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

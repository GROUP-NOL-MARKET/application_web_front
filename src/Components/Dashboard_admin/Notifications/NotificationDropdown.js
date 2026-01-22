import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import NotificationItem from "./NotificationItem";

export default function NotificationDropdown({
  notifications,
  onClose,
  onAccept,
  onDecline,
  onLoadMore,
}) {
  useEffect(() => {
    const handleClickOutside = (e) => {
      const dropdown = document.querySelector(".notif-dropdown");
      if (dropdown && !dropdown.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return createPortal(
    <div className="notif-dropdown" role="dialog">
      <div className="notif-panel">
        <div className="notif-header">
          <h3 className="notif-title">Notifications</h3>

          <div className="notif-filters">
            <button className="filter active">
              Tous <span>({notifications.length})</span>
            </button>
          </div>
        </div>

        <div className="notif-list">
          {notifications.length === 0 && (
            <div className="empty">Aucune notification</div>
          )}

          {notifications.map((n) => (
            <NotificationItem
              key={n.id}
              item={{
                name: n.sender,
                message: n.content,
                time: new Date(n.created_at).toLocaleString(),
                canAct: n.can_act,
              }}
              onAccept={() => onAccept(n.id)}
              onDecline={() => onDecline(n.id)}
            />
          ))}
        </div>

        <div className="notif-footer">
          <button className="load-more" onClick={onLoadMore}>
            Voir plus
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

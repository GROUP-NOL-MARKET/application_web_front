import React from "react";

export default function NotificationItem({ item, onAccept, onDecline }) {
  return (
    <div
      className={`notif-item ${
        item.highlight ? "highlight" : ""
      } d-flex flex-column`}
    >
      <div className="row">
        <div className="col-4">
          <img
            className="notif-avatar img-fluid"
            src={item.avatar}
            alt={`${item.name} avatar`}
          />
        </div>

        <div className="notif-main">
          <div className="notif-top">
            <strong className="notif-name">{item.name}</strong>
            <small className="notif-time">{item.time}</small>
          </div>
          <div className="notif-text">{item.message}</div>
          {item.tag && <div className="notif-tag">{item.tag}</div>}
        </div>
        <div className="col-1">
          <input
            className="notif-checkbox"
            type="checkbox"
            aria-label={`Select ${item.name}`}
          />
        </div>
      </div>
      <div className="w-100">
        {item.canAct && (
          <div className="notif-actions row">
            <button
              className="d-flex align-items-center bg-primary rounded-5 col-3 me-3"
              style={{ color: "white" }}
              onClick={onAccept}
            >
              <span className="texte_brut">Accepter</span>
            </button>
            <button
              className=" bg-danger rounded-5 col-3 d-flex align-items-center"
              style={{ color: "white" }}
              onClick={onDecline}
            >
              <span className="texte_brut">Refuser</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

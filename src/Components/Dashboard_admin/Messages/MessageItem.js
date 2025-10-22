import React from "react";

export default function NotificationItem({ item }) {
  return (
    <div
      className={`message-item ${item.highlight ? "highlight" : ""
        } d-flex flex-column`}
    >
      <div className="row">
        <div className="col-4">
          <img
            className="message-avatar img-fluid"
            src={item.avatar}
            alt={`${item.name} avatar`}
          />
        </div>

        <div className="message-main">
          <div className="message-top">
            <strong className="message-name">{item.name}</strong>
            <small className="message-time">{item.time}</small>
          </div>
          <div className="message-text">{item.message}</div>
          {item.tag && <div className="message-tag">{item.tag}</div>}
        </div>
        <div className="col-1">
          <input
            className="message-checkbox"
            type="checkbox"
            aria-label={`Select ${item.name}`}
          />
        </div>
      </div>
    </div>
  );
}

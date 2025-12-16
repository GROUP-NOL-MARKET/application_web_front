import React, { useEffect} from "react";
import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";
import kiapay from "./assets/Images/kkiapay.png";
import { Button } from "react-bootstrap";

const KkiaPay = ({ amount, phone, email, name, disabled, onSuccess }) => {
  useEffect(() => {
    const handleSuccess = (data) => onSuccess && onSuccess(data);
    addKkiapayListener("success", handleSuccess);
    return () => removeKkiapayListener("success", handleSuccess);
  }, [onSuccess]);

  const handleClick = () => {
    if (disabled) return;
    openKkiapayWidget({
      amount,
      api_key: "461a5930ce9b11f09f4a631e834d10ba",
      sandbox: true,
      phone,
      email,
      name,
      request_id: "KKIA-" + Date.now(),
    });
  };

  return <Button className="bg-success w-100 rounded-5 border-0" onClick={handleClick}>KkiaPay <img src={kiapay} style={{ width: 20, cursor: "pointer" }}  alt="" /></Button> 
};


export default KkiaPay;

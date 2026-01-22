import { useEffect } from "react";
import {
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";

const KkiaPay = ({ onSuccess, onClose }) => {
  useEffect(() => {
    const successHandler = (data) => {
      console.log("Kkiapay success:", data);
      onSuccess?.(data);
    };

    const closeHandler = () => {
      onClose?.();
    };

    addKkiapayListener("success", successHandler);
    addKkiapayListener("failed", closeHandler);
    addKkiapayListener("close", closeHandler);

    return () => {
      removeKkiapayListener("success", successHandler);
      removeKkiapayListener("failed", closeHandler);
      removeKkiapayListener("close", closeHandler);
    };
  }, []);

  return null;
};

export default KkiaPay;
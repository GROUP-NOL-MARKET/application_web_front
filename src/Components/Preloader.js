import Lottie from "lottie-react";
import Animation from "../Components/animation/loading_gray.json";
import entreprise from "../Components/assets/Images/Logo_entreprise-removebg-preview.webp"

export default function Preloader() {
  return (
    <div
      style={{
        position: "fixed",
        backgroundColor: "#fcfcfc",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        lineHeight: "40px",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // reste au-dessus
      }}
    >
      <Lottie animationData={Animation} loop={true} style={{ width: 65, height: 65 }} />
      <img src={entreprise} alt="" style={{ width: 100 }} />
    </div>
  );
}

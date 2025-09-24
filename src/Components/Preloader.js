import Lottie from "lottie-react";
import Animation from "../Components/animation/anime.json"; // ton fichier Lottie

export default function Preloader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "white", // ou noir selon ton thème
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // reste au-dessus
      }}
    >
      <Lottie animationData={Animation} loop={true} style={{ width: 200, height: 200 }} />
    </div>
  );
}

import Lottie from "lottie-react";
import Animation from "../../Components/animation/loading_gray.json"; // ton fichier Lottie

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
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999, // reste au-dessus
            }}
        >
            <Lottie animationData={Animation} loop={true} style={{ width: 80, height: 80 }} />
        </div>
    );
}

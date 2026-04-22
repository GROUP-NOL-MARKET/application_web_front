import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        const userRaw = searchParams.get("user");
        const error = searchParams.get("error");

        if (error) {
            navigate("/login?error=" + error);
            return;
        }

        if (token && userRaw) {
            try {
                const user = JSON.parse(decodeURIComponent(userRaw));

                // Stockage JWT — même clé que ton auth classique
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                navigate("/dashboard");
            } catch (e) {
                navigate("/login?error=parse_error");
            }
        } else {
            navigate("/login?error=missing_params");
        }
    }, [searchParams, navigate]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <div className="spinner-border text-primary mb-3" role="status" />
                <p>Connexion en cours...</p>
            </div>
        </div>
    );
}
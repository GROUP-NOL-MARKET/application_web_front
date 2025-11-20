import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Preloader from "./Preloader";

const UserPrivateRoute = ({ children }) => {
    const { isLoggedIn,isAuthLoading } = useContext(AuthContext);
    if(isAuthLoading){
        return <Preloader/>
    }
    return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default UserPrivateRoute;





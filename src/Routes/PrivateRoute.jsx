import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login", { state: { from: location } });
        }
    }, [loading, user, navigate, location]);

    if (loading) {
        return <progress className="progress w-56"></progress>;
    }

    return user ? children : null;
};

export default PrivateRoute;

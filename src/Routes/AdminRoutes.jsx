import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdminOrCustomer from "../hooks/useAdminOrCustomer";


const AdminRoutes = ({children}) => {
    const {user} = useAuth();
    const [isAdminOrCustomer, isAdminOrCustomerLoading] = useAdminOrCustomer();
    const location = useLocation();
    if(isAdminOrCustomerLoading){
        return <progress className="progress w-56"></progress>;
    }
    if(user && isAdminOrCustomer?.isAdmin){
        return children;
    }

    return <Navigate to = "/" state={{from : location}}/>
};

export default AdminRoutes;
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdminOrCustomer from "../hooks/useAdminOrCustomer";



const CustomerRoutes = ({children}) => {
    const {user} = useAuth()
    const [isAdminOrCustomer, isAdminOrCustomerLoading] = useAdminOrCustomer();
    const location = useLocation();
    if(isAdminOrCustomerLoading){
        return <progress className="progress w-56"></progress>;
    }
    if(user && isAdminOrCustomer?.isCustomer){
        return children;
    }

    return <Navigate to = "/" state={{from : location}}/>
};

export default CustomerRoutes;
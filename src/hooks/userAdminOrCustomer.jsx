import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdminOrCustomer = () => {
    const {user, loading} = useAuth();
    const [instance] = useAxiosSecure();
    const {data: isAdminOrCustomer = false, isLoading:isAdminOrCustomerLoading } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !loading && !!user,
        queryFn: async () => {
            const res = await instance.get(`/users/${user?.email}`)
            console.log(res?.data);
            return res?.data
        }
    }) 
    return [isAdminOrCustomer, isAdminOrCustomerLoading];
};

export default useAdminOrCustomer;
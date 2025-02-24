import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { BiUserPin } from 'react-icons/bi';
import { FaUserShield } from 'react-icons/fa';
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";

const ManageUsers = () => {
    const [instance] = useAxiosSecure();
    const {isDarkMode} = useAuth();
    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async() => {
            const res = await instance('/users');
            // console.log(res?.data);
            return res?.data;
        }

    })
    
    const handleMakeAdmin = (user) => {
        event.preventDefault();
        Swal.fire({
            title: `Are you sure to make '${user.name}' admin?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes. Make admin.`
          }).then((result) => {
            if (result.isConfirmed) {
             instance.patch(`/users/${user._id}`, {role: 'Admin'})
             .then(res => {
                refetch()
                if(res?.data?.modifiedCount > 0){
                    Swal.fire(
                    'Succes!',
                    `${user.name} is an admin now.`,
                    'success'
                    )
                }
             });
           

            }
          })
    }
    const handleDeleteUser = (user) => {
        event.preventDefault();
        Swal.fire({
            title: `Are you sure to make to delete '${user.name}'?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, delete it.`
          }).then((result) => {
            if (result.isConfirmed) {
             instance.delete(`/users/${user._id}`)
             .then(res => {
                refetch()
                console.log(res?.data);
                if(res?.data?.deletedCount > 0){
                    Swal.fire(
                    'Succes!',
                    `${user.name} is an admin now.`,
                    'success'
                    )
                }
             });
           

            }
          })
    }
    return (
        // TODO: Implements Paginations
        <div className="w-full p-4">
            <h2 className="text-center text-3xl my-8 font-bold">All Users: {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr className={`${isDarkMode ? "text-white" : "text-black"}`}>
                        <th>
                        </th>
                        <th>#</th>
                        <th>User</th>
                        <th>Others</th>
                        <th>Role</th>
                        <th>Make Admin</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((user, index)=> <tr key={user._id}>
                            <td>
                                <button className={`btn btn-circle btn-outline `} onClick={() => handleDeleteUser(user)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </td>
                            <td>{index + 1}</td>
                            <td>
                            <div className="flex items-center space-x-3">
                                <div>
                                <div className="font-bold">{user.name}</div>
                                <div className="text-sm opacity-50">Email: {user.email}</div>
                                </div>
                            </div>
                            </td>
                            <td>
                               <span>Phone: {user?.phone || 'Not Mentiond'}</span> 
                            </td>
                            <td className="uppercase"> {user?.role}</td>
                            <td>
                                <button className={`btn bg-[#01a2a6] text-white
                                ${user.role === 'Admin'? 'btn-disabled' : ''} `}
                                onClick={() => handleMakeAdmin(user)}><FaUserShield className="w-6 h-6"/></button>
                            </td>
                        </tr>
                        )
                    }
                   
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
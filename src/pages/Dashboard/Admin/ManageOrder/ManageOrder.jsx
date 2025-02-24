import { BiTask } from "react-icons/bi";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageOrder = () => {
    const [instance] = useAxiosSecure();
    const {data: orders = [], refetch} = useQuery({
        queryKey: ['allOrders'],
        queryFn: async() => {
            const res = await instance('/allOrders')
            // console.log(res?.data);
            return res?.data
        }
    });
    const handleStatus = (oneOrder, status) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
          }).then((result) => {
            if (result.isConfirmed) {
            instance.patch(`/allOrders/${oneOrder._id}`, {status: status})
            .then(res => {
                // console.log(res?.data)
                if(res?.data?.modifiedCount > 0){
                    refetch();
                    Swal.fire(
                        'Success!',
                        'Status has been updated',
                        'success'
                      )
                }
            })
            }
          })
    }

    return (
        <div>
            {/* TODO: Implements Paginations */}
            <h2 className="text-center text-3xl font-semibold my-10">Number of Payments: {orders.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Transaction ID</th>
                        <th>Product Details</th>
                        <th>Customer Email</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Processing</th>
                        <th>Delivered</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        orders.map((oneOrder, index) => <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                        <div className="flex items-center space-x-3">
                            <div>
                            <div className="font-bold">{oneOrder.transactionId}</div>
                            </div>
                        </div>
                        </td>
                        <td>
                        <div className="text-sm opacity-50">{oneOrder.email}</div>
                        </td>
                        <td>
                        <div className="text-sm opacity-50">{oneOrder.price}</div>
                        </td>
                        <td>
                            {
                                oneOrder.productName.map((item,ind) => <span key={ind}>{item.name} - {item.quantity}</span>)
                            }
                        </td>
                        <td className="uppercase">{oneOrder.status}</td>
                        <td>
                            <button className={`btn bg-yellow-700
                             text-white ${oneOrder.status === 'Processing' || oneOrder.status === 'Delivered'
                             ? 'btn-disabled td-btn' : ''} 
                             `}
                             onClick={() => handleStatus(oneOrder, 'Processing')}><BiTask className="w-6 h-6"/></button>
                        </td>
                        <td>
                            <button className={`btn bg-red-600
                             text-white ${oneOrder.status === 'Confirmed' || oneOrder.status === 'Delivered'
                             ? 'btn-disabled' : ''} `} onClick={() => handleStatus(oneOrder, 'Delivered')}><BiTask className="w-6 h-6"/></button>
                        </td>
                    </tr>)
                    }
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrder;
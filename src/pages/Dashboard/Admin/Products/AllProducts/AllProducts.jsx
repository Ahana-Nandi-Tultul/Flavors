import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import useAuth from '../../../../../hooks/useAuth';
import { FaRegEdit } from 'react-icons/fa';
import UpdateItemModal from './UpdateItemModal';
import { MdDeleteForever } from 'react-icons/md';
import { IoIosAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllProducts = () => {
    const [instance] = useAxiosSecure();
    const {user} = useAuth();
    const [openUpdateItemModal, setOpenUpdateItemModal] = useState(false);
    const [itemUpdate, setItemUpdate] = useState({});
    const navigate = useNavigate();
    const {data: items = [], refetch} = useQuery({
        queryKey: ['adminAllItems', user?.email],
        queryFn: async() => {
            const res = await instance(`/adminAllItems/${user?.email}`)
            //console.log(res?.data);
            return res?.data
        }
    })
    //console.log(items);
    const handleOpenUpdateItem = (item) => {
        event.preventDefault();
        setOpenUpdateItemModal(true);
        setItemUpdate(item);
    }
    const handleItemUpdate = (item) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const price = form.price.value;
        const quantity = form.quantity.value;

        const updateInfo = {name, price, quantity};
        // console.log(updateInfo);

        instance.patch(`/updateProduct/${item._id}`, {updateInfo})
        .then(res => {
            // console.log(res?.data)
            if(res?.data?.modifiedCount > 0){
                refetch();
                setOpenUpdateItemModal(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Successfully! Your feedback has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        });
    }
        const handleDeleteItem = (item) => {
            event.preventDefault();
            Swal.fire({
                title: `Are you sure to make to delete '${item.name}'?`,
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: `Yes, delete it.`
            }).then((result) => {
                if (result.isConfirmed) {
                instance.delete(`/product/${item._id}`)
                .then(res => {
                    refetch()
                    console.log(res?.data);
                    if(res?.data?.deletedCount > 0){
                        Swal.fire(
                        'Succes!',
                        `${item.name} is deleted.`,
                        'success'
                        )
                    }
            });
           
        }
    });

}
const handleAddItem = () => {
    navigate('/dashboard/adminAddItem');
};
    return (
        <div>
            <h2 className="text-center text-3xl font-semibold my-10">All Items: {items.length}</h2>
            <button onClick={() => handleAddItem()} className={`btn bg-[#236413] text-white mb-8`}>Add Item<IoIosAdd className="w-6 h-6"/></button>
            <div className="overflow-x-auto overflow-y-auto" style={{height: "700px"}}>
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr className={``}>
                        <th>#</th>
                        <th>Name</th>
                        <th>Available Quantity</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Rating</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.map((item, index) => <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                        <div className="flex items-center space-x-3">
                            <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                            </div>
                            </div>
                            <div>
                            <div className="font-bold">{item.name}</div>
                            </div>
                        </div>
                        </td>
                        <td>{item.quantity}</td>
                        <td className="text-left">${item.price}</td>
                        <td>{item.category}</td>
                        <td className="uppercase">{item.rating}</td>
                        <td>
                            <button onClick={() => handleOpenUpdateItem(item)}
                            className={`btn bg-[#2ccf31] text-white`}><FaRegEdit className="w-6 h-6"/></button>
                        </td>
                        <td>
                            <button onClick={() => handleDeleteItem(item)}
                            className={`btn bg-[#f02727] text-white`}><MdDeleteForever className="w-6 h-6"/></button>
                        </td>
                    </tr>)
                    }
                    
                    </tbody>
                </table>
            </div>
            <UpdateItemModal
            itemUpdate = {itemUpdate}
            handleItemUpdate = {handleItemUpdate}
            openUpdateItemModal = {openUpdateItemModal}
            setOpenUpdateItemModal = {setOpenUpdateItemModal}
            >
            </UpdateItemModal>
        </div>
    );
};

export default AllProducts;
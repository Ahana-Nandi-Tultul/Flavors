import React, { useEffect, useState } from 'react';
import useItems from '../../../hooks/useItems';
import { useNavigate, useParams } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { FaArrowLeft } from 'react-icons/fa';
import CartInput from '../../../components/cartInput/CartInput';

const ItemDetails = () => {
    const idObj = useParams();
    const id = idObj.id;
    const [items] = useItems();
    //console.log(items);
    const [item, setItem] = useState({});
    const [open, setOpen] = useState(true); // Added state to toggle visibility

    useEffect(() => {
        const fetchItem = () => {
            const foundItem = items.find(item => item._id === id);
            if (foundItem) {
                setItem(foundItem);
            } else {
                console.error('Item not found');
            }
        };
        fetchItem();
    }, [id, items]);

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
        setOpen(!open); // Toggle the visibility
    };
    const handleClose = () => {
        navigate('/');
        setOpen(!open); // Toggle the visibility
    };

    //console.log(item);
    const { name, description, image, quantity, category, rating, price, tags } = item;

    return (
        <div className={`fixed inset-0 z-50 ${open ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="fixed inset-0 flex justify-center items-center">
                <div className="bg-white p-6 rounded shadow-lg w-5/6">
                    <div className="card card-side flex flex-col md:flex-row bg-base-100 shadow-xl overflow-y-scroll">
                        <figure><img src={image} alt="Item" className='h-full' style={{width: "100%", height: "400px"}} /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{name}</h2>
                            <hr />
                            <p>Price: ${price}</p>
                            <p>Available Quantity: {quantity}</p>
                            <p>Sub-Category: {category}</p>
                            <p>Description: {description}</p>
                            <div className="card-actions md:flex justify-between items-center">
                               <CartInput item = {item}></CartInput>
                            </div>
                            <hr />
                            <div className="card-actions md:flex justify-between mt-5 items-center">
                                <div className='flex items-center'>
                                    <Rating
                                        style={{ maxWidth: 100 }}
                                        value={Math.round(rating)}
                                        readOnly
                                    />
                                    <span className='ml-2'>{rating}</span>
                                </div>
                                <div>
                                    <button className="btn bg-[#f5b48e] text-dark mr-4" onClick={handleBack}>
                                        <FaArrowLeft /> Back
                                    </button>
                                    <button className="btn btn-primary" onClick={handleClose}> Close </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;

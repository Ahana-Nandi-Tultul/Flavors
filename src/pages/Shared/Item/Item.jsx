import React from 'react';
import { useNavigate } from 'react-router-dom';

const Item = ({ item }) => {
    const navigate = useNavigate();
    const handleNavigate = (id) => 
        {
            navigate(`/item/${id}`)
        } 
    return (
        <div>
            <div className="card bg-base-100 shadow-xl">
                <figure><img src={item.image} alt="Shoes" style={{ height: "200px", width: "100%" }} /></figure>
                <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <p></p>
                    <div className="flex items-center w-full justify-between">
                            <p>${item.price}</p>
                        <button onClick={() =>  handleNavigate(item._id)} className="btn bg-[#2ccf31]">View Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;
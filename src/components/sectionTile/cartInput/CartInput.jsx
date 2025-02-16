import React, { useState } from 'react';
import { FaCartArrowDown } from "react-icons/fa";

const CartInput = () => {
    const [quantity, setQuantity] = useState(1); 

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1); 
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <div className='items-center md:flex gap-3'>
            <button 
                className="btn btn-primary" 
                onClick={handleDecrease}
                disabled={quantity <= 1} 
            >
                -
            </button>
            <input 
                type="text" 
                value={quantity} 
                readOnly
                className="input input-bordered w-full max-w-xs" 
            />
            <button 
                className="btn btn-primary" 
                onClick={handleIncrease}
            >
                +
            </button>
            <button className="btn btn-success mr-auto ">
                Add To Cart <FaCartArrowDown className="ml-3" />
            </button>
        </div>
    );
};

export default CartInput;

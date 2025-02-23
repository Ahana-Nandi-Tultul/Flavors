import React, { useState } from 'react';
import { FaCartArrowDown } from "react-icons/fa";
import useCartUtilities from '../../utilities/cartAndWishList';

const CartInput = ({item}) => {
    const [quantity, setQuantity] = useState(1); 
    const { addToCart } = useCartUtilities();
    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1); 
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleAddToCart = (item) => {
        const { _id, name, image, price } = item;
        const totalQuantity = price * quantity;
    
        const newItem = {
            id: _id,
            name, 
            image, 
            price, 
            quantity, 
            totalQuantity
        };

        console.log("Adding to cart:", newItem);  
        addToCart(newItem);
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
            <button className="btn btn-success mr-auto " onClick={() => handleAddToCart(item)}>
                Add To Cart <FaCartArrowDown className="ml-3" />
            </button>
        </div>
    );
};

export default CartInput;

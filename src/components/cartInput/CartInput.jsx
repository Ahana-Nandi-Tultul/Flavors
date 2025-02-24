import React, { useState } from 'react';
import { FaCartArrowDown } from "react-icons/fa";
import useCartUtilities from '../../utilities/cartAndWishList';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CartInput = ({ item }) => {
  const [quantity, setQuantity] = useState(1); 
  const { addToCart } = useCartUtilities();
  const navigate = useNavigate();

  const handleIncrease = () => {
    setQuantity(quantity => quantity + 1); 
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity => quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const { _id, name, image, price } = item;
    const totalPrice = price * quantity;
    
    const newItem = {
      _id,
      name, 
      image, 
      price, 
      quantity, 
      totalPrice
    };

    console.log("Adding to cart:", newItem);  
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your Product is added to Cart. Please see "Cart"',
        showConfirmButton: false,
        timer: 1500,
      });
      addToCart(newItem); 
      navigate('/');
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
      <button className="btn btn-success mr-auto" onClick={handleAddToCart}>
        Add To Cart <FaCartArrowDown className="ml-3" />
      </button>
    </div>
  );
};

export default CartInput;

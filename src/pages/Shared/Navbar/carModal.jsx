import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import useCartUtilities from "../../../utilities/cartAndWishList";
import { Link, useNavigate } from "react-router-dom";


const CartModal = ({ isOpen, onClose, user }) => {
  const [cartItems, setCartItems] = useState([]);
  const {getCartItems, syncLocalStorageWithDB, removeItemFromCart} = useCartUtilities()
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCart = async () => {
      const storedCart = await getCartItems(user);
      setCartItems(storedCart);
    };
    fetchCart();
  }, [user]);

  useEffect(() => {
    if (user && cartItems.length > 0) {
      syncLocalStorageWithDB(user, cartItems);
    }
  }, [user]);

  const removeFromCart = (id) => {
    console.log(id);
    removeItemFromCart(id, user);
    navigate("/dashboard/order", { replace: true });
    // setCartItems((prevCart) => {
    //   const updatedCart = prevCart.filter((item) => item.id !== id);
    //   localStorage.setItem("cart", JSON.stringify(updatedCart));
    //   return updatedCart;
    // });
  };
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 my=20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative ">
        <button className="absolute top-3 right-3 text-xl" onClick={onClose}>
          <IoMdClose />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
        {cartItems.length > 0 ? (
          <ul className="space-y-3">
            {cartItems.map((item) => (
              <li key={item._id} className="flex justify-between items-center border p-2 rounded">
                <p>{item.name} - ${item.price}</p>
                <p>Total: ${item.totalPrice}</p>
                <button className="text-red-500" onClick={() => removeFromCart(item._id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
        <Link to = "/dashboard/order"
          className="btn bg-[#2ccf31] text-white w-full mt-4 py-2 rounded disabled:opacity-50"
          disabled={cartItems.length === 0} 
          
        >
          Order Now
        </Link>
      </div>
    </div>
  );
};

export default CartModal;

import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const WishlistModal = ({ isOpen, onClose, user, syncWishlistWithDB }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(storedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  useEffect(() => {
    if (user) {
      syncWishlistWithDB(wishlistItems);
    }
  }, [user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
        <button className="absolute top-3 right-3 text-xl" onClick={onClose}>
          <IoMdClose />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Wishlist</h2>
        {wishlistItems.length > 0 ? (
          <ul className="space-y-3">
            {wishlistItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center border p-2 rounded">
                <span>{item.name}</span>
                <button className="text-red-500" onClick={() => removeFromWishlist(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default WishlistModal;

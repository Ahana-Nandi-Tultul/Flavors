import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { Elements } from "@stripe/react-stripe-js";
import useCartUtilities from "../../../../utilities/cartAndWishList";
import { loadStripe } from "@stripe/stripe-js";

const Payments = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const { getCartItems } = useCartUtilities();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const storedCart = await getCartItems(user);
        setCartItems(storedCart);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      }
    };
    fetchCart();
  }, [user, cartItems]);

  const totalPrice = cartItems.reduce((sum, item) => (item.totalPrice  || 0) + sum, 0);
  const price = parseFloat(totalPrice.toFixed(2));
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-2/3 p-4">
      <h2 className="text-center text-3xl font-semibold my-10">Complete Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm cartItems={cartItems} price={price} />
      </Elements>
    </div>
  );
};

export default Payments;

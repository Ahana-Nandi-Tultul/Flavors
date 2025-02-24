import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ cartItems, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const { user } = useAuth();
    const [instance] = useAxiosSecure();
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchClientSecret = async () => {
        try {
          const res = await instance.post('/create-payment-intent', { price });
          if (res?.data?.clientSecret) {
            setClientSecret(res?.data?.clientSecret);
          } else {
            setCardError('Failed to retrieve client secret');
          }
        } catch (error) {
          setCardError('Error fetching client secret');
        }
      };
  
      fetchClientSecret();
    }, []);

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!stripe || !elements) {
        return;
      }
  
      const card = elements.getElement(CardElement);
  
      if (card == null) {
        return;
      }
  
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        setCardError(error.message);
      } else {
        setCardError('');
      }
  
      const { paymentIntent, confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'anonymous',
            email: user?.email || 'unknown',
          },
        },
      });
      
      if (confirmError) {
        setCardError(confirmError.message || 'Payment confirmation failed.');
        
      }
      setProcessing(true);
      if (paymentIntent.status === 'succeeded') {
        setProcessing(false);
        setTransactionId(paymentIntent.id);
  
        // Save payment info to server
        const payment = {
          email: user?.email,
          transactionId: paymentIntent.id,
          price,
          date: new Date(),
          cartItems: cartItems.map(item => item._id),
          productId: cartItems.map(item => ({
            id: item.productId,
            quantity: item.quantity
            
          })),
          status: 'Confirmed',
          productName: cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity
            
          })),
        };

        instance.post('/payments', payment).then((res) => {
          console.log(res?.data);
          if (res?.data?.insertResult?.insertedId) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Thank you for your payment.',
              showConfirmButton: false,
              timer: 1500,
            });

            navigate('/dashboard/order')
          }
        });
  
        
      }
    };
  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={processing || !stripe}
            className="btn my-8 bg-[#01a2a6] text-white"
          >
            {processing ? 'Processing...' : 'Pay'}
          </button>
          {cardError && <p className="text-red-500"><small>{cardError}</small></p>}
          {transactionId && <p className="text-[#01a2a6]"><small>Your Transaction Id: {transactionId}</small></p>}
        </form>
      </>
    );
  };
  
  export default CheckoutForm;
  
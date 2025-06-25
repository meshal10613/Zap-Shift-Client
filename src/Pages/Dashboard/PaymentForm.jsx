import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { MdError } from "react-icons/md";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        setError("");
        if(!stripe || !elements){
            return;
        };

        const card = elements.getElement(CardElement);
        if(card == null){
            return;
        };

        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            setError("");
            console.log('[PaymentMethod]', paymentMethod);
        }
    };


    // hello world

    return (
        <div className='p-10'>
            <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto '>
                <CardElement 
                    className='p-2 border rounded'
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
                <button type="submit" className="btn btn-primary w-full" disabled={!stripe}>
                    Pay
                </button>
                {
                    error && 
                    <p className='text-red-500 text-center flex items-center justify-center gap-1'><MdError size={20}/>{error}</p>
                }
            </form>

        </div>
    );
};

export default PaymentForm;
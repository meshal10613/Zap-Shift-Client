import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { MdError } from "react-icons/md";
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Loading';
import Swal from 'sweetalert2';
import useTrackingLogger from '../../Hooks/useTrackingLogger';
import useAuthContext from '../../Hooks/useAuthContext';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {id} = useParams();
    const {logTracking} = useTrackingLogger();
    const {user} = useAuthContext();

    const { isPending, data : parcel = {} } = useQuery({
        queryKey: ["parcel", id],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcels/${id}`);
            return res.data;
        }
    });
    const amount = parcel?.cost;
    const amountInCents = amount * 100;

    if(isPending){
        <Loading/>
    };

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
            setError(error.message)
        } else {
            setError("");
            console.log('[PaymentMethod]', paymentMethod);

            //step-2: create payment intent
            const res = await axiosSecure.post(`/create-payment-intent`, {
                amountInCents,
                id
            });
            const clientSecret = res.data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: parcel?.senderName,
                        email: parcel?.created_by,
                    }
                }
            });

            if(result.error){
                setError(result.error.message)
            }else{
                setError("");
                if(result.paymentIntent.status === 'succeeded'){
                    console.log("Payment Succeeded!");
                    console.log(result)
                    // step-4: mark parcel paid also create payment history
                    const paymentData = {
                        id,
                        email: parcel?.created_by,
                        amount,
                        transactionId: result.paymentIntent.id,
                        paymentMethod: result.paymentIntent.payment_method_types,
                    };  
                    const paymentRes = await axiosSecure.post("/payments", paymentData);
                    if(paymentRes.data.insertedId){
                        // ✅ Show SweetAlert with transaction ID
                        await Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            html: `<strong>Transaction ID:</strong> <code>${result.paymentIntent.id}</code>`,
                            confirmButtonText: 'Go to My Parcels',
                        });

                        await logTracking({
                            tracking_id: parcel.tracking_id,
                            status: "payment_done",
                            details: `Paid by ${user.displayName}`,
                            updated_by: user.email,
                        });

                        // ✅ Redirect to /my-parcels
                        navigate('dashboard/my-parcels');
                    }
                }
            }
        }

    };

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
                <button type="submit" className="btn btn-primary text-secondary w-full" disabled={!stripe}>
                    Pay ৳{amount}
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
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { id: parcelId } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const { isLoading, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    });

    if (isLoading) return <p>Loading payment info...</p>;

    const amount = parcelInfo.cost ?? 0;
    const amountInCents = amount * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        setIsProcessing(true);

        const { error: paymentError } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentError) {
            setError(paymentError.message);
            setIsProcessing(false);
            return;
        }

        try {
            const res = await axiosSecure.post('/create-payment-intent', { amountInCents, parcelId });
            const clientSecret = res.data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: user.displayName || 'Anonymous',
                        email: user.email,
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
                setIsProcessing(false);
                return;
            }

            if (result.paymentIntent.status === 'succeeded') {
                const transactionId = result.paymentIntent.id;

                const paymentData = {
                    parcelId,
                    email: user.email,
                    amount,
                    transactionId,
                    paymentMethod: result.paymentIntent.payment_method_types,
                };

                const paymentRes = await axiosSecure.post('/premiumArticles', paymentData);

                if (paymentRes.data.insertedId) {
                    // Update localStorage user with premiumTaken
                    const currentUser = JSON.parse(localStorage.getItem('user')) || {};
                    currentUser.premiumTaken = paymentRes.data.premiumTaken;
                    localStorage.setItem('user', JSON.stringify(currentUser));

                    await Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                        confirmButtonText: 'Go to Premium Articles',
                    });

                    navigate('/premiumArticles');
                } else {
                    setError('Failed to record payment on server.');
                }
            }
        } catch (err) {
            console.error(err);
            setError(err.message || 'Payment processing error');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-green-800 text-center">Complete Your Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <label className="block text-green-700 font-medium mb-2">Credit or Debit Card</label>
                <div className="p-3 border rounded-md bg-gray-50">
                    <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className={`w-full py-3 rounded-md text-white font-semibold transition ${!stripe || isProcessing ? 'bg-green-300 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800'}`}
                >
                    {isProcessing ? 'Processing...' : `Pay $${amount}`}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;

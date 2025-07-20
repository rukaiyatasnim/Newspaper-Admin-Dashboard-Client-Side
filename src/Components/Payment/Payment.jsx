import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

// Load your Stripe publishable key from env variables
const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
};

export default Payment;

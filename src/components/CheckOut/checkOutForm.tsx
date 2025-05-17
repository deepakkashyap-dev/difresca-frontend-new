import React, { useState, useRef } from 'react';
import { CardElement, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { IoCardOutline } from 'react-icons/io5';
import { FaIdeal, FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';
import { AiOutlineAlipay, AiFillBank } from 'react-icons/ai';
import { SiPaytm, SiGooglepay, SiPhonepe } from 'react-icons/si';



const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment-success`, // Optional
            },
            redirect: 'if_required', // Optional for same-page
        });

        if (error) {
            console.error(error.message);
        } else if (paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement
                options={{
                    layout: 'tabs',
                    paymentMethodOrder: ['card', 'au_becs_debit', 'apple_pay', 'google_pay'],
                }} />
            <button
                type="submit"
                disabled={!stripe}
                className="btn btn-primary mt-4"
            >
                Pay Now
            </button>
        </form>
    );
};

export default CheckoutForm;

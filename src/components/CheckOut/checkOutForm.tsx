import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Loader } from './../shared';

interface CheckoutFormProps {
    amount: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Ensure elements and stripe are loaded
        if (!stripe || !elements) {
            setError('Payment form is not ready. Please try again in a moment.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { error: submitError, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-success`,
                },
                redirect: 'if_required',
            });
            console.log('Payment response:', { submitError, paymentIntent });
            if (submitError) {
                setError(submitError.message || 'Payment failed');
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {

                console.log('Payment succeeded!');
            }
        } catch (err) {
            console.log("err", err)
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader className='flex justify-center items-center min-h-screen' />;
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement />

            {error && (
                <div className="text-red-600 text-sm">{error}</div>
            )}

            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {loading ? 'Processing...' : `Pay $${amount} Now`}
            </button>
        </form>
    );
};

export default CheckoutForm;

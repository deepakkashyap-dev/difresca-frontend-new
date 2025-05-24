import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import successAnim from '../../assets/animations/animation_payment_success.json';
import processingAnim from '../../assets/animations/animation_payment_processing_2.json';
import failAnim from '../../assets/animations/animation_payment_failed.json';
import { showToast } from '../../store/ui';
import { useAppDispatch, useAppSelector } from '../../hooks';


interface CheckoutFormProps {
    amount: number;
    clientSecret?: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount, clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>(
        'idle'
    );
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Ensure elements and stripe are loaded
        if (!stripe || !elements) {
            setError('Payment form is not ready. Please try again in a moment.');
            return;
        }

        setLoading(true);
        setError(null);
        setPaymentStatus('processing');

        try {
            const { error: submitError, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-success`,
                },
                redirect: 'if_required',
            });
            if (submitError) {
                dispatch(showToast({ type: 'error', message: submitError.message || 'Payment failed' }));
                setError(submitError.message || 'Payment failed');
                setPaymentStatus('error');
                setTimeout(() => {
                    setPaymentStatus('idle');
                    navigate('/');
                }, 3000);
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                setPaymentStatus('success');
                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 3000);
            }
        } catch (err) {
            console.error('Error during payment confirmation:', err);
            setError('An unexpected error occurred');

        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {clientSecret ? (
                <PaymentElement
                    options={{
                        layout: 'tabs',
                        paymentMethodOrder: ['card', 'au_becs_debit', 'apple_pay', 'google_pay'],
                    }}
                />
            ) : (
                <div>Loading payment form...</div>
            )}
            {error && (
                <div className="text-red-600 text-sm">{error}</div>
            )}

            <button
                type="submit"
                // disabled={!stripe || loading}
                disabled={!stripe || !elements || loading}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {loading ? 'Processing...' : `Pay $${amount} Now`}
            </button>
            {paymentStatus !== 'idle' && (
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/90 z-50">
                    <div className={paymentStatus === 'processing' ? "w-64 h-64 " : "w-96 h-96 "}>
                        <Lottie
                            animationData={
                                paymentStatus === 'success'
                                    ? successAnim
                                    : paymentStatus === 'processing'
                                        ? processingAnim
                                        : paymentStatus === 'error'
                                            ? failAnim
                                            : null
                            }
                            loop={paymentStatus === 'processing'}
                            autoplay
                        />
                    </div>
                    {paymentStatus === 'processing' && (
                        <h3>Please do not refresh or close this page. Your payment is being processed securely.</h3>
                    )}
                </div>
            )}
        </form>
    );
};

export default CheckoutForm;

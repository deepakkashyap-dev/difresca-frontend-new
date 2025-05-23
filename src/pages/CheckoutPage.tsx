import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckOut/checkOutFOrm';
import { getCheckoutSessionApi, createPaymentIntentApi } from '../utils/Api/AppService/checkoutApi';
import { CheckoutSessionType } from '../utils/types';
import { Loader } from '../components/shared'
import { showToast } from '../store/ui';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');


const CheckoutPage = () => {
    const [checkoutSession, setCheckoutSession] = useState<CheckoutSessionType | null>(null);
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const createCheckoutSession = async () => {
            try {
                const data: CheckoutSessionType = await getCheckoutSessionApi();
                setCheckoutSession(data);

                if (data.checkout_session_id && data.total) {
                    const amount = Math.round(Number(data.total));
                    const paymentData = await createPaymentIntentApi({
                        checkout_session_id: data.checkout_session_id,
                        amount: amount
                    });
                    setClientSecret(paymentData.clientSecret);
                }
            } catch (error) {
                if (error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object' && 'error' in error.data) {
                    dispatch(showToast({ type: 'error', message: error.data.error }));
                } else {
                    console.error('Error in checkout process:', error);
                }
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        createCheckoutSession();
    }, []);

    const appearance = {
        theme: 'stripe' as const,
        variables: {
            colorPrimary: '#10B981',
        }
    };

    const options = {
        clientSecret,
        appearance
    };

    if (loading) return <Loader className='flex justify-center items-center min-h-screen' />;
    if (!checkoutSession) return <div className="text-center p-4">Checkout session not found</div>;
    if (!checkoutSession.items?.length) return <div className="text-center p-4">No items in the cart</div>;

    return (
        <div className="min-h-screen bg-green-50 p-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Payment Gateway Section */}
                <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
                    <h2 className="text-2xl font-bold mb-6 text-green-700">Payment Information</h2>
                    {clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm amount={Number(checkoutSession.total)} />
                        </Elements>
                    )}

                    {/* Address Section */}
                    <div className="bg-green-100 rounded-xl p-4 mt-8">
                        <h3 className="text-xl font-bold text-green-700 mb-2">Delivery Address</h3>
                        <p className="text-gray-700">John Doe</p>
                        <p className="text-gray-700">123 Green Street, Garden City</p>
                        <p className="text-gray-700">New Delhi, India - 110001</p>
                        <p className="text-gray-700">Phone: +91 9876543210</p>
                    </div>
                </div>

                {/* Cart Summary Section */}
                <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
                    <h2 className="text-2xl font-bold mb-4 text-green-700">Your Cart</h2>
                    <div className="flex-1 overflow-y-auto space-y-4 max-h-96 pr-2">
                        {checkoutSession.items?.map((item: any, index: React.Key | null | undefined) => (
                            <div key={index} className="border rounded-lg p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <img src={item.product_image} alt="Fresh Apples" className="w-16 h-16" />
                                    <div>
                                        <p className="font-semibold">{item.product_name}</p>
                                        <p className="text-sm text-gray-500">{item.unit} {item.unit_type}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-semibold">$ {item.total_price}</p>
                            </div>
                        ))}
                    </div>
                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between font-bold text-lg mb-4">
                            <span>Total</span>
                            <span>${checkoutSession.total}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
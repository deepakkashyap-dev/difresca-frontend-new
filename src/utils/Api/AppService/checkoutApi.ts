import axiosInstance from '../config';
import { checkout } from '../collections';

const getCheckoutSessionApi = async () => {
    try {
        const response = await axiosInstance.post(checkout.CHECKOUT_SESSION, {}, { loader: true });
        return response.data;
    } catch (error: any) {
        throw error.response;
    }
};

const createPaymentIntentApi = async (payload: { amount: number; checkout_session_id: string }) => {
    try {
        const response = await axiosInstance.post(checkout.CREATE_PAYMENT_INTENT, {
            amount: payload.amount,
            currency: 'aud',
            payment_method_types: ['card'],
            checkout_session_id: payload.checkout_session_id
        }, { loader: true });
        return response.data;
    } catch (error: any) {
        throw error.response;
    }
};



export { getCheckoutSessionApi, createPaymentIntentApi };
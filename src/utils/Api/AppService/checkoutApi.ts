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

const createPaymentIntentApi = async (payload: any) => {
    try {
        const response = await axiosInstance.post(checkout.CREATE_PAYMENT_INTENT, { ...payload }, { loader: true });
        return response.data;
    } catch (error: any) {
        throw error.response;
    }
};



export { getCheckoutSessionApi, createPaymentIntentApi };
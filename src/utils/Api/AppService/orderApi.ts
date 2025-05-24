import axiosInstance from '../config';
import { order } from '../collections';

const getOrderListApi = async (payload: any) => {
    try {
        const response = await axiosInstance.post(order['GET_ORDER_LIST'], { ...payload }, { loader: true });
        return response.data;
    } catch (error: any) {
        throw error.response;
    }
};


export { getOrderListApi };
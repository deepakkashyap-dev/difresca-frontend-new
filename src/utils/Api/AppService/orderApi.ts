import axiosInstance from '../config';
import { order } from '../collections';

const getOrderListApi = async () => {
    try {
        const response = await axiosInstance.get(order['GET_ORDER_LIST']);
        return response.data;
    } catch (error: any) {
        throw error.response;
    }
};


export { getOrderListApi };
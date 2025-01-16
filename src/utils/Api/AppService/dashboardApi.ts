import axiosInstance from '../config';
import { dashboard } from '../collections';

const getHomepageBlock = async () => {
    try {
        return await axiosInstance.get(dashboard['GET_DASHBOARD_BLOCKS']);
    } catch (error) {
        console.error('Error fetching homepage block:', error);
        throw error;
    }
};

export { getHomepageBlock };
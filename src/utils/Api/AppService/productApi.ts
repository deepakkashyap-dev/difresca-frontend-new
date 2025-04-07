import axiosInstance from '../config';
import { product } from '../collections';

const searchProductApi = async (keyword: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`${product.SEARCH_PRODUCT}?keyword=${keyword}`); //&limit=5&offset=5
        return response.data;
    } catch (error: any) {
        throw error.response;
    }
}

const getProductsBySubCategoryApi = async (id: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`${product.GET_PRODUCT_BY_SUB_CATEGORY}?id=${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response;
    }
}

const getProductsByDealApi = async (id: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`${product.GET_PRODUCT_BY_DEAL_ID}?id=${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response;
    }
}

const getProductsByIdApi = async (id: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`${product.GET_PRODUCT_BY_ID}?id=${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
}

export { searchProductApi, getProductsBySubCategoryApi, getProductsByDealApi, getProductsByIdApi };
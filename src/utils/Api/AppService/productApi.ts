import axiosInstance from '../config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { product } from '../collections';

const searchProductApi = async (keyword: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`${product.SEARCH_PRODUCT}?keyword=${keyword}`); //&limit=5&offset=5
        return response.data;
    } catch (error) {
        throw error;
    }
}

const getProductsBySubCategoryApi = async (id: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`${product.GET_PRODUCT_BY_SUB_CATEGORY}?subcategory=${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export { searchProductApi, getProductsBySubCategoryApi };
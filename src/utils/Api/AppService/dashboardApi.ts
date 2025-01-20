import axiosInstance from '../config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { dashboard } from '../collections';

// Async thunk for fetching homepage data
const getHomepageBlock = createAsyncThunk('homepage/fetchHomepageData', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(dashboard['GET_DASHBOARD_BLOCKS']);
        return response.data; 
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to fetch homepage data');
    }
}
);


// Async thunk for fetching category data
const fetchCategoryData = createAsyncThunk('homepage/fetchCategoryData', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(dashboard['GET_CATEGORY_DATA']);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to fetch homepage data');
    }
});

export { getHomepageBlock, fetchCategoryData };
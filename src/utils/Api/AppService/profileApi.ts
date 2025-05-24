

import axiosInstance from '../config';
import { profile } from '../collections';
import { createAsyncThunk } from '@reduxjs/toolkit';

const addAddressApi = async (payload: any) => {
    try {
        const response = await axiosInstance.post(profile['ADDRESS'], { ...payload }, { loader: true });
        return response.data;
    } catch (error: any) {
        throw error.response;
    }
};

const getAddressListApi = createAsyncThunk('account/getAddressListApi', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(profile['ADDRESS']);
        return response.data;  // This will be stored in Redux state
    } catch (error: any) {
        console.log(error.response, "error.response add address")
        return rejectWithValue(error.response?.data || 'Failed to add address');
    }
});

const updateAddressApi = createAsyncThunk('account/updateAddressApi', async ({ payload, address_id }: { payload: any, address_id: number; }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(profile['ADDRESS'] + address_id, { ...payload }, { loader: true });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed  to update address');
    }
});

const deleteAddressApi = createAsyncThunk('account/deleteAddressApi', async ({ address_id }: { address_id: number; }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(profile['ADDRESS'] + address_id);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to delete address');
    }
});

export { addAddressApi, getAddressListApi, updateAddressApi, deleteAddressApi };
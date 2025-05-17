import axiosInstance from '../config';
import { shipping } from '../collections';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getLocationApi = async (lat: number, lng: number) => {
    try {
        const response = await axiosInstance.get(`${shipping.GET_LOCATION_ADDRESS}?lat=${lat}&lng=${lng}`); //&limit=5&offset=5
        return response.data;
    } catch (error: any) {
        throw error.response;
    }
};

const getAddressSuggestionsApi = async (keyword: string) => {
    try {
        const response = await axiosInstance.get(`${shipping.GET_LOCATION_SUGGESTIONS}?keyword=${keyword}&limit=5&offset=5`); //&limit=5&offset=5
        return response.data;
    }
    catch (error: any) {
        throw error.response;
    }
}

const getAddressCordinatedApi = async (place_id: string) => {
    try {
        const response = await axiosInstance.get(`${shipping.GET_LOCATION_COORDINATED}?place_id=${place_id}`); //&limit=5&offset=5
        return response.data;
    } catch (error: any) {
        throw error.response;
    }
}

const getDeliveryCharges = createAsyncThunk(
    "cart/deliveryCharges",
    async (
        { address_id }: { address_id: any },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.post(shipping.UPDATE_DEFAULT_ADDRESS, { address_id }, { loader: true });
            return response.data; // This will be stored in Redux state
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch delivery charges"
            );
        }
    }
);

export { getLocationApi, getAddressSuggestionsApi, getAddressCordinatedApi, getDeliveryCharges };
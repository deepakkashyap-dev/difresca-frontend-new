import axiosInstance from '../config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { cart } from '../collections';

// Async thunk for fetching cart

// Fetch cart items from API (user cart)
const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(cart['FETCH_CART']);
        return response.data // This will be stored in Redux state
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to fetch cart");
    }
});

const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity = 1 }: any, { dispatch, rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(cart['ADD_TO_CART'], { productId, quantity });
        return response.data;  // This will be stored in Redux state
    } catch (error: any) {
        console.log(error.response?.data, "error.response?.data add to cart")
        return rejectWithValue(error.response?.data || 'Failed to add product in cart');
    }
});

const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async ({ cartItemId, quantity = 1 }: { cartItemId: number; quantity?: number }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(cart['REMOVE_FROM_CART'], {
                cart_item_id: cartItemId,
                // quantity
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to remove item from cart');
        }
    }
);

export { addToCart, removeFromCart, fetchCart };

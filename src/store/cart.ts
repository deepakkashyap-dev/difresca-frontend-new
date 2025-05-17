import { createSlice } from '@reduxjs/toolkit';
import { CartItem, CartProduct } from '../utils/types';
import { addToCart, removeFromCart, fetchCart } from '../utils/Api/AppService/cartApi';
import { getDeliveryCharges } from '../utils/Api/AppService/shippingApi';


type InitialState = {
  cartItems: CartItem[];
  cartId: string;
  totalQuantity: number;
  totalAmount?: number;
  billAmount: number;
  discount: number;
  distance?: number;
  deliveryCharge?: number;
  loading: boolean;
  error: unknown | null;
};

const initialState: InitialState = {
  cartItems: [],
  cartId: '',
  totalQuantity: 0,
  totalAmount: 0,
  billAmount: 0,
  discount: 0,
  distance: undefined,
  deliveryCharge: undefined,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart Data
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.data;
        state.totalQuantity = action.payload.data.length;
        state.cartId = action.payload.cart_id;
        state.deliveryCharge = action.payload.delivery_charges || 0;
        state.distance = action.payload.distance || 0;

      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const newItem = action.payload;
        const existingItemIndex = state.cartItems.findIndex(item => item.id === newItem.id);
        if (existingItemIndex !== -1) {
          state.cartItems[existingItemIndex] = { ...state.cartItems[existingItemIndex], ...newItem };
        } else {
          state.totalQuantity = state.cartItems.length + 1;
          state.cartItems.push(newItem);
        }
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const newItem = action.payload;
        const existingItemIndex = state.cartItems.findIndex(item => item.id === newItem.id);
        if (existingItemIndex !== -1) {
          state.cartItems[existingItemIndex] = { ...state.cartItems[existingItemIndex], ...newItem };
        }
        else {
          state.totalQuantity = state.cartItems.length - 1;
          const cartId = action.meta.arg.cartItemId
          const indexToRemove = state.cartItems.findIndex(item => item.id === cartId);
          state.cartItems.splice(indexToRemove, 1);
        }
        state.loading = false;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDeliveryCharges.fulfilled, (state, action) => {
        state.deliveryCharge = action.payload.delivery_charges || 0;
        state.distance = action.payload.distance || 0;
      })

  }
});

export default cartSlice.reducer;
// export const { addItemToGuestCart, removeItemFromGuestCart } = cartSlice.actions;

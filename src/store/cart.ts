import { createSlice } from '@reduxjs/toolkit';
import { CartItem, CartProduct } from '../utils/types';
import { addToCart, removeFromCart, fetchCart } from '../utils/Api/AppService/cartApi';

type InitialState = {
  cartItems: CartItem[];
  cartId: string;
  totalQuantity: number;
  totalAmount: number;
  billAmount: number;
  discount: number;
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
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItemToGuestCart: (state, action) => {
    //   const newItem = action.payload as CartProduct;
    //   const existingItem = state.cartItems.find(
    //     (item) => item.product.id === newItem.id
    //   );
    //   if (existingItem) {
    //     existingItem.quantity++;
    //     existingItem.totalPrice = existingItem.billPrice + newItem.mrp;
    //     existingItem.discount = existingItem.discount + (newItem.mrp - newItem.price);
    //     existingItem.billPrice = existingItem.billPrice + newItem.price;
    //   } else {
    //     state.cartItems.push({
    //       product: newItem,
    //       quantity: 1,
    //       totalPrice: newItem.mrp,
    //       discount: newItem.mrp - newItem.price,
    //       billPrice: newItem.price
    //     });
    //   }
    //   state.totalQuantity++;
    //   state.totalAmount = state.cartItems.reduce(
    //     (total, item) => total + item.product.mrp * item.quantity,
    //     0
    //   );
    //   state.billAmount = state.cartItems.reduce(
    //     (total, item) => total + item.product.price * item.quantity,
    //     0
    //   );
    //   state.discount = state.cartItems.reduce(
    //     (total, item) => total + (item.product.mrp - item.product.price) * item.quantity,
    //     0
    //   );
    // },
    // removeItemFromGuestCart: (state, action) => {
    //   const id = action.payload;
    //   const existingItem = state.cartItems.find(
    //     (item) => item.product.id === id
    //   );
    //   if (existingItem) {
    //     if (existingItem.quantity === 1) {
    //       state.cartItems = state.cartItems.filter(
    //         (item) => item.product.id !== id
    //       );
    //     } else {
    //       existingItem.quantity--;
    //       existingItem.totalPrice = existingItem.totalPrice - existingItem.product.mrp;
    //       existingItem.discount = existingItem.discount - (existingItem.product.mrp - existingItem.product.price);
    //       existingItem.billPrice = existingItem.billPrice - existingItem.product.price;
    //     }
    //   }
    //   state.totalQuantity--;
    //   state.totalAmount = state.cartItems.reduce(
    //     (total, item) => total + item.product.mrp * item.quantity,
    //     0
    //   );
    //   state.billAmount = state.cartItems.reduce(
    //     (total, item) => total + item.product.price * item.quantity,
    //     0
    //   );
    //   state.discount = state.cartItems.reduce(
    //     (total, item) => total + (item.product.mrp - item.product.price) * item.quantity,
    //     0
    //   );
    // }
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
      });

  }
});

export default cartSlice.reducer;
// export const { addItemToGuestCart, removeItemFromGuestCart } = cartSlice.actions;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartPanel: false,
  loader: false,
  toast: {
    message: '',
    type: '',
    visible: false,
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showCart: (state) => {
      state.cartPanel = true;
    },
    hideCart: (state) => {
      state.cartPanel = false;
    },
    showLoader: (state) => {
      state.loader = true;
    },
    hideLoader: (state) => {
      state.loader = false;
    },
    showToast: (state, action) => {
      const { message, type } = action.payload;
      state.toast = {
        message,
        type,
        visible: true,
      };
    },
    hideToast: (state) => {
      state.toast = {
        message: '',
        type: '',
        visible: false,
      };
    }
  }
})

export default uiSlice.reducer
export const { showCart, hideCart, showLoader, hideLoader, showToast, hideToast } = uiSlice.actions;
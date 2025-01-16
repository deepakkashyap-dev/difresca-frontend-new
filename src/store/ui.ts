import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartPanel: false,
  loader: false,
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
    }
  }
})

export default uiSlice.reducer
export const { showCart, hideCart, showLoader, hideLoader } = uiSlice.actions;
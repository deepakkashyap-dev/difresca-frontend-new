import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  refreshToken: "",
  accessToken: "",
  mobileNumber: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const status = action.payload;
      state.isLoggedIn = status.isLoggedIn;
      state.refreshToken = status.refreshToken;
      state.accessToken = status.accessToken;
      state.mobileNumber = status.mobileNumber;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.refreshToken = "";
      state.accessToken = "";
      state.mobileNumber = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

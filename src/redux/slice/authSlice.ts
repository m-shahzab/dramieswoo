import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
type userObj = {
  id: string;
  name: string;
  registration: string;
  email: string;
  phone: string;
  profileUrl: string;
};
type PayloadType = {
  id: string;
  name: string;
  registration: string;
  email: string;
  phone: string;
  profileUrl: string;
};

interface AuthType {
  status: boolean;
  users: null | userObj;
}

// Define the initial state using that type
const initialState: AuthType = {
  status: false,
  users: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<PayloadType>) => {
      state.status = true;
      state.users = {
        id: action.payload.id,
        name: action.payload.name,
        registration: action.payload.registration,
        email: action.payload.email,
        profileUrl: action.payload.profileUrl,
        phone: action.payload.phone,
      };
      localStorage.setItem("isLogin", JSON.stringify(state.status));
    },

    logout: (state) => {
      state.status = false;
      state.users = null;
      localStorage.setItem("isLogin", JSON.stringify(state.status));
    },

    updatePrefs: (state, action: PayloadAction<string>) => {
      if (state.users) state.users.profileUrl = action.payload;
    },
  },
});

export const { login, logout, updatePrefs } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./usersSlice";

interface AuthState {
  user: User | null;
  token: string | null;
  role: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string; role: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
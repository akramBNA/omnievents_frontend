/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params: { limit?: number; offset?: number; keyword?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/users/getAllUsers/?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data;
  },
);

export const updateUserRole = createAsyncThunk(
  "users/updateUserRole",
  async ({ id, role_id }: { id: number; role_id: number }) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/users/updateUserRole/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role_id }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data.data;
  },
);

export interface User {
  user_id: number;
  user_name: string;
  user_lastname: string;
  user_email: string;
  user_role_id: number;
}

interface UsersState {
  users: User[];
  total: number;
  loading: boolean;
}

const initialState: UsersState = {
  users: [],
  total: 0,
  loading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data as User[];
        state.total = action.payload.total;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.users = state.users.map((u) =>
          u.user_id === (action.payload as User).user_id
            ? (action.payload as User)
            : u,
        );
      });
  },
});

export default usersSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/users/getAllUsers/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data.data;
});

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

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [] as unknown[],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (s, a) => {
        s.loading = false;
        s.users = a.payload;
      })
      .addCase(updateUserRole.fulfilled, (s, a) => {
        s.users = s.users.map((u: unknown) =>
          (u as { user_id: number }).user_id === a.payload.user_id ? a.payload : u,
        );
      });
  },
});

export default usersSlice.reducer;

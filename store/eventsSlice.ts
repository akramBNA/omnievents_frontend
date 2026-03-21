/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const token = localStorage.getItem("token");

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (params: { limit?: number; offset?: number; keyword?: string }) => {
    const query = new URLSearchParams(params as any).toString();

    const res = await fetch(`${API_URL}/events/getAllEvents?${query}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  },
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData: any) => {
    const res = await fetch(`${API_URL}/events/createEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data.data;
  },
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ id, eventData }: { id: number; eventData: any }) => {
    const res = await fetch(`${API_URL}/events/updateEvent/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data.data;
  },
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id: number) => {
    const res = await fetch(`${API_URL}/events/deleteEvent/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return id;
  },
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [] as any[],
    total: 0,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.unshift(action.payload);
      })

      .addCase(updateEvent.fulfilled, (state, action) => {
        state.events = state.events.map((e: any) =>
          e.event_id === action.payload.event_id ? action.payload : e,
        );
      })

      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (e: any) => e.event_id !== action.payload,
        );
      });
  },
});

export default eventsSlice.reducer;

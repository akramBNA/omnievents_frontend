/* eslint-disable @typescript-eslint/no-explicit-any */
import { eventsService } from "@/services/events.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (params: any) => {
    return await eventsService.fetchEvents(params);
  },
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData: any) => {
    return await eventsService.createEvent(eventData);
  },
);

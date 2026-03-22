import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import eventsReducer from "./eventsSlice";
import usersReducer from "./usersSlice";
import { use } from "react";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
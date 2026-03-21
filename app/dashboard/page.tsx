"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/sidebar";
import EventsTable from "../../components/eventsTable";
import EventModal from "../../components/eventModal";

import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../store/eventsSlice";
import { RootState, AppDispatch } from "../../store";

export default function DashboardPage() {
  const { loading } = useAuth(["user", "admin", "super_admin"]);

  const dispatch = useDispatch<AppDispatch>();
  const { events } = useSelector((state: RootState) => state.events);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const username = "Admin";

  useEffect(() => {
    dispatch(fetchEvents({ limit: 10, offset: 0 }));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4">
        <div className="w-20 h-20 border-10 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-linear-to-br from-blue-400 via-blue-500 to-blue-600 px-4">
      <Sidebar username={username} />

      <main className="flex-1 p-6 md:ml-64">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h1 className="text-4xl text-white font-bold">Events</h1>
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
            >
              + Add Event
            </button>
          </div>
        </div>

        <EventsTable events={events} />

        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </div>
  );
}
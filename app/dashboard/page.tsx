"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import EventsTable from "../../components/eventsTable";
import EventModal from "../../components/eventModal";

import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../store/eventsSlice";
import { RootState, AppDispatch } from "../../store";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { events } = useSelector((state: RootState) => state.events);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const username = "Admin";

  useEffect(() => {
    dispatch(fetchEvents({ limit: 10, offset: 0 }));
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-blue-100">
      <Sidebar username={username} />

      <main className="flex-1 p-6 md:ml-64">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h1 className="text-2xl font-bold">Events</h1>
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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

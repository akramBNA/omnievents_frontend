"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../store/eventsSlice";
import { RootState, AppDispatch } from "../store";

import EventsTable from "./eventsTable";
import EventModal from "./eventModal";
import { debounce } from "lodash";

export default function EventsSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { events } = useSelector((state: RootState) => state.events);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchEvents({ limit: 10, offset: 0, keyword: search }));
  }, [dispatch, search]);

  const debouncedSearch = debounce((val: string) => {
    setSearch(val);
  }, 500);

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2 md:ml-64">
        {" "}
        <h1 className="text-4xl text-white font-bold">Events</h1>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded"
            onChange={(e) => debouncedSearch(e.target.value)}
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

      <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

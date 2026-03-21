/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { createEvent, updateEvent } from "../store/eventsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

interface Event {
  event_id: string | number;
  event_name: string;
  event_details: string;
  event_start_date: string;
  event_end_date: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: Event;
}

export default function EventModal({
  isOpen,
  onClose,
  event,
}: EventModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (event) {
      setName(event.event_name);
      setDetails(event.event_details);
      setStartDate(event.event_start_date);
      setEndDate(event.event_end_date);
    } else {
      setName("");
      setDetails("");
      setStartDate("");
      setEndDate("");
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = {
      event_name: name,
      event_details: details,
      event_start_date: startDate,
      event_end_date: endDate,
    };

    if (event) {
      await dispatch(updateEvent({ id: Number(event.event_id), eventData }));
    } else {
      await dispatch(createEvent(eventData));
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {event ? "Edit Event" : "New Event"}
        </h2>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Event Name"
            className="p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Event Details"
            className="p-2 border rounded"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
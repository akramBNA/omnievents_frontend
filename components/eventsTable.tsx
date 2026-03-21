/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../store/eventsSlice";
import EventModal from "./eventModal";
import { AppDispatch } from "../store";

interface EventsTableProps {
  events: any[];
}

export default function EventsTable({ events }: EventsTableProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (event: any) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteEvent(id));
  };

  return (
    <>
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEvent(null);
        }}
        event={editingEvent}
      />

      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Details</th>
              <th className="p-2 text-left">Start Date</th>
              <th className="p-2 text-left">End Date</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.event_id} className="border-b">
                <td className="p-2">{event.event_name}</td>
                <td className="p-2">{event.event_details}</td>
                <td className="p-2">{event.event_start_date}</td>
                <td className="p-2">{event.event_end_date}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEdit(event)}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(event.event_id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col gap-3">
        {events.map((event) => (
          <div
            key={event.event_id}
            className="bg-white p-4 rounded-lg shadow flex flex-col gap-2"
          >
            <div>
              <strong>Name:</strong> {event.event_name}
            </div>
            <div>
              <strong>Details:</strong> {event.event_details}
            </div>
            <div>
              <strong>Start:</strong> {event.event_start_date}
            </div>
            <div>
              <strong>End:</strong> {event.event_end_date}
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleEdit(event)}
              >
                ✏️
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(event.event_id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

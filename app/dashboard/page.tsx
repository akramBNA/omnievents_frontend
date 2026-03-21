/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useAuth } from "../../hooks/useAuth";

// export default function Dashboard() {
//   const authorized = useAuth(["admin", "super_admin"]);

//   if (!authorized) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4">
//         <div className="w-20 h-20 border-10 border-white border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4">
//       <h1 className="p-6 text-2xl text-white font-bold">Dashboard Admin</h1>
//     </div>
//   );
// }
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, deleteEvent } from "../../store/eventsSlice";
import { RootState, AppDispatch } from "../../store";

export default function EventsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { events, loading } = useSelector(
    (state: RootState) => state.events
  );

  useEffect(() => {
    dispatch(fetchEvents({ limit: 10, offset: 0 }));
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Events</h1>

      {events.map((event: any) => (
        <div
          key={event.event_id}
          className="border p-4 mb-3 rounded-lg shadow"
        >
          <h2 className="text-lg font-semibold">{event.event_name}</h2>
          <p>{event.event_details}</p>

          <button
            onClick={() => dispatch(deleteEvent(event.event_id))}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
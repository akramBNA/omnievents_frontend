/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, subscribeToEvent } from "@/store/eventsSlice";
import { RootState, AppDispatch } from "@/store";
import debounce from "lodash/debounce";
import { useAuth } from "@/hooks/useAuth";
import EventsPageTable from "@/components/events-page/EventsPageTable";
import EventsSidebar from "@/components/events-page/EventsSidebar";
import Swal from "sweetalert2";

export default function EventsPage() {
  const { loading } = useAuth(["user", "admin", "super_admin"]);
  const user = useSelector((s: RootState) => s.auth.user);

  const dispatch = useDispatch<AppDispatch>();
  const { events, total, loading: eventsLoading } = useSelector(
    (s: RootState) => s.events,
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user) return;
    dispatch(
      fetchEvents({
        limit: rowsPerPage,
        offset: page * rowsPerPage,
        keyword: search,
      }),
    );
  }, [dispatch, page, rowsPerPage, search]);

  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        setSearch(val);
        setPage(0);
      }, 500),
    [],
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleSubscribe = async (event: any) => {
    if (!user) return;

    const res = await dispatch(
      subscribeToEvent({
        user_id: user.user_id,
        event_id: event.event_id,
      }),
    );

    if (subscribeToEvent.fulfilled.match(res)) {
      Swal.fire("Succès", "Inscription réussie", "success");
    } else {
      Swal.fire("Info", "Déjà inscrit ou erreur", "info");
    }
  };

  if (loading) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      
      {/* Sidebar */}
      <EventsSidebar username={user?.user_name || "User"} />

      {/* Main */}
      <main className="flex-1 p-6 md:ml-64 mt-4">
        
        {/* Header (Title + Search) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h1 className="text-4xl text-white font-bold">
            Événements
          </h1>

          <input
            type="text"
            placeholder="Chercher un événement..."
            className="p-2 rounded-lg bg-white/90 border border-white shadow focus:outline-none md:w-80"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <EventsPageTable
          events={events}
          total={total}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={(val: number) => {
            setRowsPerPage(val);
            setPage(0);
          }}
          loading={eventsLoading}
          onSubscribe={handleSubscribe}
        />
      </main>
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, subscribeToEvent } from "@/store/eventsSlice";
import { RootState, AppDispatch } from "@/store";
import debounce from "lodash/debounce";
import { useAuth } from "@/hooks/useAuth";
import EventsPageNavbar from "@/components/events-page/EventsPageNavbar";
import EventsPageTable from "@/components/events-page/EventsPageTable";
import Swal from "sweetalert2";

export default function EventsPage() {
  const { loading } = useAuth(["user", "admin", "super_admin"]);
  const user = useSelector((s: RootState) => s.auth.user);

  const dispatch = useDispatch<AppDispatch>();
  const {
    events,
    total,
    loading: eventsLoading,
  } = useSelector((s: RootState) => s.events);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <EventsPageNavbar onSearch={debouncedSearch} />

      <div className="p-4 md:p-10 flex justify-center">
        <div className="w-full max-w-6xl">
          <div>
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
          </div>
        </div>
      </div>
    </div>
  );
}

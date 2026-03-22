/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../store/eventsSlice";
import { RootState, AppDispatch } from "../../store";
import debounce from "lodash/debounce";

import EventsTable from "./eventsTable";
import EventModal from "./eventModal";

export default function EventsSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { events, loading, total } = useSelector(
    (state: RootState) => state.events,
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(
      fetchEvents({
        limit: rowsPerPage,
        offset: page * rowsPerPage,
        keyword: search,
      }),
    );
  }, [dispatch, search, page, rowsPerPage]);

  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        setSearch(val);
      }, 500),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2 md:ml-64">
        <h1 className="text-4xl text-white font-bold">Événements</h1>

        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Chercher par nom.."
            className="p-2 rounded-lg bg-white/90 border border-white shadow focus:outline-none"
            onChange={(e) => debouncedSearch(e.target.value)}
          />

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
          >
            + Ajouter
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <EventsTable
          events={events}
          total={total}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={(val) => {
            setRowsPerPage(val);
            setPage(0);
          }}
        />
      )}

      <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

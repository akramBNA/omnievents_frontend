/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, subscribeToEvent } from "@/store/eventsSlice";
import { RootState, AppDispatch } from "@/store";
import debounce from "lodash/debounce";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function EventsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { events, loading, total } = useSelector(
    (state: RootState) => state.events
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(
      fetchEvents({
        limit: rowsPerPage,
        offset: page * rowsPerPage,
        keyword: search,
      })
    );
  }, [dispatch, page, rowsPerPage, search]);

  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        setSearch(val);
        setPage(0);
      }, 500),
    []
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleSubscribe = async (event_id: number) => {
    if (!user) return;

    const { isConfirmed } = await Swal.fire({
      title: "S'inscrire à cet événement ?",
      icon: "question",
      showCancelButton: true,
    });

    if (!isConfirmed) return;

    const res = await dispatch(
      subscribeToEvent({ user_id: user.user_id, event_id })
    );

    if (subscribeToEvent.fulfilled.match(res)) {
      Swal.fire("Succès", "Inscription réussie 🎉", "success");
    } else {
      Swal.fire("Erreur", "Déjà inscrit ou erreur", "error");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">

      <div className="flex justify-between items-center p-4 bg-blue-100 shadow md:px-10">
        <button
          className="md:hidden text-xl"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>

        <h1 className="text-xl font-bold text-blue-700">
          OMNIEVENTS
        </h1>

        <div className="flex items-center gap-4">
          <span className="hidden md:block font-medium">
            Bonjour, {user?.user_name}
          </span>

          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-10"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-20 p-6 transform transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <p className="mb-6">Bonjour, {user?.user_name}</p>

        <button
          onClick={logout}
          className="w-full bg-red-600 text-white py-2 rounded"
        >
          Déconnexion
        </button>
      </div>

      <div className="p-4 md:p-10">
        <div className="flex justify-between flex-wrap gap-3 mb-6">
          <h1 className="text-3xl text-white font-bold">Événements</h1>

          <input
            type="text"
            placeholder="Chercher..."
            className="p-2 rounded bg-white"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center mt-20">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="hidden md:block bg-white rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th>Nom</th>
                    <th>Détails</th>
                    <th>Début</th>
                    <th>Fin</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {events.map((e: any) => (
                    <tr key={e.event_id} className="text-center border-t">
                      <td>{e.event_name}</td>
                      <td>{e.event_details}</td>
                      <td>{e.event_start_date}</td>
                      <td>{e.event_end_date}</td>
                      <td>
                        <button
                          onClick={() => handleSubscribe(e.event_id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          S&apos;inscrire
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden flex flex-col gap-4">
              {events.map((e: any) => (
                <div
                  key={e.event_id}
                  className="bg-white p-4 rounded-xl shadow"
                >
                  <p><b>Nom:</b> {e.event_name}</p>
                  <p><b>Détails:</b> {e.event_details}</p>
                  <p><b>Début:</b> {e.event_start_date}</p>
                  <p><b>Fin:</b> {e.event_end_date}</p>

                  <button
                    onClick={() => handleSubscribe(e.event_id)}
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded"
                  >
                    S&apos;inscrire
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
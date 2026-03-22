"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { fetchUsers } from "@/store/usersSlice";
import { RootState, AppDispatch } from "@/store";
import UsersTable from "./usersTable";

export default function UsersSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, total, loading } = useSelector((s: RootState) => s.users);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        setSearch(val);
        setPage(0);
      }, 500),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    dispatch(
      fetchUsers({
        limit: rowsPerPage,
        offset: page * rowsPerPage,
        keyword: search,
      }),
    );
  }, [dispatch, page, rowsPerPage, search]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-4xl text-white font-bold">Utilisateurs</h1>
        <input
          type="text"
          placeholder="Chercher par nom, prénom ou email..."
          className="p-2 rounded-lg bg-white/90 border border-white shadow focus:outline-none"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <UsersTable
          users={users}
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
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/store/usersSlice";
import { RootState, AppDispatch } from "@/store";
import UsersTable from "./usersTable";

export default function UsersSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading } = useSelector((s: RootState) => s.users);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-4xl text-white font-bold mb-4">Utilisateurs</h1>

      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <UsersTable
          users={users}
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
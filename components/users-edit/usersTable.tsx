/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  TablePagination,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRole } from "@/store/usersSlice";
import { AppDispatch, RootState } from "@/store";
import Swal from "sweetalert2";

import { User } from "@/store/usersSlice";

interface Props {
  users: User[];
  total: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export default function UsersTable({
  users,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { user: currentUser } = useSelector((s: RootState) => s.auth);

  const handleToggle = async (user: User) => {
    if (!currentUser?.user_role_id || currentUser.user_role_id !== 1) {
      Swal.fire(
        "Accès refusé",
        "Seul le Super Admin peut modifier les rôles.",
        "error",
      );
      return;
    }

    if (user.user_id === 1) return;

    const newRole = user.user_role_id === 3 ? 2 : 3;

    const { isConfirmed } = await Swal.fire({
      title: "Voulez-vous changer le rôle ?",
      text: "Cette action modifiera les permissions.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, changer",
      confirmButtonColor: "#3085d6",
      cancelButtonText: "Annuler",
      cancelButtonColor: "#d33",
    });

    if (!isConfirmed) return;

    dispatch(updateUserRole({ id: user.user_id, role_id: newRole }));
  };

  return (
    <>
      <div className="hidden md:block">
        <TableContainer
          component={Paper}
          className="rounded-xl overflow-hidden"
        >
          <Table>
            <TableHead className="bg-gray-300">
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rôle</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Aucun utilisateur.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((u: User) => (
                  <TableRow key={u.user_id}>
                    <TableCell>{u.user_name}</TableCell>
                    <TableCell>{u.user_lastname}</TableCell>
                    <TableCell>{u.user_email}</TableCell>
                    <TableCell>
                      {u.user_role_id === 1 ? (
                        <Chip label="Super Admin" color="error" size="small" />
                      ) : u.user_role_id === 2 ? (
                        <Chip label="Admin" color="primary" size="small" />
                      ) : (
                        <Chip label="User" color="default" size="small" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={u.user_role_id === 2}
                        disabled={u.user_id === 1}
                        onChange={() => handleToggle(u)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={total}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(e, p) => onPageChange(p)}
            onRowsPerPageChange={(e) =>
              onRowsPerPageChange(parseInt(e.target.value, 10))
            }
            rowsPerPageOptions={[5, 10, 20]}
          />
        </TableContainer>
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {users.length === 0 ? (
          <div className="bg-white p-6 rounded-xl text-center">
            Aucun utilisateur.
          </div>
        ) : (
          users.map((u) => (
            <div key={u.user_id} className="bg-white rounded-xl p-4 shadow">
              <div>
                <b>Nom:</b> {u.user_name}
              </div>
              <div>
                <b>Prénom:</b> {u.user_lastname}
              </div>
              <div>
                <b>Email:</b> {u.user_email}
              </div>
              <div className="my-2">
                {u.user_role_id === 1 ? (
                  <Chip label="Super Admin" color="error" size="small" />
                ) : u.user_role_id === 2 ? (
                  <Chip label="Admin" color="primary" size="small" />
                ) : (
                  <Chip label="User" color="default" size="small" />
                )}
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>Admin</span>
                <Switch
                  checked={u.user_role_id === 2}
                  disabled={u.user_id === 1}
                  onChange={() => handleToggle(u)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

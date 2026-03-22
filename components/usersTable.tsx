/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Switch, TablePagination
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateUserRole } from "@/store/usersSlice";
import { AppDispatch } from "@/store";
import Swal from "sweetalert2";

interface Props {
  users: any[];
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export default function UsersTable({
  users,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleToggle = async (user: any) => {
    if (user.user_id === 1) return;

    const newRole = user.user_role_id === 3 ? 2 : 3;

    const { isConfirmed } = await Swal.fire({
      title: "Changer le rôle ?",
      text: "Cette action modifiera les permissions.",
      icon: "question",
      showCancelButton: true,
    });

    if (!isConfirmed) return;

    dispatch(updateUserRole({ id: user.user_id, role_id: newRole }));
  };

  const paginated = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <div className="hidden md:block">
        <TableContainer component={Paper} className="rounded-xl overflow-hidden">
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
                paginated.map((u) => (
                  <TableRow key={u.user_id}>
                    <TableCell>{u.user_name}</TableCell>
                    <TableCell>{u.user_lastname}</TableCell>
                    <TableCell>{u.user_email}</TableCell>
                    <TableCell>{u.user_role_id === 1 ? "Super Admin" : u.user_role_id === 2 ? "Admin" : "User"}</TableCell>
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
            count={users.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(e, p) => onPageChange(p)}
            onRowsPerPageChange={(e) =>
              onRowsPerPageChange(parseInt(e.target.value, 10))
            }
          />
        </TableContainer>
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {users.length === 0 ? (
          <div className="bg-white p-6 rounded-xl text-center">
            Aucun utilisateur.
          </div>
        ) : (
          paginated.map((u) => (
            <div key={u.user_id} className="bg-white rounded-xl p-4 shadow">
              <div><b>Nom:</b> {u.user_name}</div>
              <div><b>Prénom:</b> {u.user_lastname}</div>
              <div><b>Email:</b> {u.user_email}</div>
              <div><b>Rôle:</b> {u.user_role_id === 1 ? "Super Admin" : u.user_role_id === 2 ? "Admin" : "User"}</div>

              <div className="flex justify-between items-center mt-3">
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
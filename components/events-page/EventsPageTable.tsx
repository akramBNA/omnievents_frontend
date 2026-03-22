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
  TablePagination,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToEvent } from "@/store/eventsSlice";
import { RootState, AppDispatch } from "@/store";
import Swal from "sweetalert2";

export default function EventsPageTable({
  events,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  loading,
}: any) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((s: RootState) => s.auth.user);

  if (!user) return null;

  const handleSubscribe = async (event: any) => {
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

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      {loading ? (
        <div className="flex justify-center p-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <TableContainer component={Paper} className="rounded-xl">
            <Table>
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Détails</TableCell>
                  <TableCell>Début</TableCell>
                  <TableCell>Fin</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {events.map((e: any) => {
                  const isSubscribed = e.isSubscribed;

                  return (
                    <TableRow key={e.event_id} hover>
                      <TableCell>{e.event_name}</TableCell>
                      <TableCell>{e.event_details}</TableCell>
                      <TableCell>{e.event_start_date}</TableCell>
                      <TableCell>{e.event_end_date}</TableCell>

                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          disabled={isSubscribed}
                          onClick={() => handleSubscribe(e)}
                          sx={{
                            backgroundColor: isSubscribed ? "#ccc" : "#2563eb",
                          }}
                        >
                          {isSubscribed ? "Inscrit" : "S'inscrire"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

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
        </>
      )}
    </div>
  );
}

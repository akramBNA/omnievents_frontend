/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import EventModal from "./eventModal";
import Swal from "sweetalert2";
import { deleteEvent } from "@/store/eventsSlice";

interface Event {
  event_id: number;
  event_name: string;
  event_details: string;
  event_start_date: string;
  event_end_date: string;
}

interface EventsTableProps {
  events: Event[];
  total: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export default function EventsTable({
  events,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: EventsTableProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (event: any) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const { isConfirmed } = await Swal.fire({
      title: "Etes vous sûr de supprimer cet événement ?",
      text: "Cet événement sera supprimé !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer !",
      confirmButtonColor: "#d33",
      cancelButtonText: "Annuler",
      cancelButtonColor: "#3085d6",
    });

    if (isConfirmed) {
      const result = await dispatch(deleteEvent(id));
      if (deleteEvent.fulfilled.match(result)) {
        Swal.fire("Supprimé!", "L'événement a été supprimé.", "success");
      } else {
        Swal.fire(
          "Erreur!",
          "Échec de la suppression de l'événement.",
          "error",
        );
      }
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  return (
    <>
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEvent(null);
        }}
        event={editingEvent}
      />
      <div className="hidden md:block">
        <TableContainer
          component={Paper}
          className="rounded-xl overflow-hidden"
        >
          <Table>
            <TableHead className="bg-gray-300">
              <TableRow>
                {[
                  "Nom d' événement",
                  "Détails d'événement",
                  "Date de début",
                  "Date de fin",
                  "Actions",
                ].map((h) => (
                  <TableCell key={h}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {events.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Il n&apos;y a pas d&apos;événements.
                  </TableCell>
                </TableRow>
              ) : (
                events.map((event) => (
                  <TableRow key={event.event_id}>
                    <TableCell>{event.event_name}</TableCell>
                    <TableCell>{event.event_details}</TableCell>
                    <TableCell>{event.event_start_date}</TableCell>
                    <TableCell>{event.event_end_date}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(event)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(event.event_id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
      <div className="md:hidden flex flex-col gap-4">
        {events.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-600 font-medium">
            Il n&apos;y a pas d&apos;événements.
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.event_id}
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between">
                <span className="font-semibold">Nom d&apos;événement:</span>
                <span>{event.event_name}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Détails d&apos;événement:</span>
                <span className="text-right">{event.event_details}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Date de début:</span>
                <span>{event.event_start_date}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Date de fin:</span>
                <span>{event.event_end_date}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Actions:</span>
                <div className="flex justify-end gap-3 mt-2">
                  <button onClick={() => handleEdit(event)}>✏️</button>
                  <button onClick={() => handleDelete(event.event_id)}>
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

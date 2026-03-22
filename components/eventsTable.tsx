/* eslint-disable @typescript-eslint/no-explicit-any */
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
}

export default function EventsTable({ events }: EventsTableProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleEdit = (event: any) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "This event will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (isConfirmed) {
      const result = await dispatch(deleteEvent(id));
      if (deleteEvent.fulfilled.match(result)) {
        Swal.fire("Deleted!", "Event has been deleted.", "success");
      } else {
        Swal.fire("Error!", "Failed to delete event.", "error");
      }
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (events.length === 0)
    return <p className="text-white">There is no events.</p>;

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

      <TableContainer component={Paper} className="rounded-xl overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              {["Name", "Details", "Start Date", "End Date", "Actions"].map(
                (h) => (
                  <TableCell key={h}>{h}</TableCell>
                ),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {events
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((event) => (
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
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={events.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}

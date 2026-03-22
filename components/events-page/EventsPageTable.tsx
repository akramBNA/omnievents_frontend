/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/store";
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TablePagination,
  Table,
} from "@mui/material";
import { useSelector } from "react-redux";

interface EventsPageTableProps {
  events: any[];
  total: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  loading: boolean;
  onSubscribe: (event: any) => void;
}

export default function EventsPageTable({
  events,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  loading,
  onSubscribe,
}: EventsPageTableProps) {
  const user = useSelector((s: RootState) => s.auth.user);
  if (!user) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      {loading ? (
        <div className="flex justify-center p-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-10">Aucun événement trouvé</div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
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
                  {events.map((e: any) => (
                    <TableRow key={e.event_id} hover>
                      <TableCell>{e.event_name}</TableCell>
                      <TableCell>{e.event_details}</TableCell>
                      <TableCell>{e.event_start_date}</TableCell>
                      <TableCell>{e.event_end_date}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          disabled={!!e.isSubscribed}
                          onClick={() => onSubscribe(e)}
                          sx={{
                            backgroundColor: e.isSubscribed
                              ? "#ccc"
                              : "#2563eb",
                          }}
                        >
                          {e.isSubscribed ? "Inscrit" : "S'inscrire"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div className="md:hidden flex flex-col gap-4">
            {events.map((e: any) => (
              <div
                key={e.event_id}
                className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2 border"
              >
                <div>
                  <span className="font-semibold">Nom:</span> {e.event_name}
                </div>
                <div>
                  <span className="font-semibold">Détails:</span>{" "}
                  {e.event_details}
                </div>
                <div>
                  <span className="font-semibold">Début:</span>{" "}
                  {e.event_start_date}
                </div>
                <div>
                  <span className="font-semibold">Fin:</span> {e.event_end_date}
                </div>
                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  disabled={!!e.isSubscribed}
                  onClick={() => onSubscribe(e)}
                  sx={{ backgroundColor: e.isSubscribed ? "#ccc" : "#2563eb" }}
                >
                  {e.isSubscribed ? "Inscrit" : "S'inscrire"}
                </Button>
              </div>
            ))}

            <div className="flex justify-between items-center mt-4">
              <button
                disabled={page === 0}
                onClick={() => onPageChange(page - 1)}
                className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span>
                Page {page + 1} / {Math.ceil(total / rowsPerPage)}
              </span>
              <button
                disabled={(page + 1) * rowsPerPage >= total}
                onClick={() => onPageChange(page + 1)}
                className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          <div className="hidden md:block mt-4">
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
          </div>
        </>
      )}
    </div>
  );
}

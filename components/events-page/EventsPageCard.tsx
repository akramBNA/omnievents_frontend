// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Button } from "@mui/material";

// export default function EventsPageCards({ events, onSubscribe, userId }: any) {
//   return (
//     <div className="md:hidden flex flex-col gap-4">
//       {events.map((event: any) => (
//         <div
//           key={event.event_id}
//           className="bg-white rounded-2xl shadow p-4 flex flex-col gap-3"
//         >
//           <div>
//             <span className="font-semibold">Nom:</span> {event.event_name}
//           </div>
//           <div>
//             <span className="font-semibold">Détails:</span>{" "}
//             {event.event_details}
//           </div>
//           <div>
//             <span className="font-semibold">Début:</span>{" "}
//             {event.event_start_date}
//           </div>
//           <div>
//             <span className="font-semibold">Fin:</span> {event.event_end_date}
//           </div>

//           <Button
//             size="small"
//             variant="contained"
//             fullWidth
//             disabled={!!event.isSubscribed}
//             onClick={() => onSubscribe(event)}
//             sx={{ backgroundColor: event.isSubscribed ? "#ccc" : "#2563eb" }}
//           >
//             {event.isSubscribed ? "Inscrit" : "S'inscrire"}
//           </Button>
//         </div>
//       ))}
//     </div>
//   );
// }

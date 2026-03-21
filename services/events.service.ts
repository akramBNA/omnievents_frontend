// /* eslint-disable @typescript-eslint/no-explicit-any */
// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const getToken = () => localStorage.getItem("token");

// export const eventsService = {
//   async fetchEvents(params: any) {
//     const query = new URLSearchParams(params).toString();
//     const res = await fetch(`${API_URL}/events?${query}`);
//     const data = await res.json();

//     if (!res.ok) throw new Error(data.message);
//     return data;
//   },

//   async createEvent(eventData: any) {
//     const res = await fetch(`${API_URL}/events`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getToken()}`,
//       },
//       body: JSON.stringify(eventData),
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message);
//     return data.data;
//   },

//   async updateEvent(id: number, eventData: any) {
//     const res = await fetch(`${API_URL}/events/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getToken()}`,
//       },
//       body: JSON.stringify(eventData),
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message);
//     return data.data;
//   },

//   async deleteEvent(id: number) {
//     const res = await fetch(`${API_URL}/events/${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${getToken()}`,
//       },
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message);
//     return id;
//   },
// };

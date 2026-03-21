"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/sidebar";
import EventsTable from "../../components/eventsTable";
import EventModal from "../../components/eventModal";

import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../store/eventsSlice";
import { RootState, AppDispatch } from "../../store";
import EventsSection from "@/components/eventsSection";
import UsersSection from "@/components/usersSection";

export default function DashboardPage() {
  const { loading } = useAuth(["user", "admin", "super_admin"]);

  const dispatch = useDispatch<AppDispatch>();
  const { events } = useSelector((state: RootState) => state.events);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<"events" | "users">("events");

  const username = "Admin";

  useEffect(() => {
    dispatch(fetchEvents({ limit: 10, offset: 0 }));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4">
        <div className="w-20 h-20 border-10 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-linear-to-br from-blue-400 via-blue-500 to-blue-600 px-4">
      <Sidebar username={username} />

      <main className="flex-1 p-6 md:ml-64">
        {currentSection === "events" && <EventsSection />}
        {currentSection === "users" && <UsersSection />}
      </main>
    </div>
  );
}

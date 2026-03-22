"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/sidebar/sidebar";
import EventsSection from "../../components/events-edit/eventsSection";
import UsersSection from "../../components/users-edit/usersSection";

export default function DashboardPage() {
  const { loading } = useAuth(["admin", "super_admin"]);

  const currentUser = useSelector((state: RootState) => state.auth.user);
  const role = useSelector((state: RootState) => state.auth.role);

  const [currentSection, setCurrentSection] = useState<"events" | "users">(
    "events",
  );

  const canAccessUsers = role === "super_admin";

  const safeSection =
    currentSection === "users" && !canAccessUsers ? "events" : currentSection;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4">
        <div className="w-20 h-20 border-10 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4">
      <Sidebar
        username={currentUser?.user_name || "Admin"}
        currentSection={safeSection}
        setCurrentSection={setCurrentSection}
        role={role}
      />

      <main className="flex-1 p-6 md:ml-64 mt-12 md:mt-0">
        {safeSection === "events" && <EventsSection />}
        {safeSection === "users" && canAccessUsers && <UsersSection />}
      </main>
    </div>
  );
}

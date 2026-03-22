"use client";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/sidebar";
import EventsSection from "../../components/eventsSection";
import UsersSection from "../../components/usersSection";

export default function DashboardPage() {
  const { loading } = useAuth(["admin", "super_admin"]);

  const [currentSection, setCurrentSection] = useState<"events" | "users">(
    "events",
  );

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
        username="Admin"
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />

      <main className="flex-1 p-6 md:ml-64 mt-12 md:mt-0">
        {currentSection === "events" && <EventsSection />}
        {currentSection === "users" && <UsersSection />}
      </main>
    </div>
  );
}



import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Heart, Clock, CheckCircle } from "lucide-react";
import { useAuthStore } from "../Store/AuthStore";
import { useAllAppo,useUpdateAppointmentStatus } from "../Hooks/useAppointment";
import { useAllAdoptions,useDeleteAdoption,useUpdateAdoptionStatus } from "../Hooks/useAdoption";

import { Trash2 } from "lucide-react";


type Tab = "appointments" | "adoptions";

interface Appointment {
  _id: string;
  namePet: string;
  description: string;
  date: string;
  status: string;
  user?: { name: string; mail: string };
}

interface Adoption {
  _id: string;
  breedName: string;
  breedImageUrl: string;
  message: string;
  status: string;
  user?: { name: string; mail: string };
}

const DoctorPanel = () => {
  const [activeTab, setActiveTab] = useState<Tab>("appointments");
  const user = useAuthStore((state) => state.user);

  const { data: appointmentsData, isLoading: loadingAppointments } = useAllAppo();
  const { data: adoptionsData, isLoading: loadingAdoptions } = useAllAdoptions();

  const { mutate: updateAppointment } = useUpdateAppointmentStatus();
  const { mutate: updateAdoption } = useUpdateAdoptionStatus();

  const appointments: Appointment[] = appointmentsData || [];
  const adoptions: Adoption[] = adoptionsData || [];

  const {mutate: deleteAdoption} = useDeleteAdoption()

  // ── estadísticas
  const stats = [
    {
      icon: <Calendar size={22} />,
      value: appointments.length,
      label: "Total appointments",
    },
    {
      icon: <Clock size={22} />,
      value: appointments.filter((a: Appointment) => a.status === "pending").length,
      label: "Pending appointments",
    },
    {
      icon: <Heart size={22} />,
      value: adoptions.filter((a: Adoption) => a.status === "pending").length,
      label: "Pending adoptions",
    },
    {
      icon: <CheckCircle size={22} />,
      value: adoptions.filter((a: Adoption) => a.status === "approved").length,
      label: "Approved adoptions",
    },
  ];

  // colores según el estado
  const statusColor = (status: string) => {
    switch (status) {
      case "pending": return "#eab308";
      case "confirmed": return "#3b82f6";
      case "completed": return "#72cf2a";
      case "approved": return "#72cf2a";
      case "rejected": return "#ef4444";
      default: return "#fffef0";
    }
  };

  return (
    <div
      className="min-h-screen pt-28 pb-20 px-8 md:px-20"
      style={{ backgroundColor: "#051d1b" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Header */}
        <h1 className="text-4xl md:text-5xl font-black mb-2" style={{ color: "#72cf2a" }}>
          Welcome, Dr. {user?.name}
        </h1>
        <p className="text-lg opacity-60 mb-10" style={{ color: "#fffef0" }}>
          Here's what's happening at PawKon today
        </p>

        {/* ── Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl"
              style={{ backgroundColor: "#151212" }}
            >
              <div style={{ color: "#72cf2a" }}>{stat.icon}</div>
              <p className="text-3xl font-black mt-3" style={{ color: "#72cf2a" }}>
                {stat.value}
              </p>
              <p className="text-xs opacity-60 mt-1" style={{ color: "#fffef0" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Tabs */}
        <div className="flex gap-2 mb-8">
          {(["appointments", "adoptions"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-6 py-3 rounded-xl font-medium capitalize transition"
              style={{
                backgroundColor: activeTab === tab ? "#72cf2a" : "#151212",
                color: activeTab === tab ? "#051d1b" : "#fffef0",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Contenido de tabs */}
        <AnimatePresence mode="wait">
          {activeTab === "appointments" ? (
            <motion.div
              key="appointments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              {loadingAppointments ? (
                <p className="animate-pulse" style={{ color: "#fffef0" }}>Loading...</p>
              ) : appointments.length === 0 ? (
                <p className="opacity-60" style={{ color: "#fffef0" }}>No appointments yet</p>
              ) : (
                appointments.map((appointment: Appointment) => (
                  <div
                    key={appointment._id}
                    className="p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                    style={{ backgroundColor: "#151212" }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold" style={{ color: "#72cf2a" }}>
                          {appointment.namePet}
                        </h3>
                        <span
                          className="text-xs px-3 py-1 rounded-full font-medium capitalize"
                          style={{
                            backgroundColor: `${statusColor(appointment.status)}20`,
                            color: statusColor(appointment.status),
                          }}
                        >
                          {appointment.status}
                        </span>
                      </div>
                      <p className="text-sm opacity-70 mt-2" style={{ color: "#fffef0" }}>
                        {appointment.description}
                      </p>
                      <p className="text-xs opacity-50 mt-2" style={{ color: "#fffef0" }}>
                        👤 {appointment.user?.name} ({appointment.user?.mail}) · 📅{" "}
                        {new Date(appointment.date).toLocaleDateString()}
                      </p>
                    </div>

                    {/* botones según el estado */}
                    <div className="flex gap-2">
                      {appointment.status === "pending" && (
                        <button
                          onClick={() => updateAppointment({ id: appointment._id, status: "confirmed" })}
                          className="px-4 py-2 rounded-lg text-sm font-medium"
                          style={{ backgroundColor: "#3b82f6", color: "#fff" }}
                        >
                          Confirm
                        </button>
                      )}
                      {appointment.status === "confirmed" && (
                        <button
                          onClick={() => updateAppointment({ id: appointment._id, status: "completed" })}
                          className="px-4 py-2 rounded-lg text-sm font-medium"
                          style={{ backgroundColor: "#72cf2a", color: "#051d1b" }}
                        >
                          Mark completed
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div
              key="adoptions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              {loadingAdoptions ? (
                <p className="animate-pulse" style={{ color: "#fffef0" }}>Loading...</p>
              ) : adoptions.length === 0 ? (
                <p className="opacity-60" style={{ color: "#fffef0" }}>No adoption requests yet</p>
              ) : (
                adoptions.map((adoption: Adoption) => (
                  <div
                    key={adoption._id}
                    className="p-6 rounded-2xl flex flex-col md:flex-row gap-6"
                    style={{ backgroundColor: "#151212" }}
                  >
                    <img
                      src={adoption.breedImageUrl}
                      alt={adoption.breedName}
                      className="w-full md:w-32 h-32 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold" style={{ color: "#72cf2a" }}>
                          {adoption.breedName}
                        </h3>
                        <span
                          className="text-xs px-3 py-1 rounded-full font-medium capitalize"
                          style={{
                            backgroundColor: `${statusColor(adoption.status)}20`,
                            color: statusColor(adoption.status),
                          }}
                        >
                          {adoption.status}
                        </span>
                      </div>
                      <p className="text-sm opacity-70 mt-2 italic" style={{ color: "#fffef0" }}>
                        "{adoption.message}"
                      </p>
                      <p className="text-xs opacity-50 mt-2" style={{ color: "#fffef0" }}>
                        👤 {adoption.user?.name} ({adoption.user?.mail})
                      </p>
                    </div>

                    {/* botones solo para pendientes */}
                    {adoption.status === "pending" && (
                      <div className="flex md:flex-col gap-2 justify-center">
                        <button
                          onClick={() => updateAdoption({ id: adoption._id, status: "approved" })}
                          className="px-4 py-2 rounded-lg text-sm font-medium"
                          style={{ backgroundColor: "#72cf2a", color: "#051d1b" }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateAdoption({ id: adoption._id, status: "rejected" })}
                          className="px-4 py-2 rounded-lg text-sm font-medium"
                          style={{ backgroundColor: "#ef4444", color: "#fff" }}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    <button
                          onClick={() => deleteAdoption(adoption._id)}
                          className="p-2 rounded-lg transition hover:opacity-70 self-start"
                          style={{ color: "#ef4444" }}
                        >
                          <Trash2 size={18} />
                        </button>
                          </div>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
    </div>
  );
};

export default DoctorPanel;

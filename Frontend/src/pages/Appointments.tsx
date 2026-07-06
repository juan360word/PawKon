// src/pages/Appointments.tsx
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { motion } from "framer-motion";
import { useMyAppo,useCreateAppo } from "../Hooks/useAppointment";
import { AppointmentSchema } from "../Types/dataTypes";
import type { createAppointment } from "../Types/dataTypes";
import { Trash2 } from "lucide-react";
import { useDeleteAppointment } from "../Hooks/useAppointment";




const Appointments = () => {
  const { data, isLoading } = useMyAppo();
  const { mutate: createAppointment, isPending, isSuccess } = useCreateAppo();
  const { mutate: deleteAppointment, isPending: isDeleting } = useDeleteAppointment();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createAppointment>({
    resolver: valibotResolver(AppointmentSchema),
  });

  const onSubmit = (formData: createAppointment) => {
    createAppointment(formData, {
      onSuccess: () => {
        reset()
      },
    })
  };

 

  const appointments = data?.Appointment || [];

  return (
    <div
      className="min-h-screen pt-28 pb-20 px-8 md:px-20"
      style={{ backgroundColor: "#051d1b" }}
    >
      <div className="max-w-6xl mx-auto">

       
        <h1
          className="text-5xl md:text-6xl font-black mb-4"
          style={{ color: "#72cf2a" }}
        >
          Book an appointment
        </h1>
        <p
          className="text-lg opacity-70 mb-12 max-w-2xl"
          style={{ color: "#fffef0" }}
        >
          Schedule a visit for your pet with our specialists. Fill out the form
          and our team will take care of the rest.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl h-fit"
            style={{ backgroundColor: "#151212" }}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#72cf2a" }}>
              New appointment
            </h2>

            {isSuccess && (
              <div
                className="mb-6 p-4 rounded-xl text-sm"
                style={{ backgroundColor: "rgba(114, 207, 42, 0.1)", color: "#72cf2a" }}
              >
                ✓ Appointment created successfully!
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium" style={{ color: "#fffef0" }}>
                  Pet name
                </label>
                <input
                  {...register("namePet")}
                  type="text"
                  placeholder="Tony"
                  className="px-4 py-3 rounded-xl outline-none"
                  style={{
                    backgroundColor: "#051d1b",
                    color: "#fffef0",
                    border: "1px solid rgba(114, 207, 42, 0.3)",
                  }}
                />
                {errors.namePet && (
                  <span className="text-red-400 text-xs">{errors.namePet.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium" style={{ color: "#fffef0" }}>
                  What's happening?
                </label>
                <textarea
                  {...register("description")}
                  rows={4}
                  placeholder="Describe your pet's symptoms or the reason for the visit..."
                  className="px-4 py-3 rounded-xl outline-none resize-none"
                  style={{
                    backgroundColor: "#051d1b",
                    color: "#fffef0",
                    border: "1px solid rgba(114, 207, 42, 0.3)",
                  }}
                />
                {errors.description && (
                  <span className="text-red-400 text-xs">{errors.description.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium" style={{ color: "#fffef0" }}>
                  Date
                </label>
                <input
                  {...register("date")}
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className="px-4 py-3 rounded-xl outline-none"
                  style={{
                    backgroundColor: "#051d1b",
                    color: "#fffef0",
                    border: "1px solid rgba(114, 207, 42, 0.3)",
                  }}
                />
                {errors.date && (
                  <span className="text-red-400 text-xs">{errors.date.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="py-4 rounded-xl font-bold text-lg mt-2 transition hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "#72cf2a", color: "#051d1b" }}
              >
                {isPending ? "Booking..." : "Book appointment"}
              </button>
            </form>
          </motion.div>

         
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#72cf2a" }}>
              My appointments
            </h2>

            {isLoading ? (
              <p className="animate-pulse" style={{ color: "#fffef0" }}>
                Loading your appointments...
              </p>
            ) : appointments.length === 0 ? (
              <div
                className="p-8 rounded-2xl text-center"
                style={{ backgroundColor: "#151212" }}
              >
                <p className="opacity-60" style={{ color: "#fffef0" }}>
                  You don't have any appointments yet. Book your first one! 🐾
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="p-6 rounded-2xl flex items-start justify-between gap-4"
                    style={{ backgroundColor: "#151212" }}
                  >
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: "#72cf2a" }}>
                        {appointment.namePet}
                      </h3>
                      <p
                        className="text-sm opacity-70 mt-1"
                        style={{ color: "#fffef0" }}
                      >
                        {appointment.description}
                      </p>
                      <p
                        className="text-xs opacity-50 mt-2"
                        style={{ color: "#fffef0" }}
                      >
                        📅 {new Date(appointment.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteAppointment(appointment._id)}
                      disabled={isDeleting}
                      className="p-2 rounded-lg transition hover:opacity-70 disabled:opacity-30"
                      style={{ color: "#ef4444" }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                
              </div>
              
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
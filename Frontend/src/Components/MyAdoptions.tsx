import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useMyAdoptions } from "../Hooks/useAdoption";
import { sileo } from "sileo"; 
import { useAuthStore } from "../Store/AuthStore";

const MyAdoptions = () => {
  const user = useAuthStore((state) => state.user);
  const { data: adoptions, isLoading } = useMyAdoptions();

  // guardamos los estados anteriores para detectar cambios
  const previousStatuses = useRef<Record<string, string>>({});

  useEffect(() => {
    if (!adoptions) return;

    adoptions.forEach((adoption) => {
      const prevStatus = previousStatuses.current[adoption._id];

      
      if (prevStatus && prevStatus !== adoption.status) {
        if (adoption.status === "approved") {
          sileo.success({
            title: `Your adoption request for ${adoption.breedName} was approved! 🎉`,
            fill: "black",
            duration: 5000,
          });
        } else if (adoption.status === "rejected") {
          sileo.error({
            title: `Your adoption request for ${adoption.breedName} was rejected`,
            fill: "black",
            duration: 5000,
          });
        }
      }

      
      previousStatuses.current[adoption._id] = adoption.status;
    });
  }, [adoptions]);

  
  if (!user) return null;

  const statusColor = (status: string) => {
    switch (status) {
      case "pending": return "#eab308";
      case "approved": return "#72cf2a";
      case "rejected": return "#ef4444";
      default: return "#fffef0";
    }
  };

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold mb-8" style={{ color: "#72cf2a" }}>
        My adoption requests
      </h2>

      {isLoading ? (
        <p className="animate-pulse" style={{ color: "#fffef0" }}>Loading...</p>
      ) : !adoptions || adoptions.length === 0 ? (
        <p className="opacity-60" style={{ color: "#fffef0" }}>
          You haven't made any adoption requests yet 🐾
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adoptions.map((adoption) => (
            <motion.div
              key={adoption._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl flex gap-5"
              style={{ backgroundColor: "#151212" }}
            >
              <img
                src={adoption.breedImageUrl}
                alt={adoption.breedName}
                className="w-24 h-24 object-cover rounded-xl flex shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
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
                <p className="text-sm opacity-60 mt-2 line-clamp-2" style={{ color: "#fffef0" }}>
                  "{adoption.message}"
                </p>
                {adoption.doctorMessage && (
  <p className="text-sm mt-2 p-3 rounded-lg" style={{ backgroundColor: "#051d1b", color: "#72cf2a" }}>
    👨‍⚕️ Dr: "{adoption.doctorMessage}"
  </p>
)}
              </div>
              
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAdoptions;

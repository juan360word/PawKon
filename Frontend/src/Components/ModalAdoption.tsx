// src/components/adoption/BreedModal.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { X } from "lucide-react";
import { useAuthStore } from "../Store/AuthStore";
import { useBreedImages } from "../Hooks/useBreed";
import { useCreateAdoption } from "../Hooks/useAdoption";
import { CreateAdoptionSchema } from "../Types/dataTypes";
import type { Breed, createAdoption as AdoptionInput } from "../Types/dataTypes";
import { useTranslation } from "react-i18next";

interface Props {
  breed: Breed;
  onClose: () => void;
}

const BreedModal = ({ breed, onClose }: Props) => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const { data: images } = useBreedImages(breed.id);
  const { mutate: createAdoption, isPending, isSuccess } = useCreateAdoption();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdoptionInput>({
    resolver: valibotResolver(CreateAdoptionSchema),
    defaultValues: {
      breedName: breed.name,
      breedImageUrl: breed.image?.url || "",
      message: "",
    },
  });

  const handleAdoptClick = () => {
    if (!user) {
      // no está logueado — lo mandamos al login
      navigate("/login");
      return;
    }
    // está logueado — mostramos el formulario
    setShowForm(true);
  };

  const onSubmit = (data: AdoptionInput) => {
    createAdoption(data);
  };

  return (
    <AnimatePresence>
      {/* fondo oscuro */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
        {/* contenido del modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-8 relative"
          style={{ backgroundColor: "#151212" }}
        >
          {/* botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full transition hover:opacity-70"
            style={{ backgroundColor: "#051d1b", color: "#72cf2a" }}
          >
            <X size={20} />
          </button>

          {isSuccess ? (
            // ── mensaje de éxito
            <div className="text-center py-16">
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#72cf2a" }}>
                {t("adoption.requestSent")}
              </h2>
              <p className="opacity-70 mb-8" style={{ color: "#fffef0" }}>
                Our team will review your adoption request for {breed.name} soon.
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl font-medium"
                style={{ backgroundColor: "#72cf2a", color: "#051d1b" }}
              >
                Close
              </button>
            </div>
          ) : showForm ? (
            // ── formulario de adopción
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#72cf2a" }}>
                Adopt {breed.name}
              </h2>
              <p className="text-sm opacity-60 mb-6" style={{ color: "#fffef0" }}>
                Tell us why you'd be a great home for this breed
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="I would love to adopt this dog because..."
                  className="w-full px-4 py-3 rounded-xl outline-none resize-none"
                  style={{
                    backgroundColor: "#051d1b",
                    color: "#fffef0",
                    border: "1px solid rgba(114, 207, 42, 0.3)",
                  }}
                />
                {errors.message && (
                  <span className="text-red-400 text-xs">{errors.message.message}</span>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-3 rounded-xl font-medium border"
                    style={{ borderColor: "#72cf2a", color: "#72cf2a" }}
                  >
                    {t("adoption.back")}
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 py-3 rounded-xl font-medium disabled:opacity-50"
                    style={{ backgroundColor: "#72cf2a", color: "#051d1b" }}
                  >
                    {isPending ? t("adoption.sending") : t("adoption.sendRequest")}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // ── detalle de la raza
            <div>
              <img
                src={breed.image?.url}
                alt={breed.name}
                className="w-full h-64 object-cover rounded-2xl mb-6"
              />

              <h2 className="text-3xl font-bold mb-4" style={{ color: "#72cf2a" }}>
                {breed.name}
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl" style={{ backgroundColor: "#051d1b" }}>
                  <p className="text-xs opacity-50 uppercase" style={{ color: "#fffef0" }}>Temperament</p>
                  <p className="text-sm mt-1" style={{ color: "#fffef0" }}>
                    {breed.temperament || "Friendly"}
                  </p>
                </div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: "#051d1b" }}>
                  <p className="text-xs opacity-50 uppercase" style={{ color: "#fffef0" }}>Life span</p>
                  <p className="text-sm mt-1" style={{ color: "#fffef0" }}>{breed.life_span}</p>
                </div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: "#051d1b" }}>
                  <p className="text-xs opacity-50 uppercase" style={{ color: "#fffef0" }}>Weight</p>
                  <p className="text-sm mt-1" style={{ color: "#fffef0" }}>{breed.weight.metric} kg</p>
                </div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: "#051d1b" }}>
                  <p className="text-xs opacity-50 uppercase" style={{ color: "#fffef0" }}>Height</p>
                  <p className="text-sm mt-1" style={{ color: "#fffef0" }}>{breed.height.metric} cm</p>
                </div>
              </div>

              {/* imágenes extra de la raza */}
              {images && images.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {images.slice(0, 3).map((img) => (
                    <img
                      key={img.id}
                      src={img.url}
                      alt={breed.name}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              <button
                onClick={handleAdoptClick}
                className="w-full py-4 rounded-xl font-bold text-lg transition hover:opacity-90"
                style={{ backgroundColor: "#72cf2a", color: "#051d1b" }}
              >
                {t("adoption.adoptMe")}
             </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BreedModal;

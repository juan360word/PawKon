

// src/pages/Adoption.tsx
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { useBreeds } from "../Hooks/useBreed";
import { useAdoptedBreeds } from "../Hooks/useAdoption";
import type { Breed } from "../Types/dataTypes";
import BreedModal from "../Components/ModalAdoption";
import MyAdoptions from "../Components/MyAdoptions";



const Adoption = () => {
  const { data: breeds, isLoading, error } = useBreeds();
  const { data: adoptedData } = useAdoptedBreeds();
  const [search, setSearch] = useState("");
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);

  const adoptedBreeds = adoptedData?.adoptedBreeds || [];

 
  const availableBreeds =
    breeds?.filter((breed) => !adoptedBreeds.includes(breed.name)) || [];

 
  const displayedBreeds = availableBreeds.slice(0, 20);


  const originalFirst20 = breeds?.slice(0, 20).map((b) => b.name) || [];

  const isNewBreed = (breedName: string) => {
    return !originalFirst20.includes(breedName);
  };

  
  const filteredBreeds = displayedBreeds.filter((breed) =>
    breed.name.toLowerCase().includes(search.toLowerCase())
  );

  // animación de entrada de las cards
  useEffect(() => {
    if (breeds) {
      gsap.fromTo(
        ".breed-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
        }
      );
    }
  }, [breeds]);

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#051d1b" }}
      >
        <p className="text-xl animate-pulse" style={{ color: "#72cf2a" }}>
          Loading breeds...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#051d1b" }}
      >
        <p className="text-xl" style={{ color: "#fffef0" }}>
          Something went wrong loading the breeds 😔
        </p>
      </div>
    );
  }

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
          Find your new best friend
        </h1>
        <p
          className="text-lg opacity-70 mb-12 max-w-2xl"
          style={{ color: "#fffef0" }}
        >
          These are our friends currently looking for a home. When one of them
          gets adopted, a new friend joins the list!
        </p>

      
        <input
          type="text"
          placeholder="Search breeds..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-6 py-3 rounded-xl mb-12 outline-none text-base"
          style={{
            backgroundColor: "#151212",
            color: "#fffef0",
            border: "1px solid rgba(114, 207, 42, 0.3)",
          }}
        />

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBreeds?.map((breed) => (
            <div
              key={breed.id}
              onClick={() => setSelectedBreed(breed)}
              className="breed-card rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-105 relative"
              style={{ backgroundColor: "#151212" }}
            >
             
              {isNewBreed(breed.name) && (
                <span
                  className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: "#72cf2a", color: "#051d1b" }}
                >
                  NEW
                </span>
              )}

              <img
                src={breed.image?.url}
                alt={breed.name}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold" style={{ color: "#72cf2a" }}>
                  {breed.name}
                </h3>
                <p
                  className="text-xs opacity-60 mt-1 line-clamp-2"
                  style={{ color: "#fffef0" }}
                >
                  {breed.temperament || "A wonderful companion"}
                </p>
              </div>
            </div>
          ))}
        </div>
        
         <MyAdoptions/>
      
        {filteredBreeds?.length === 0 && (
          <p
            className="text-center text-lg opacity-60 mt-12"
            style={{ color: "#fffef0" }}
          >
            No breeds found matching "{search}"
          </p>
        )}
      </div>

      
      {selectedBreed && (
        <BreedModal
          breed={selectedBreed}
          onClose={() => setSelectedBreed(null)}
        />
      )}
    </div>
  );
};

export default Adoption;

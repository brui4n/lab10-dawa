import RickAndMortyClient from "./RickAndMortyClient";
import { CharacterListResponse } from "../../types/rick-and-morty";
import { IoFlaskOutline } from "react-icons/io5";

async function getInitialCharacters() {
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    cache: "force-cache", // SSG cache force
  });

  if (!res.ok) {
    throw new Error("Failed to fetch initial Rick and Morty characters");
  }

  const data: CharacterListResponse = await res.json();
  return data.results;
}

export default async function RickAndMortyPage() {
  const initialCharacters = await getInitialCharacters();

  return (
    <div className="flex-1 flex flex-col">
      {/* Title section with Portal Graphic style */}
      <section className="relative overflow-hidden py-16 border-b border-white/5 flex flex-col items-center text-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center">
          <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-400 mb-4 tracking-widest uppercase flex items-center gap-2">
            <IoFlaskOutline className="text-sm" /> Dimensión C-137 Base de Datos
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4">
            Personajes de{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              Rick and Morty
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Explora de forma interactiva y veloz a todos los personajes del multiverso. Carga rápida impulsada por SSG con capacidades de búsqueda en tiempo real (CSR).
          </p>
        </div>
      </section>

      {/* Interactive Catalog Client component */}
      <RickAndMortyClient initialCharacters={initialCharacters} />
    </div>
  );
}

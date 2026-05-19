"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Character, CharacterListResponse } from "../../types/rick-and-morty";
import { IoSearch, IoFlaskOutline, IoHeart, IoSkull, IoHelpCircle } from "react-icons/io5";

interface RickAndMortyClientProps {
  initialCharacters: Character[];
}

export default function RickAndMortyClient({ initialCharacters }: RickAndMortyClientProps) {
  // Filter States
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");

  // Data States
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // CSR Real-time Search with Debounce
  useEffect(() => {
    // If no search parameters are defined, load initial pre-rendered characters
    if (!name && !type && !status && !gender) {
      setCharacters(initialCharacters);
      setError(null);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        // Construct API search query params
        const params = new URLSearchParams();
        if (name) params.append("name", name);
        if (type) params.append("type", type);
        if (status) params.append("status", status);
        if (gender) params.append("gender", gender);

        const res = await fetch(`https://rickandmortyapi.com/api/character/?${params.toString()}`);
        
        if (!res.ok) {
          // If status is 404, it means "No results found" in Rick and Morty API
          if (res.status === 404) {
            setCharacters([]);
            setError("No se encontraron personajes interdimensionales que coincidan con la búsqueda.");
            return;
          }
          throw new Error("Error al obtener personajes de la API.");
        }

        const data: CharacterListResponse = await res.json();
        setCharacters(data.results);
      } catch (err: any) {
        setError(err.message || "Ocurrió un error inesperado.");
      } finally {
        setLoading(false);
      }
    }, 400); // 400ms debounce to avoid spamming the API on every keypress

    return () => clearTimeout(delayDebounce);
  }, [name, type, status, gender, initialCharacters]);

  // Reset all filters helper
  const handleReset = () => {
    setName("");
    setType("");
    setStatus("");
    setGender("");
    setCharacters(initialCharacters);
    setError(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex-1 flex flex-col gap-10">
      
      {/* Search and Filters Glassmorphism Panel */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-xl w-full flex flex-col gap-6">
        <h2 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
          <IoFlaskOutline className="animate-bounce" /> Radar de Filtros Interdimensionales
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Name Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nombre</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ej. Rick, Morty, Summer..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all duration-300"
              />
              <IoSearch className="absolute left-4 top-3.5 text-slate-500" size={18} />
            </div>
          </div>

          {/* Type Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tipo / Especie Especial</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ej. Parasite, Clone..."
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all duration-300"
              />
              <IoFlaskOutline className="absolute left-4 top-3.5 text-slate-500" size={18} />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estado de Vida</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all duration-300 appearance-none cursor-pointer"
            >
              <option value="" className="bg-zinc-950">Todos los Estados</option>
              <option value="alive" className="bg-zinc-950">Vivo (Alive)</option>
              <option value="dead" className="bg-zinc-950">Muerto (Dead)</option>
              <option value="unknown" className="bg-zinc-950">Desconocido (Unknown)</option>
            </select>
          </div>

          {/* Gender Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Género</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all duration-300 appearance-none cursor-pointer"
            >
              <option value="" className="bg-zinc-950">Todos los Géneros</option>
              <option value="female" className="bg-zinc-950">Femenino (Female)</option>
              <option value="male" className="bg-zinc-950">Masculino (Male)</option>
              <option value="genderless" className="bg-zinc-950">Sin Género (Genderless)</option>
              <option value="unknown" className="bg-zinc-950">Desconocido (Unknown)</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Link */}
        {(name || type || status || gender) && (
          <button
            onClick={handleReset}
            className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 text-left transition self-start cursor-pointer hover:underline"
          >
            ❌ Limpiar todos los filtros
          </button>
        )}
      </div>

      {/* Characters Gallery */}
      {loading ? (
        // Grid Loading Skeleton Loader
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 animate-pulse flex flex-col gap-4">
              <div className="w-full aspect-square bg-slate-800 rounded-xl" />
              <div className="h-6 bg-slate-800 rounded w-3/4" />
              <div className="h-4 bg-slate-800 rounded w-1/2" />
              <div className="h-4 bg-slate-800 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : error ? (
        // Error Message/No Results Found
        <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-white/5 border border-white/10 rounded-3xl">
          <IoHelpCircle size={72} className="text-emerald-500/50 mb-4 animate-pulse" />
          <h3 className="text-xl font-bold text-white mb-2">Búsqueda sin resultados</h3>
          <p className="text-slate-400 max-w-md">{error}</p>
        </div>
      ) : (
        // Render characters
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((character) => (
            <Link
              key={character.id}
              href={`/rick-and-morty/${character.id}`}
              className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:scale-[1.03] transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Aspect Ratio Box with Lazy Image */}
              <div className="relative aspect-square w-full bg-black/40 overflow-hidden">
                <Image
                  src={character.image}
                  alt={character.name}
                  width={300}
                  height={300}
                  priority={false} // Enable lazy loading under demand
                  loading="lazy"   // Explicit lazy loading declaration
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Float status pills */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold border border-white/10">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      character.status === "Alive"
                        ? "bg-green-500"
                        : character.status === "Dead"
                        ? "bg-red-500"
                        : "bg-slate-500"
                    }`}
                  />
                  <span className="capitalize">{character.status === "Alive" ? "Vivo" : character.status === "Dead" ? "Muerto" : "Incógnito"}</span>
                </div>
              </div>

              {/* Information Body */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold text-white tracking-tight leading-tight group-hover:text-emerald-400 transition duration-300">
                    {character.name}
                  </h3>
                  <p className="text-sm text-slate-400 capitalize mt-1.5 flex items-center gap-1.5">
                    {character.species} • {character.gender === "Male" ? "Macho" : character.gender === "Female" ? "Hembra" : character.gender}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Última Ubicación:</span>
                  <span className="text-sm text-slate-300 font-medium truncate">{character.location.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

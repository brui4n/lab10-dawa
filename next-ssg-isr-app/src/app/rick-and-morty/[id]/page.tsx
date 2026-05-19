import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Character, CharacterListResponse } from "../../../types/rick-and-morty";
import { IoPlanetOutline, IoLocationOutline, IoHeart, IoHelpCircle, IoSkull, IoFilmOutline } from "react-icons/io5";

// Revalidación cada 10 días (ISR) - 10 días * 24 horas * 60 minutos * 60 segundos
export const revalidate = 864000;

interface PokemonPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Fetch single character helper
async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 } // 10 days caching
  });

  if (!res.ok) {
    notFound(); // Activates the custom not-found.tsx page
  }

  return res.json();
}

// Generar rutas estáticas para los personajes de la primera página (SSG)
export async function generateStaticParams() {
  try {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    if (!res.ok) return [];

    const data: CharacterListResponse = await res.json();
    return data.results.map((character) => ({
      id: character.id.toString(),
    }));
  } catch {
    return [];
  }
}

// Dynamic metadata generation
export async function generateMetadata({ params }: PokemonPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const character = await getCharacter(id);
    return {
      title: `${character.name} - Rick & Morty Dex`,
      description: `Ver detalles y biografía interdimensional de ${character.name}.`,
    };
  } catch {
    return {
      title: "Personaje no encontrado - Rick & Morty Dex",
    };
  }
}

export default async function CharacterDetail({ params }: PokemonPageProps) {
  const { id } = await params;
  const character = await getCharacter(id);

  // Status configuration
  const isAlive = character.status === "Alive";
  const isDead = character.status === "Dead";

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
      
      {/* Back Button */}
      <Link
        href="/rick-and-morty"
        className="self-start text-emerald-400 hover:text-emerald-300 font-extrabold mb-8 flex items-center gap-2 transition hover:-translate-x-1"
      >
        ← Volver a la galería
      </Link>

      {/* Main glassmorphism profile card */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row transform transition duration-500 hover:scale-[1.01]">
        
        {/* Left Column: Glowing Avatar */}
        <div className="relative w-full md:w-[350px] aspect-square md:h-auto bg-black/40 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10">
          <Image
            src={character.image}
            alt={character.name}
            width={350}
            height={350}
            priority={true} // Priority loading for above-the-fold detail main image
            className="object-cover w-full h-full"
          />

          {/* Dynamic glowing ring overlay inside the image */}
          <div className={`absolute inset-0 border-4 pointer-events-none ${
            isAlive ? "border-green-500/20" : isDead ? "border-red-500/20" : "border-slate-500/20"
          }`} />
        </div>

        {/* Right Column: Information Body */}
        <div className="p-8 flex-1 flex flex-col justify-between gap-6">
          <div>
            {/* Header ID Index and Status Pill */}
            <div className="flex justify-between items-center mb-3">
              <span className="bg-white/10 text-slate-300 font-mono font-bold text-xs px-3 py-1.5 rounded-full border border-white/5">
                Dimension ID #{character.id.toString().padStart(3, "0")}
              </span>

              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                isAlive 
                  ? "bg-green-500/10 border-green-500/30 text-green-400" 
                  : isDead 
                  ? "bg-red-500/10 border-red-500/30 text-red-400" 
                  : "bg-slate-500/10 border-slate-500/30 text-slate-400"
              }`}>
                {isAlive ? <IoHeart /> : isDead ? <IoSkull /> : <IoHelpCircle />}
                <span className="capitalize">{character.status === "Alive" ? "Vivo" : character.status === "Dead" ? "Muerto" : "Incógnito"}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight mb-2">
              {character.name}
            </h1>

            <p className="text-slate-300 text-lg flex items-center gap-1.5 mb-6">
              <span className="font-semibold text-emerald-400">{character.species}</span>
              <span className="text-slate-500">•</span>
              <span className="capitalize">{character.gender === "Male" ? "Masculino" : character.gender === "Female" ? "Femenino" : character.gender}</span>
              {character.type && (
                <>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 italic">({character.type})</span>
                </>
              )}
            </p>

            {/* Grid properties */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/5">
              
              {/* Origin */}
              <div className="flex gap-3 items-start">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-xl text-emerald-400">
                  <IoPlanetOutline size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Planeta de Origen:</span>
                  <span className="text-base text-slate-200 font-medium leading-tight mt-0.5">{character.origin.name}</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-3 items-start">
                <div className="bg-cyan-500/10 border border-cyan-500/30 p-2.5 rounded-xl text-cyan-400">
                  <IoLocationOutline size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Última Ubicación:</span>
                  <span className="text-base text-slate-200 font-medium leading-tight mt-0.5">{character.location.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Episode appearances */}
          <div className="pt-6 border-t border-white/5 flex flex-col gap-3">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
              <IoFilmOutline className="text-emerald-400" /> Apariciones en Episodios ({character.episode.length})
            </h3>
            
            {/* Scrollable Chip Area */}
            <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-2 custom-scrollbar">
              {character.episode.map((epUrl, idx) => {
                const epNum = epUrl.split("/").pop();
                return (
                  <span
                    key={idx}
                    className="bg-black/40 border border-white/10 hover:border-emerald-500/30 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition duration-300"
                  >
                    Episodio {epNum}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

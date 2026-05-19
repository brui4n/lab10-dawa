import Link from "next/link";
import { IoSkullOutline } from "react-icons/io5";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl max-w-lg w-full text-center flex flex-col items-center transform transition duration-500 hover:scale-[1.01]">
        
        {/* Pulsing Skull Icon Container */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-ping" />
          <div className="relative bg-red-500/10 border border-red-500/30 p-4 rounded-full">
            <IoSkullOutline size={64} className="text-red-400" />
          </div>
        </div>

        <h1 className="text-6xl font-black text-white tracking-tight mb-2">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-red-400 mb-4">
          Pokémon no encontrado
        </h2>

        <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-sm">
          El Pokémon que estás buscando no existe en la base de datos o fue transferido.
        </p>

        <Link
          href="/pokemon"
          className="bg-white hover:bg-gray-100 active:scale-95 text-black font-extrabold px-8 py-3.5 rounded-xl transition-all duration-300 text-center w-full sm:w-auto cursor-pointer"
        >
          Volver al Pokédex
        </Link>
      </div>
    </div>
  );
}
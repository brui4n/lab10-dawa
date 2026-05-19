"use client";

import Link from "next/link";
import { IoWarningOutline } from "react-icons/io5";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl max-w-lg w-full text-center flex flex-col items-center transform transition duration-500 hover:scale-[1.01]">
        
        {/* Pulsing Warning Icon Container */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl animate-ping" />
          <div className="relative bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-full">
            <IoWarningOutline size={64} className="text-yellow-400" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Ocurrió un error
        </h1>

        <p className="text-slate-300 text-lg mb-6 leading-relaxed">
          Hubo un problema al cargar los pokémons.
        </p>

        {/* Dynamic Error Message Box */}
        {error.message && (
          <div className="w-full bg-black/40 border border-red-500/20 rounded-lg p-4 mb-8 text-left font-mono text-sm text-red-300 overflow-x-auto">
            <span className="text-red-400 font-bold block mb-1">Detalle del error:</span>
            {error.message}
            {error.digest && (
              <span className="text-slate-500 text-xs block mt-2">
                Digest ID: {error.digest}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={() => reset()}
            className="flex-1 sm:flex-initial bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-black font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-yellow-500/15 transition-all duration-300 cursor-pointer"
          >
            Reintentar
          </button>

          <Link
            href="/pokemon"
            className="flex-1 sm:flex-initial bg-white/10 hover:bg-white/15 active:scale-95 text-white font-bold px-8 py-3.5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 text-center"
          >
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}


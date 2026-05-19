import Link from "next/link";
import { IoFlameOutline, IoPlanetOutline } from "react-icons/io5";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-950 via-slate-900 to-black text-white font-sans selection:bg-emerald-500 selection:text-black">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <main className="max-w-5xl mx-auto px-6 py-20 flex flex-col items-center text-center relative z-10 gap-16">
        
        {/* Branding header */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-slate-300 tracking-widest uppercase flex items-center gap-2">
            🚀 Laboratorio 10 - Next.js SSG / ISR / CSR
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-none">
            Multiverso{" "}
            <span className="bg-gradient-to-r from-red-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              Digital
            </span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl leading-relaxed mt-2">
            Explora dos universos completamente integrados. Optimización de renderizado avanzada para lograr velocidades instantáneas con interfaces futuristas.
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          
          {/* Pokédex Card */}
          <Link
            href="/pokemon"
            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/30 rounded-3xl p-8 overflow-hidden shadow-xl hover:shadow-[0_0_40px_rgba(239,68,68,0.15)] hover:scale-[1.03] transition-all duration-300 flex flex-col items-center text-center gap-6 cursor-pointer"
          >
            {/* Red Glow Overlay */}
            <div className="absolute -inset-px bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="bg-red-500/10 border border-red-500/30 p-5 rounded-2xl text-red-400 group-hover:scale-110 transition duration-300">
              <IoFlameOutline size={40} className="animate-pulse" />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-extrabold text-white group-hover:text-red-400 transition duration-300">
                Pokédex Nacional
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Base de datos completa de Pokémon con ISR y SSG. Generación estática para 151 criaturas del multiverso original.
              </p>
            </div>

            <span className="mt-2 text-xs font-bold text-red-400 group-hover:translate-x-1 transition duration-300 flex items-center gap-1">
              Acceder al Pokédex →
            </span>
          </Link>

          {/* Rick & Morty Card */}
          <Link
            href="/rick-and-morty"
            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 rounded-3xl p-8 overflow-hidden shadow-xl hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] hover:scale-[1.03] transition-all duration-300 flex flex-col items-center text-center gap-6 cursor-pointer"
          >
            {/* Emerald Glow Overlay */}
            <div className="absolute -inset-px bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-2xl text-emerald-400 group-hover:scale-110 transition duration-300">
              <IoPlanetOutline size={40} />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-extrabold text-white group-hover:text-emerald-400 transition duration-300">
                Rick & Morty Dex
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Buscador interdimensional en tiempo real (CSR) con pre-renderización SSG y revalidación ISR de 10 días.
              </p>
            </div>

            <span className="mt-2 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition duration-300 flex items-center gap-1">
              Abrir Portal →
            </span>
          </Link>
          
        </div>

        {/* Footer */}
        <footer className="text-slate-500 text-xs flex flex-col items-center gap-3">
          <p>© 2026 Laboratorio DAWA. Desarrollado con Next.js App Router y Tailwind CSS v4.</p>
        </footer>

      </main>
    </div>
  );
}

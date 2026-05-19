import { ReactNode } from "react";
import { Metadata } from "next";
import { IoPlanetOutline } from "react-icons/io5";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rick & Morty Portal - Next.js",
  description: "Explora la base de datos interdimensional de personajes",
};

interface RickAndMortyLayoutProps {
  children: ReactNode;
}

export default function RickAndMortyLayout({ children }: RickAndMortyLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-zinc-950 via-slate-900 to-black text-white font-sans selection:bg-emerald-500 selection:text-black">
      {/* Header Sticky Navbar with Portal Glow */}
      <nav className="bg-black/50 border-b border-emerald-500/20 backdrop-blur-md sticky top-0 z-50 shadow-[0_4px_30px_rgba(16,185,129,0.05)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            href="/rick-and-morty"
            className="inline-flex items-center gap-2 text-white text-2xl font-black hover:text-emerald-400 transition-all duration-300 group"
          >
            <IoPlanetOutline size={30} className="text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="tracking-wider bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Rick & Morty Dex
            </span>
          </Link>

          <div className="flex gap-4">
            <Link
              href="/pokemon"
              className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300"
            >
              Pokédex Next.js
            </Link>

            <Link
              href="/rick-and-morty"
              className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300"
            >
              Rick & Morty Dex
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}

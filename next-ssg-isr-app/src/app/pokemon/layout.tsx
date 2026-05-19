import { ReactNode } from "react";
import { Metadata } from "next";
import { IoGameController } from "react-icons/io5";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pokédex - Next.js",
  description: "Explora el mundo Pokémon",
};

interface PokemonLayoutProps {
  children: ReactNode;
}

export default function PokemonLayout({ children }: PokemonLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white font-sans">
      <nav className="bg-black/40 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/pokemon"
            className="inline-flex items-center gap-2 text-white text-2xl font-bold hover:text-purple-400 transition-all duration-300"
          >
            <IoGameController size={28} className="text-purple-500 animate-pulse" />
            <span>Pokédex Next.js</span>
          </Link>
        </div>
      </nav>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}


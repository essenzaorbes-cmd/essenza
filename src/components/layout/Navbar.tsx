"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Heart,
  ShoppingBag,
  Search,
  Menu,
  ChevronRight,
  X,
} from "lucide-react";
import { useCart } from "@/lib/store/useCart";
import Link from "next/link";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistCount] = useState(0); // This could also use a store
  const cartCount = useCart((state) => state.getItemCount());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-essenza/95 backdrop-blur-md shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gold rounded-full flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
              <span className="font-serif text-gold text-sm sm:text-base font-bold group-hover:text-essenza transition-colors duration-300">
                E
              </span>
            </div>
            <span
              className={`font-serif text-xl sm:text-2xl tracking-[0.2em] font-bold transition-colors duration-300 ${
                scrolled ? "text-essenza-cream" : "text-white"
              }`}
            >
              ESSENZA
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/products"
              className={`text-sm tracking-widest uppercase font-medium transition-colors duration-300 hover:text-gold ${
                scrolled
                  ? "text-essenza-cream/80"
                  : "text-white/80"
              }`}
            >
              Catálogo
            </Link>
            {["Mujer", "Hombre", "Marcas", "Nicho"].map(
              (link) => (
                <Link
                  key={link}
                  href={`/products?category=${link.toLowerCase()}`}
                  className={`text-sm tracking-widest uppercase font-medium transition-colors duration-300 hover:text-gold ${
                    scrolled
                      ? "text-essenza-cream/80"
                      : "text-white/80"
                  }`}
                >
                  {link}
                </Link>
              )
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-full transition-colors duration-300 hover:bg-white/10 ${
                scrolled ? "text-essenza-cream" : "text-white"
              }`}
              aria-label="Buscar"
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            {/* Wishlist */}
            <button
              className={`relative p-2 rounded-full transition-colors duration-300 hover:bg-white/10 ${
                scrolled ? "text-essenza-cream" : "text-white"
              }`}
              aria-label="Favoritos"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-essenza text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className={`relative p-2 rounded-full transition-colors duration-300 hover:bg-white/10 ${
                scrolled ? "text-essenza-cream" : "text-white"
              }`}
              aria-label="Carrito"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-essenza text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className={`lg:hidden p-2 rounded-full transition-colors duration-300 hover:bg-white/10 ${
                    scrolled ? "text-essenza-cream" : "text-white"
                  }`}
                  aria-label="Menú"
                >
                  <Menu size={22} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-essenza border-gold/20 w-80"
              >
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <div className="flex flex-col gap-6 mt-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 border-2 border-gold rounded-full flex items-center justify-center">
                      <span className="font-serif text-gold text-base font-bold">
                        E
                      </span>
                    </div>
                    <span className="font-serif text-xl tracking-[0.2em] text-essenza-cream font-bold">
                      ESSENZA
                    </span>
                  </div>
                  {[
                    { label: "Catálogo", href: "/products" },
                    { label: "Mujer", href: "/products?category=mujer" },
                    { label: "Hombre", href: "/products?category=hombre" },
                    { label: "Marcas", href: "/products?category=marcas" },
                  ].map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-essenza-cream/80 text-lg tracking-widest uppercase hover:text-gold transition-colors duration-300 flex items-center gap-3"
                    >
                      <ChevronRight size={16} className="text-gold" />
                      {link.label}
                    </Link>
                  ))}
                  <div className="h-px bg-gold/20 my-4" />
                  <p className="text-essenza-cream/50 text-sm tracking-wider">
                    Envío gratuito en pedidos +100€
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-4 animate-fade-in-up">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Buscar fragancias, marcas, notas..."
                className="pl-12 h-12 bg-white/90 backdrop-blur-sm border-gold/30 rounded-full text-foreground placeholder:text-muted-foreground focus:border-gold"
                autoFocus
              />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

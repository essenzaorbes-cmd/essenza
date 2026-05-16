"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Star,
  ArrowRight,
  ChevronRight,
  Truck,
  Shield,
  RefreshCw,
  Gift,
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Mail,
  X,
  Sparkles,
} from "lucide-react";

/* ─────────────── DATA ─────────────── */

const BRANDS = [
  { name: "Chanel", country: "Francia", logo: "C" },
  { name: "Dior", country: "Francia", logo: "D" },
  { name: "Tom Ford", country: "Estados Unidos / Italia", logo: "TF" },
  { name: "Creed", country: "Francia", logo: "CR" },
  { name: "Acqua di Parma", country: "Italia", logo: "AP" },
  { name: "Guerlain", country: "Francia", logo: "G" },
  { name: "Byredo", country: "Suecia", logo: "B" },
  { name: "Penhaligon's", country: "Inglaterra", logo: "P" },
  { name: "Maison Francis Kurkdjian", country: "Francia", logo: "MFK" },
  { name: "Jo Malone", country: "Inglaterra", logo: "JM" },
  { name: "Amouage", country: "Omán / Francia", logo: "AM" },
  { name: "Le Labo", country: "Francia", logo: "LL" },
];

const PRODUCTS = [
  {
    id: 1,
    name: "N°5 L'Eau",
    brand: "Chanel",
    price: 145,
    category: "mujer",
    image: "/images/product-1.png",
    notes: "Aldehídos, Rosa, Jazmín",
    rating: 4.9,
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Sauvage Elixir",
    brand: "Dior",
    price: 165,
    category: "hombre",
    image: "/images/product-2.png",
    notes: "Pimienta, Sándalo, Ambroxan",
    rating: 4.8,
    badge: "Nuevo",
  },
  {
    id: 3,
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    price: 325,
    category: "unisex",
    image: "/images/product-3.png",
    notes: "Azafrán, Ámbar, Cedro",
    rating: 5.0,
    badge: "Exclusivo",
  },
  {
    id: 4,
    name: "Mon Paris",
    brand: "Yves Saint Laurent",
    price: 120,
    category: "mujer",
    image: "/images/product-4.png",
    notes: "Frambuesa, Peonía, Musgo",
    rating: 4.7,
    badge: null,
  },
  {
    id: 5,
    name: "Oud Wood",
    brand: "Tom Ford",
    price: 280,
    category: "hombre",
    image: "/images/product-5.png",
    notes: "Oud, Pimienta, Cardamomo",
    rating: 4.9,
    badge: "Premium",
  },
  {
    id: 6,
    name: "Colonia Intensa",
    brand: "Acqua di Parma",
    price: 195,
    category: "unisex",
    image: "/images/product-6.png",
    notes: "Bergamota, Neroli, Madera de Cedro",
    rating: 4.6,
    badge: null,
  },
  {
    id: 7,
    name: "Coffret Discovery",
    brand: "Byredo",
    price: 210,
    category: "unisex",
    image: "/images/product-7.png",
    notes: "Set de descubrimiento 5 fragancias",
    rating: 4.8,
    badge: "Edición Limitada",
  },
  {
    id: 8,
    name: "Santal 33",
    brand: "Le Labo",
    price: 275,
    category: "unisex",
    image: "/images/product-8.png",
    notes: "Sándalo, Cedro, Violeta",
    rating: 4.9,
    badge: "Culto",
  },
];

const TESTIMONIALS = [
  {
    name: "Isabella Martínez",
    text: "ESSENZA transformó mi experiencia con los perfumes. La curaduría de marcas importadas es impecable y el envío fue rápido y elegante. Cada paquete se siente como un regalo.",
    rating: 5,
    location: "Madrid, España",
  },
  {
    name: "Andrea Rossi",
    text: "Encontré Baccarat Rouge 540 aquí a un precio increíble. La autenticidad está garantizada y el servicio al cliente es excepcional. Sin duda mi tienda de confianza.",
    rating: 5,
    location: "Roma, Italia",
  },
  {
    name: "Pierre Dubois",
    text: "La selección de fragancias niche es extraordinaria. Desde Creed hasta Penhaligon's, todo en un solo lugar con envío impecable. Recomiendo ESSENZA a todos los amantes de la perfumería.",
    rating: 5,
    location: "París, Francia",
  },
];

/* ─────────────── ANIMATED COUNTER HOOK ─────────────── */

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const step = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

/* ─────────────── NAVBAR ─────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistCount] = useState(3);
  const [cartCount] = useState(2);

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
          <a href="#" className="flex items-center gap-2 group">
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
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {["Inicio", "Mujer", "Hombre", "Marcas", "Nicho", "Ofertas"].map(
              (link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className={`text-sm tracking-widest uppercase font-medium transition-colors duration-300 hover:text-gold ${
                    scrolled
                      ? "text-essenza-cream/80"
                      : "text-white/80"
                  }`}
                >
                  {link}
                </a>
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
            <button
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
            </button>

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
                    "Inicio",
                    "Mujer",
                    "Hombre",
                    "Marcas",
                    "Nicho",
                    "Ofertas",
                  ].map((link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      className="text-essenza-cream/80 text-lg tracking-widest uppercase hover:text-gold transition-colors duration-300 flex items-center gap-3"
                    >
                      <ChevronRight size={16} className="text-gold" />
                      {link}
                    </a>
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

/* ─────────────── HERO ─────────────── */

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-perfume.png"
          alt="Fragancia de lujo"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-xs sm:text-sm tracking-[0.3em] uppercase font-medium">
              Colección 2025
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
            La esencia de la{" "}
            <span className="text-gold-gradient">elegancia</span> importada
          </h1>
          <p className="text-white/70 text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            Descubre fragancias exclusivas importadas de las marcas más prestigiosas a nivel
            internacional. Cada perfume, una obra de arte olfativa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-gold hover:bg-gold-dark text-essenza font-semibold tracking-wider uppercase px-8 h-14 text-sm rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            >
              Explorar Colección
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:border-gold/50 font-semibold tracking-wider uppercase px-8 h-14 text-sm rounded-full backdrop-blur-sm transition-all duration-300"
            >
              Nuestras Marcas
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/40 text-xs tracking-widest uppercase">
          Descubre
        </span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CATEGORY BANNERS ─────────────── */

function CategoryBanners() {
  return (
    <section className="py-16 sm:py-24 bg-essenza-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
            Colecciones
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-essenza mt-3">
            Encuentra tu fragancia
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Women */}
          <a
            href="#mujer"
            className="group relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden img-zoom"
          >
            <img
              src="/images/woman-perfume.png"
              alt="Perfumes para ella"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
                Para Ella
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white mt-2 mb-3">
                Fragancias Femeninas
              </h3>
              <p className="text-white/60 text-sm sm:text-base mb-4 max-w-sm">
                Desde la sofisticación francesa hasta la dulzura italiana, descubre
                perfumes que reflejan tu esencia.
              </p>
              <span className="inline-flex items-center text-gold text-sm tracking-wider uppercase font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                Explorar <ArrowRight size={16} />
              </span>
            </div>
          </a>

          {/* Men */}
          <a
            href="#hombre"
            className="group relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden img-zoom"
          >
            <img
              src="/images/man-perfume.png"
              alt="Perfumes para él"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
                Para Él
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white mt-2 mb-3">
                Fragancias Masculinas
              </h3>
              <p className="text-white/60 text-sm sm:text-base mb-4 max-w-sm">
                Elegancia, fuerza y carácter. Los aromas más distinguidos de las
                grandes marcas importadas.
              </p>
              <span className="inline-flex items-center text-gold text-sm tracking-wider uppercase font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                Explorar <ArrowRight size={16} />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── PRODUCT CARD ─────────────── */

function ProductCard({
  product,
}: {
  product: (typeof PRODUCTS)[0];
}) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="product-card group bg-white rounded-2xl overflow-hidden border border-border/50">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-essenza-cream/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <Badge className="absolute top-4 left-4 bg-gold text-essenza hover:bg-gold-dark text-xs font-semibold tracking-wider uppercase border-0 px-3 py-1">
            {product.badge}
          </Badge>
        )}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 shadow-sm"
          aria-label={liked ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <Heart
            size={18}
            className={
              liked
                ? "fill-red-500 text-red-500"
                : "text-essenza/50"
            }
          />
        </button>
        {/* Quick add overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <Button className="w-full bg-essenza hover:bg-essenza/90 text-essenza-cream rounded-full h-11 text-sm tracking-wider uppercase font-medium shadow-lg">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Añadir al Carrito
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="text-gold text-xs tracking-[0.2em] uppercase font-medium mb-1">
          {product.brand}
        </p>
        <h3 className="font-serif text-lg text-essenza mb-1">{product.name}</h3>
        <p className="text-muted-foreground text-xs mb-3">{product.notes}</p>
        <div className="flex items-center justify-between">
          <span className="text-essenza font-semibold text-lg">
            {product.price}€
          </span>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-gold text-gold" />
            <span className="text-sm text-muted-foreground">
              {product.rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── FEATURED PRODUCTS ─────────────── */

function FeaturedProducts() {
  const [filter, setFilter] = useState<"todos" | "mujer" | "hombre" | "unisex">(
    "todos"
  );

  const filtered =
    filter === "todos"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === filter);

  return (
    <section id="inicio" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
            Selección Curada
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-essenza mt-3 mb-4">
            Fragancias destacadas
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Nuestros expertos han seleccionado las piezas más codiciadas de las
            mejores marcas de perfumería importada.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {(
            [
              { key: "todos", label: "Todos" },
              { key: "mujer", label: "Para Ella" },
              { key: "hombre", label: "Para Él" },
              { key: "unisex", label: "Unisex" },
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-6 py-2.5 rounded-full text-sm tracking-wider uppercase font-medium transition-all duration-300 ${
                filter === key
                  ? "bg-essenza text-essenza-cream shadow-lg"
                  : "bg-essenza-cream text-essenza/70 hover:bg-gold/10 hover:text-gold"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-essenza text-essenza hover:bg-essenza hover:text-essenza-cream rounded-full px-10 h-12 tracking-wider uppercase text-sm font-medium transition-all duration-300"
          >
            Ver Toda la Colección
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── BRANDS MARQUEE ─────────────── */

function BrandsMarquee() {
  return (
    <section id="marcas" className="py-16 sm:py-20 bg-essenza overflow-hidden">
      <div className="text-center mb-12">
        <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
          Excelencia Importada
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-essenza-cream mt-3">
          Las mejores marcas del mundo
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-essenza to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-essenza to-transparent z-10" />

        <div className="flex animate-marquee">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex-shrink-0 mx-4 sm:mx-6 group"
            >
              <div className="flex flex-col items-center gap-3 px-6 sm:px-10 py-6 rounded-xl border border-white/10 hover:border-gold/40 transition-all duration-300 hover:bg-white/5 min-w-[140px] sm:min-w-[180px]">
                <div className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                  <span className="text-gold font-serif text-lg font-bold">
                    {brand.logo}
                  </span>
                </div>
                <span className="text-essenza-cream text-sm tracking-wider font-medium">
                  {brand.name}
                </span>
                <span className="text-essenza-cream/40 text-[10px] tracking-wider uppercase">
                  {brand.country}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── STATS ─────────────── */

function Stats() {
  const stat1 = useCountUp(250, 2000);
  const stat2 = useCountUp(45, 2000);
  const stat3 = useCountUp(100, 2000);
  const stat4 = useCountUp(15, 2000);

  const stats = [
    { ...stat1, label: "Fragancias", suffix: "+" },
    { ...stat2, label: "Marcas Importadas", suffix: "" },
    { ...stat3, label: "Autenticidad", suffix: "%" },
    { ...stat4, label: "Países de Envío", suffix: "+" },
  ];

  return (
    <section className="py-16 sm:py-20 bg-essenza-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} ref={stat.ref} className="text-center">
              <div className="font-serif text-4xl sm:text-5xl md:text-6xl text-essenza mb-2">
                {stat.count}
                <span className="text-gold">{stat.suffix}</span>
              </div>
              <p className="text-muted-foreground text-sm tracking-wider uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── LUXURY BANNER ─────────────── */

function LuxuryBanner() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-essenza rounded-3xl overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/hero-perfume.png"
              alt="Experiencia de lujo"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-essenza via-essenza/90 to-essenza/60" />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 sm:p-12 md:p-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-gold" size={20} />
                <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
                  Exclusivo ESSENZA
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-essenza-cream leading-tight mb-6">
                Descubrimiento Olfativo Personalizado
              </h2>
              <p className="text-essenza-cream/60 text-base sm:text-lg leading-relaxed mb-8">
                Nuestros sommeliers de fragancias crean experiencias únicas
                adaptadas a tu personalidad. Reserva una consulta privada y
                deja que te guiemos en un viaje sensorial por las marcas importadas
                más exclusivas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gold hover:bg-gold-dark text-essenza font-semibold tracking-wider uppercase px-8 h-12 text-sm rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold/20">
                  Reservar Consulta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-essenza-cream hover:bg-white/10 hover:border-gold/40 rounded-full px-8 h-12 text-sm tracking-wider uppercase transition-all duration-300"
                >
                  Más Información
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Truck, title: "Envío Gratis", desc: "En pedidos +100€" },
                {
                  icon: Shield,
                  title: "100% Auténtico",
                  desc: "Garantía de originalidad",
                },
                {
                  icon: RefreshCw,
                  title: "Devoluciones",
                  desc: "30 días para devolver",
                },
                {
                  icon: Gift,
                  title: "Empaque Regalo",
                  desc: "Presentación de lujo",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-gold/30 transition-all duration-300 group"
                >
                  <Icon
                    size={28}
                    className="text-gold mb-3 group-hover:scale-110 transition-transform duration-300"
                  />
                  <h4 className="text-essenza-cream font-medium text-sm mb-1">
                    {title}
                  </h4>
                  <p className="text-essenza-cream/50 text-xs">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── TESTIMONIALS ─────────────── */

function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-essenza-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
            Testimonios
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-essenza mt-3 mb-4">
            Lo que dicen nuestros clientes
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 border border-border/50 hover:shadow-xl hover:shadow-gold/5 transition-all duration-500 group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    className="fill-gold text-gold"
                  />
                ))}
              </div>
              <p className="text-essenza/70 text-sm sm:text-base leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <span className="text-gold font-serif font-bold text-sm">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="text-essenza font-medium text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── NEWSLETTER ─────────────── */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
          Newsletter
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-essenza mt-3 mb-4">
          Recibe ofertas exclusivas
        </h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Sé el primero en conocer nuevos lanzamientos, ediciones limitadas y
          descuentos especiales. Suscríbete y recibe un 10% en tu primera
          compra.
        </p>
        {subscribed ? (
          <div className="bg-gold/10 border border-gold/30 rounded-2xl p-8 animate-fade-in-up">
            <Sparkles className="text-gold mx-auto mb-3" size={32} />
            <h3 className="font-serif text-2xl text-essenza mb-2">
              ¡Bienvenido a ESSENZA!
            </h3>
            <p className="text-muted-foreground text-sm">
              Revisa tu correo para confirmar tu suscripción y obtener tu
              descuento del 10%.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-full px-6 border-border/50 focus:border-gold bg-essenza-cream/50"
              required
            />
            <Button
              type="submit"
              className="bg-essenza hover:bg-essenza/90 text-essenza-cream rounded-full h-12 px-8 font-semibold tracking-wider uppercase text-sm transition-all duration-300"
            >
              Suscribirse
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ─────────────── FOOTER ─────────────── */

function Footer() {
  return (
    <footer className="bg-essenza pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
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
            <p className="text-essenza-cream/50 text-sm leading-relaxed mb-6">
              Perfumería de lujo desde el corazón de Europa. Fragancias
              auténticas de las maisons más prestigiosas del mundo.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-essenza-cream/50 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300"
                  aria-label="Red social"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-essenza-cream font-semibold text-sm tracking-wider uppercase mb-4">
              Tienda
            </h4>
            <ul className="space-y-3">
              {[
                "Perfumes Mujer",
                "Perfumes Hombre",
                "Fragancias Unisex",
                "Marcas Nicho",
                "Sets y Regalos",
                "Novedades",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-essenza-cream/50 text-sm hover:text-gold transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-essenza-cream font-semibold text-sm tracking-wider uppercase mb-4">
              Empresa
            </h4>
            <ul className="space-y-3">
              {[
                "Sobre Nosotros",
                "Blog de Fragancias",
                "Trabaja con Nosotros",
                "Programa de Afiliados",
                "Prensa",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-essenza-cream/50 text-sm hover:text-gold transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-essenza-cream font-semibold text-sm tracking-wider uppercase mb-4">
              Contacto
            </h4>
            <ul className="space-y-3">
              {[
                {
                  icon: MapPin,
                  text: "Calle Gran Vía 42, 28013 Madrid",
                },
                { icon: Phone, text: "+34 912 345 678" },
                { icon: Mail, text: "hola@essenza.es" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon
                    size={16}
                    className="text-gold mt-0.5 flex-shrink-0"
                  />
                  <span className="text-essenza-cream/50 text-sm">{text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-essenza-cream/40 text-xs mb-2">
                Horario de Atención
              </p>
              <p className="text-essenza-cream/70 text-sm">
                Lun — Vie: 9:00 — 20:00
              </p>
              <p className="text-essenza-cream/70 text-sm">
                Sáb: 10:00 — 18:00
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-essenza-cream/30 text-xs tracking-wider">
            © 2025 ESSENZA. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {["Privacidad", "Términos", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-essenza-cream/30 text-xs hover:text-gold transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────── MAIN PAGE ─────────────── */

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CategoryBanners />
        <FeaturedProducts />
        <BrandsMarquee />
        <Stats />
        <LuxuryBanner />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

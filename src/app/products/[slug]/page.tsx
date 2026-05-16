import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*, brands(name)")
    .eq("slug", params.slug)
    .single();

  if (!product) return notFound();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-essenza-cream/50 rounded-3xl p-8 flex items-center justify-center">
            <img 
              src={product.images?.[0] || "/images/placeholder.png"} 
              alt={product.name} 
              className="max-w-full max-h-[600px] object-contain"
            />
          </div>
          {/* Details */}
          <div>
            <p className="text-gold text-xs tracking-[0.2em] uppercase font-medium mb-2">
              {product.brands?.name || 'Marca'}
            </p>
            <h1 className="font-serif text-4xl text-essenza mb-4">{product.name}</h1>
            <p className="text-2xl text-essenza font-medium mb-6">{product.price}€</p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>
            
            <button className="w-full bg-essenza hover:bg-essenza/90 text-essenza-cream rounded-full h-14 tracking-wider uppercase font-medium shadow-lg transition-all">
              Añadir al Carrito
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

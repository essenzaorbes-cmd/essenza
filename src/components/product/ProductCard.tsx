"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/lib/store/useCart";
import Link from "next/link";
import { toast } from "sonner"; // If sonner is available, else we can skip

export function ProductCard({
  product,
}: {
  product: any; // We'll type this as any to fit Supabase schema for now
}) {
  const [liked, setLiked] = useState(false);
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image || product.images?.[0] || "/images/placeholder.png",
    });
    toast.success(`${product.name} añadido al carrito`);
  };

  return (
    <div className="product-card group bg-white rounded-2xl overflow-hidden border border-border/50">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-essenza-cream/50">
        <Link href={`/products/${product.slug || product.id}`}>
          <img
            src={product.image || product.images?.[0] || "/images/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
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
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-essenza hover:bg-essenza/90 text-essenza-cream rounded-full h-11 text-sm tracking-wider uppercase font-medium shadow-lg"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Añadir al Carrito
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="text-gold text-xs tracking-[0.2em] uppercase font-medium mb-1">
          {product.brand || product.brands?.name || 'Marca'}
        </p>
        <Link href={`/products/${product.slug || product.id}`}>
          <h3 className="font-serif text-lg text-essenza mb-1 hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted-foreground text-xs mb-3">{product.notes || product.description?.substring(0, 50)}</p>
        <div className="flex items-center justify-between">
          <span className="text-essenza font-semibold text-lg">
            {product.price}€
          </span>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-gold text-gold" />
            <span className="text-sm text-muted-foreground">
              {product.rating || product.rating_avg || '5.0'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

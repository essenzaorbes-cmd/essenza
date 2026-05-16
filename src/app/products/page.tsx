import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";
import { ProductCard } from "@/components/product/ProductCard";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const supabase = await createClient();
  const category = searchParams.category;

  let query = supabase.from("products").select("*, brands(name)");

  if (category && category !== "todos") {
    query = query.eq("category", category);
  }

  const { data: products } = await query;

  return (
    <div className="min-h-screen flex flex-col bg-essenza-cream">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h1 className="font-serif text-4xl text-essenza mb-8">
          Catálogo {category ? `- ${category}` : ""}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {!products || products.length === 0 ? (
            <p className="text-muted-foreground col-span-full">No se encontraron productos.</p>
          ) : null}
        </div>
      </main>
    </div>
  );
}

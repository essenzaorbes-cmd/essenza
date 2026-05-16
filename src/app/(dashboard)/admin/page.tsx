import { createClient } from "@/lib/supabase/server";
import { Package, ShoppingCart, DollarSign, Users } from "lucide-react";

export default async function AdminDashboard() {
  // In a real app, we would fetch these from Supabase
  // using COUNT() and SUM() aggregations. For now we use placeholder metrics.
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Resumen general de tu tienda ESSENZA.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-500">Ventas Totales</h3>
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
              <DollarSign size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">€0.00</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-500">Órdenes</h3>
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <ShoppingCart size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-500">Productos</h3>
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <Package size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-500">Clientes</h3>
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <Users size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
      </div>
    </div>
  );
}

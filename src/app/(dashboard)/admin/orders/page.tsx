import { createClient } from "@/lib/supabase/server";
import { Eye, Edit } from "lucide-react";

export default async function AdminOrders() {
  const supabase = await createClient();
  const { data: orders } = await supabase.from("orders").select("*, profiles(first_name, last_name, email)").order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transacciones</h1>
          <p className="mt-1 text-sm text-gray-500">Gestiona y visualiza las órdenes de compra de tus clientes.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">ID Orden</th>
                <th className="px-6 py-4">Cliente / Email</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders?.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-900 font-medium">
                    {order.order_number || order.id.substring(0, 8)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900 font-medium">
                      {order.profiles ? `${order.profiles.first_name} ${order.profiles.last_name}` : 'Invitado'}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {order.profiles?.email || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(order.created_at).toLocaleDateString('es-ES', {
                      day: '2-digit', month: 'short', year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{order.total}€</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'paid' ? 'bg-green-100 text-green-800' : 
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status === 'paid' ? 'Pagado' :
                       order.status === 'pending' ? 'Pendiente' :
                       order.status === 'shipped' ? 'Enviado' : order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors" title="Ver detalles">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors" title="Actualizar estado">
                        <Edit size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!orders || orders.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No hay transacciones registradas todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

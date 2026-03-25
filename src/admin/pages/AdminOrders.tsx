import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { toast } from "@/components/ui/sonner";

type Order = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  products: Array<{ productId?: string; name: string; qty: number; price: number }>;
  totalAmount: number;
  status: "Pending" | "Shipped" | "Delivered";
  createdAt: string;
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders");
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateStatus = async (id: string, status: Order["status"]) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        toast.error("Status update failed");
        return;
      }
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
      toast.success("Order updated");
    } catch {
      toast.error("Network error");
    }
  };

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl md:text-3xl mb-6">Orders</h1>
      <div className="bg-brand-cream border border-border/50 p-6">
        {loading ? (
          <div className="text-sm text-brand-warm-gray">Loading…</div>
        ) : orders.length === 0 ? (
          <div className="text-sm text-brand-warm-gray">No orders yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left">
                <tr className="border-b border-border/50">
                  <th className="py-2 pr-4">Customer</th>
                  <th className="py-2 pr-4">Phone</th>
                  <th className="py-2 pr-4">Products</th>
                  <th className="py-2 pr-4">Total</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Created</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-border/30">
                    <td className="py-2 pr-4">{o.customerName}</td>
                    <td className="py-2 pr-4">{o.phone}</td>
                    <td className="py-2 pr-4">
                      <div className="space-y-1">
                        {o.products.map((p, idx) => (
                          <div key={idx}>
                            {p.name} ×{p.qty} — ₹{p.price.toLocaleString("en-IN")}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-2 pr-4">₹{o.totalAmount.toLocaleString("en-IN")}</td>
                    <td className="py-2 pr-4">
                      <select
                        value={o.status}
                        onChange={(e) => updateStatus(o.id, e.target.value as Order["status"])}
                        className="border border-border px-2 py-1 bg-background"
                      >
                        <option>Pending</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                      </select>
                    </td>
                    <td className="py-2 pr-4">{new Date(o.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;

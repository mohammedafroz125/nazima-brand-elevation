import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";

const AdminDashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [pRes, oRes] = await Promise.all([
          fetch("http://localhost:5000/api/products"),
          fetch("http://localhost:5000/api/orders"),
        ]);
        const pData = await pRes.json();
        const oData = await oRes.json();
        setProductCount(Array.isArray(pData) ? pData.length : 0);
        setOrderCount(Array.isArray(oData) ? oData.length : 0);
        const total = Array.isArray(oData) ? oData.reduce((sum, o) => sum + (o.totalAmount || 0), 0) : 0;
        setRevenue(total);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stats = [
    { label: "Total Products", value: productCount },
    { label: "Total Orders", value: orderCount },
    { label: "Total Revenue", value: `₹${revenue.toLocaleString("en-IN")}` },
  ];

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl md:text-3xl mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-brand-cream border border-border/50 p-6">
            <div className="text-sm font-body uppercase tracking-wide text-brand-warm-gray">{s.label}</div>
            <div className="mt-2 font-display text-2xl text-brand-charcoal">
              {loading && typeof s.value === "number" ? "…" : s.value}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

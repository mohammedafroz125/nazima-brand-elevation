import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { toast } from "@/components/ui/sonner";

type User = { id: string; name: string; phone: string; email: string };

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users");
        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl md:text-3xl mb-6">Users</h1>
      <div className="bg-brand-cream border border-border/50 p-6">
        {loading ? (
          <div className="text-sm text-brand-warm-gray">Loading…</div>
        ) : users.length === 0 ? (
          <div className="text-sm text-brand-warm-gray">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left">
                <tr className="border-b border-border/50">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Phone</th>
                  <th className="py-2 pr-4">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-border/30">
                    <td className="py-2 pr-4">{u.name}</td>
                    <td className="py-2 pr-4">{u.phone}</td>
                    <td className="py-2 pr-4">{u.email}</td>
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

export default AdminUsers;

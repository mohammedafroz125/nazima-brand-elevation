import { NavLink } from "react-router-dom";
import { LayoutGrid, Package, Receipt, Users } from "lucide-react";

const AdminSidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-brand-cream border-r border-border/50 z-40">
      <div className="h-20 md:h-24 flex items-center px-6 border-b border-border/50">
        <div className="flex flex-col">
          <span className="font-display text-xl italic text-brand-charcoal">StyledByNazima</span>
          <span className="text-[10px] tracking-[0.3em] text-brand-gold uppercase">Admin</span>
        </div>
      </div>
      <nav className="px-4 py-6 space-y-1">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded transition-colors ${
              isActive ? "bg-brand-charcoal text-brand-ivory" : "text-brand-charcoal hover:bg-brand-charcoal/10"
            }`
          }
        >
          <LayoutGrid size={18} />
          <span className="text-sm font-body uppercase tracking-wide">Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded transition-colors ${
              isActive ? "bg-brand-charcoal text-brand-ivory" : "text-brand-charcoal hover:bg-brand-charcoal/10"
            }`
          }
        >
          <Package size={18} />
          <span className="text-sm font-body uppercase tracking-wide">Products</span>
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded transition-colors ${
              isActive ? "bg-brand-charcoal text-brand-ivory" : "text-brand-charcoal hover:bg-brand-charcoal/10"
            }`
          }
        >
          <Receipt size={18} />
          <span className="text-sm font-body uppercase tracking-wide">Orders</span>
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded transition-colors ${
              isActive ? "bg-brand-charcoal text-brand-ivory" : "text-brand-charcoal hover:bg-brand-charcoal/10"
            }`
          }
        >
          <Users size={18} />
          <span className="text-sm font-body uppercase tracking-wide">Users</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;

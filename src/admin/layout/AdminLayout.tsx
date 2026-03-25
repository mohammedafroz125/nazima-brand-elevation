import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState<boolean>(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("admin_authed") === "1";
    setAuthed(loggedIn);
    if (!loggedIn) navigate("/admin/login", { replace: true });
  }, [navigate]);

  if (!authed) return null;

  return (
    <div className="min-h-screen bg-background text-brand-charcoal">
      <AdminSidebar />
      <div className="ml-64">
        <header className="h-20 md:h-24 border-b border-border/50 bg-background flex items-center justify-end px-6">
          <button
            onClick={() => {
              localStorage.removeItem("admin_authed");
              navigate("/admin/login", { replace: true });
            }}
            className="px-4 py-2 border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-ivory transition-colors text-sm uppercase tracking-wide"
          >
            Logout
          </button>
        </header>
        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;

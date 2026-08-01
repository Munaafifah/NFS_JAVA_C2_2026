import { NavLink, Outlet, useNavigate } from "react-router-dom";
import AppHeader from "./AppHeader";
import { useAuth } from "../context/AuthContext";

export default function AppShell() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell">
      <AppHeader />

      <nav className="app-nav">
        <NavLink
          to="/app/dashboard"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/app/tickets"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Tickets
        </NavLink>
        <NavLink
          to="/app/reports"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Reports
        </NavLink>
        <NavLink
          to="/docs"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          API Docs
        </NavLink>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "12px" }}>
          {user && <span style={{ color: "#667085", fontSize: "0.9rem" }}>{user.email}</span>}
          <button type="button" className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}
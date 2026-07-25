import { NavLink, Outlet } from "react-router-dom";

export default function AppShell() {
  return (
    <div>
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
      </nav>

      <Outlet />
    </div>
  );
}
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TicketsPage from "./pages/TicketsPage";
import TicketFormPage from "./pages/TicketFormPage";
import ReportsPage from "./pages/ReportsPage";
import DocsPage from "./pages/DocsPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppShell from "./components/AppShell";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/docs" element={<DocsPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppShell />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="tickets/new" element={<TicketFormPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
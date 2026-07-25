import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TicketsPage from "./pages/TicketsPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app/dashboard" element={<DashboardPage />} />
        <Route path="/app/tickets" element={<TicketsPage />} />
      </Routes>
    </Layout>
  );
}
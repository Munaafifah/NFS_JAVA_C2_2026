import { useState } from "react";
import Layout from "./components/Layout";
import TicketList from "./components/TicketList";
import TicketDetail from "./components/TicketDetail";
import TicketFilterPanel from "./components/TicketFilterPanel";
import { sampleTickets } from "./data/sampleTickets";
import "./App.css";

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  const filteredTickets = sampleTickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchText.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "ALL" || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const selectedTicket = filteredTickets.find((t) => t.id === selectedId);

  return (
    <Layout>
      <TicketFilterPanel
        searchText={searchText}
        onSearchChange={setSearchText}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
      />
      <div className="workspace-grid">
        <TicketList
          tickets={filteredTickets}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <TicketDetail ticket={selectedTicket} />
      </div>
    </Layout>
  );
}
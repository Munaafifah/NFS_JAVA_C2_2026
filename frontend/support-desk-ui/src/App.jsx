import { useState } from "react";
import Layout from "./components/Layout";
import TicketList from "./components/TicketList";
import TicketDetail from "./components/TicketDetail";
import { sampleTickets } from "./data/sampleTickets";

export default function App() {
  const [selectedId, setSelectedId] = useState(null);

  const selectedTicket = sampleTickets.find((t) => t.id === selectedId);

  return (
    <Layout>
      <TicketList
        tickets={sampleTickets}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <TicketDetail ticket={selectedTicket} />
    </Layout>
  );
}
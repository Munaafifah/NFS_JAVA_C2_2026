import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

export default function TicketList({ tickets, selectedId, onSelect }) {
  if (tickets.length === 0) {
    return <p className="empty-state">No tickets match your filters.</p>;
  }

  return (
    <div className="asset-list">
      {tickets.map((ticket) => (
        <button
          key={ticket.id}
          className={`asset-row ${ticket.id === selectedId ? "selected" : ""}`}
          onClick={() => onSelect(ticket.id)}
        >
          <div>
            <div className="row-heading">
              <strong>{ticket.title}</strong>
            </div>
            <span>{ticket.category} · {ticket.createdAt}</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <PriorityBadge priority={ticket.priority} />
            <StatusBadge status={ticket.status} />
          </div>
        </button>
      ))}
    </div>
  );
}
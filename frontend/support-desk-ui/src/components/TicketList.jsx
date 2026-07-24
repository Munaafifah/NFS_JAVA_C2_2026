import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

export default function TicketList({ tickets, selectedId, onSelect }) {
  return (
    <ul>
      {tickets.map((ticket) => (
        <li
          key={ticket.id}
          onClick={() => onSelect(ticket.id)}
          style={{
            cursor: "pointer",
            fontWeight: ticket.id === selectedId ? "bold" : "normal"
          }}
        >
          {ticket.title} <PriorityBadge priority={ticket.priority} /> <StatusBadge status={ticket.status} />
        </li>
      ))}
    </ul>
  );
}
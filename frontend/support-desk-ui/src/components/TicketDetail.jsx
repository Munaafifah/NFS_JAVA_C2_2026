import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

export default function TicketDetail({ ticket }) {
  if (!ticket) {
    return <p>Select a ticket to see details.</p>;
  }

  return (
    <div>
      <h2>{ticket.title}</h2>
      <p>Category: {ticket.category}</p>
      <p>
        Priority: <PriorityBadge priority={ticket.priority} /> &nbsp;
        Status: <StatusBadge status={ticket.status} />
      </p>
      <p>Created by: {ticket.createdBy}</p>
      <p>Created at: {ticket.createdAt}</p>
    </div>
  );
}
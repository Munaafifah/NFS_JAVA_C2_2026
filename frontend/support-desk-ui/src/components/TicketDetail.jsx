import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

export default function TicketDetail({ ticket }) {
  if (!ticket) {
    return <p className="empty-state">Select a ticket to see details.</p>;
  }

  return (
    <div className="card">
      <h2>{ticket.title}</h2>
      <dl className="detail-list">
        <div>
          <dt>Category</dt>
          <dd>{ticket.category}</dd>
        </div>
        <div>
          <dt>Priority</dt>
          <dd><PriorityBadge priority={ticket.priority} /></dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd><StatusBadge status={ticket.status} /></dd>
        </div>
        <div>
          <dt>Created by</dt>
          <dd>{ticket.createdBy}</dd>
        </div>
        <div>
          <dt>Created at</dt>
          <dd>{ticket.createdAt}</dd>
        </div>
      </dl>
    </div>
  );
}
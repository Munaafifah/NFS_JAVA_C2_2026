export default function PriorityBadge({ priority }) {
  return (
    <span className={`status-badge priority-${priority.toLowerCase()}`}>
      {priority}
    </span>
  );
}
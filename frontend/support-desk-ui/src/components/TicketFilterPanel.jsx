export default function TicketFilterPanel({
  searchText,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange
}) {
  return (
    <div className="filter-panel">
      <label>
        Search
        <input
          type="text"
          placeholder="Search by title or category"
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <label>
        Status
        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="ALL">All Statuses</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="CLOSED">Closed</option>
        </select>
      </label>

      <label>
        Priority
        <select
          value={priorityFilter}
          onChange={(event) => onPriorityChange(event.target.value)}
        >
          <option value="ALL">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </label>
    </div>
  );
}
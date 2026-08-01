export function filterTickets(tickets, searchText, statusFilter, priorityFilter) {
  const normalizedSearch = searchText.trim().toLowerCase();

  return tickets.filter((ticket) => {
    const matchesSearch =
      !normalizedSearch ||
      ticket.title.toLowerCase().includes(normalizedSearch) ||
      ticket.category.toLowerCase().includes(normalizedSearch);

    const matchesStatus = statusFilter === 'ALL' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'ALL' || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });
}

export function countByStatus(tickets, status) {
  return tickets.filter((ticket) => ticket.status === status).length;
}
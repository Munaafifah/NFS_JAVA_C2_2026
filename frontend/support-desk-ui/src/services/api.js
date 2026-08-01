export async function fetchApiInfo() {
  const response = await fetch('/api/v1/info');

  if (!response.ok) {
    throw new Error('Failed to load API info');
  }

  return response.json();
}

export async function createTicket(token, ticketData) {
  const response = await fetch('/api/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(ticketData)
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || 'Failed to create ticket');
  }

  return response.json();
}

export async function fetchTickets(token) {
  const response = await fetch('/api/tickets', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to load tickets');
  }

  return response.json();
}

export async function fetchApiDocs() {
  const response = await fetch('/api/docs');

  if (!response.ok) {
    throw new Error('Failed to load API docs');
  }

  return response.json();
}

export async function fetchTicketReports(token) {
  const [byStatus, byPriority] = await Promise.all([
    fetch('/api/v1/reports/tickets-by-status', {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      if (!res.ok) throw new Error('Failed to load status report');
      return res.json();
    }),
    fetch('/api/v1/reports/tickets-by-priority', {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      if (!res.ok) throw new Error('Failed to load priority report');
      return res.json();
    })
  ]);

  return { byStatus, byPriority };
}

export async function fetchTicketById(id, token) {
  const response = await fetch(`/api/tickets/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to load ticket');
  }

  return response.json();
}

export async function updateTicket(id, token, payload) {
  const response = await fetch(`/api/tickets/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || 'Failed to update ticket');
  }

  return response.json();
}
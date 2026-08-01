import { apiRequest, buildQueryString } from './httpClient.js';

export async function fetchApiInfo() {
  return apiRequest('/api/v1/info');
}

export async function fetchApiDocs() {
  return apiRequest('/api/docs');
}

export async function fetchTickets(token) {
  return apiRequest('/api/tickets', { token });
}

export async function fetchTicketById(id, token) {
  return apiRequest(`/api/tickets/${id}`, { token });
}

export async function createTicket(token, ticketData) {
  return apiRequest('/api/tickets', {
    method: 'POST',
    token,
    body: ticketData
  });
}

export async function updateTicket(id, token, payload) {
  return apiRequest(`/api/tickets/${id}`, {
    method: 'PUT',
    token,
    body: payload
  });
}

export async function fetchTicketReports(token) {
  const [byStatus, byPriority] = await Promise.all([
    apiRequest('/api/v1/reports/tickets-by-status', { token }),
    apiRequest('/api/v1/reports/tickets-by-priority', { token })
  ]);

  return { byStatus, byPriority };
}

export async function fetchPagedTickets(token, params) {
  const queryString = buildQueryString({
    page: params.page,
    size: params.size,
    sortBy: params.sortBy,
    direction: params.direction
  });

  return apiRequest(`/api/tickets/paged?${queryString}`, { token });
}
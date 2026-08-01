
---

## Day 14 Exercise 01 - Create API Client Layer

### What Was Added
- Created `src/services/httpClient.js` with a reusable `apiRequest(path, options)` function that centralizes request method, JWT `Authorization` header, JSON request body serialization, JSON response parsing (checked against the response's content-type), and backend error message extraction from `ApiErrorResponse`
- Added a `buildQueryString(params)` helper for constructing query strings from an object, skipping undefined/null/empty values
- Rewrote every function in `src/services/api.js` (`fetchApiInfo`, `fetchApiDocs`, `fetchTickets`, `fetchTicketById`, `createTicket`, `updateTicket`, `fetchTicketReports`) to call `apiRequest` instead of repeating `fetch`, header, and `.json()` logic individually
- Verified no behavior changed by re-testing the full flow: login, viewing tickets, creating a ticket, editing a ticket, viewing reports, and viewing API docs

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day14](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day14)

---
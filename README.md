## Day 8 Exercise 3 - Add Ticket Indexes and Logging

### What Was Added
**Ticket.java** *(updated)*
- Added `@Indexed` to `category`, `priority`, `status`, `createdBy`, and `createdAt` — these are the fields most commonly used for filtering and sorting
- `title`, `description`, and `id` left unindexed since they aren't used for filtering

**application-local.properties** *(already present)*
- `spring.data.mongodb.auto-index-creation=true` was already configured from Exercise 1/2 setup

**TicketService.java** *(updated)*
- Added an SLF4J `Logger`
- `getAllTickets()` logs the incoming filter values (`status`, `priority`, `category`)
- `getPagedTickets()` logs the pagination parameters (`page`, `size`, `sortBy`, `direction`)
- `createTicket()` logs the newly created ticket's ID after saving
- No passwords, tokens, or sensitive data included in any log line

---
### Output Screenshot
![Day 8 Exercise 3 Output](screenshots/Day8/D8_Exercise03.png)

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day8](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day8)

---


## Day 8 Exercise 4 - Query Test File and Notes

### What Was Added
**day08-tickets.http** *(updated)*
- Added all 7 required requests: get all tickets, filter by status/priority/category, and three paginated requests (page 0 size 5, page 1 size 5, page 0 size 5 sorted by createdAt descending)
- Also includes extra pagination requests (size 2, sorted by title ascending) for additional coverage

---
### Notes

**1. Which query parameters did you implement?**
`status`, `priority`, and `category` for filtering on `GET /api/tickets`; and `page`, `size`, `sortBy`, `direction` for pagination and sorting on `GET /api/tickets/paged`.

**2. Which fields did you index?**
`category`, `priority`, `status`, `createdBy`, and `createdAt` — the fields most commonly used for filtering and sorting.

**3. Why should an API use pagination?**
Returning all records at once doesn't scale as data grows — it slows down responses and wastes bandwidth. Pagination lets clients request small, manageable chunks of data at a time, which keeps the API fast and responsive even with large datasets.

**4. What log messages appear when you call the filtering endpoint?**
`Fetching tickets with filters - status=..., priority=..., category=...`, showing exactly which filter values were passed in the request.

**5. What endpoint proves your sorting works?**
`GET /api/tickets/paged?page=0&size=5&sortBy=createdAt&direction=desc` — comparing the response order against the same request with `direction=asc` (or `sortBy=title`) shows the tickets returned in a different order, confirming sorting is applied.

---
### Output Screenshot
![Day 8 Exercise 4 Output](screenshots/Day8/D8_Exercise04.png)

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day8](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day8)

---
---

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
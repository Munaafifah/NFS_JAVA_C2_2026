
---

## Day 13 Exercise 01 - Backend Update Ticket Endpoint

### What Was Added
- Created `UpdateTicketRequest` DTO with validation on title, description, category, priority (`LOW`, `MEDIUM`, `HIGH`), and status (`OPEN`, `IN_PROGRESS`, `CLOSED`)
- Added `updateTicket(String id, UpdateTicketRequest request)` to `TicketService`, which looks up the ticket, updates its fields, and preserves the original `createdBy`/`createdAt`
- Added `PUT /api/tickets/{id}` endpoint to `TicketController`, secured behind existing JWT authentication
- Verified with a `.http` file covering a valid update, invalid priority, invalid status, missing required field, and a non-existent ticket id

### Output Screenshot
![Ticket Update Endpoint](screenshots/Day13/D13_Exercise01.png)

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day13](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day13)

---

## Day 13 Exercise 02 - Create Ticket Form Page

### What Was Added
- Created `src/components/TicketFormWizard.jsx` with controlled inputs for title, description, category, and priority (status is shown as a disabled field since new tickets are always created as `OPEN` by the backend)
- Added client-side validation requiring title, description, category, and a valid priority before submission
- Created `src/pages/TicketFormPage.jsx`, which calls `createTicket()` with the logged-in user's email as `createdBy`, and shows saving/error/success states
- Added `createTicket()` to `src/services/api.js`
- Added a `/app/tickets/new` route to `App.jsx`, nested under the existing protected `/app` layout
- Added a "New Ticket" button on `TicketsPage.jsx` linking into the form
- Verified the form opens from the protected area, displays all fields correctly, and successfully creates a new ticket visible in the ticket list

### Output Screenshot
![Ticket Form Page](screenshots/Day13/D13_Exercise02.png)

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day13](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day13)

---

## Day 13 Exercise 03 - Client-Side Validation

### What Was Added
- Added `status` as tracked form state in `TicketFormWizard.jsx` (defaulting to `OPEN`), so it participates in validation like every other field, even though the input itself stays disabled since new tickets are always created as `OPEN`
- Extended `validate()` to check all five required fields: title, description, category, priority, and status
- Inline error messages render beside/below each field via `<span className="field-error" role="alert">`, driven by `fieldErrors` state
- Submission is blocked via `if (!validate()) return;` inside `handleSubmit` whenever any required field fails validation
- Verified by submitting an empty form and confirming all five inline errors appear without a network request being sent

### Output Screenshot
![Client-Side Validation](screenshots/Day13/D13_Exercise03.png)

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day13](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day13)

---
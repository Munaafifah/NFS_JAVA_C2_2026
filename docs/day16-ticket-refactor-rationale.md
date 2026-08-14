## Day 16 Exercise 5 - Before/After Diff Rationale

### Files changed
- `TicketService.java`
- `TicketFormWizard.jsx`
- `ticketFormValidation.js` (new)
- `ticketFormValidation.test.js` (new)
- `requests/day16-tickets.http` (new)

### What behaviour was preserved
- All public method signatures, endpoint URLs, and exception messages are unchanged.
- Default status on create is still `"OPEN"`.
- Ticket form UI, field names, and payload shape are unchanged.
- Validation error messages are identical to the original inline version.

### What logic was extracted
- **Backend:** `findTicketOrThrow`, `ensureTitleIsUniqueForCreate`,
  `fetchByFirstMatchingFilter`, `resolveSortDirection` — pulled out of
  `TicketService`'s public methods.
- **Frontend:** `validateTicketForm` and `normalizeTicketFormPayload` —
  pulled out of `TicketFormWizard`'s inline `validate()`.

### Why it's easier to maintain
Each public method now reads as a short sequence of named steps instead of
mixed business logic + repository plumbing. The validation logic can now be
unit tested directly, without mounting the form.

### Tests / HTTP requests run
- `requests/day16-tickets.http` — create, duplicate-title (409), get/update
  by valid and invalid id, paged sort both directions.
- `npm run test` — 30/30 passing, including the pre-existing
  `TicketFormWizard.test.jsx`.
- Manual check on localhost — validation errors, create, and edit all work.

### Risk that remains
Trimming only happens on the frontend — the backend doesn't independently
trim `title`/`description`, so a non-React client could bypass it. Pre-existing
behaviour, not introduced by this refactor.
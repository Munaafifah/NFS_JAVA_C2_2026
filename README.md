
---

## Day 16 Exercise 0 - Prompt Engineering Warm-Up

### What Was Added

**Poor prompt:**

```text
Fix my TicketService, it's messy.
```

**Better prompt:**

```text
Context:
I am working on the Support Desk Ticket project. The backend is a Spring
Boot API with a TicketService class that handles creating and updating
tickets. The create and update methods currently repeat similar validation
and status-normalization logic.

Task:
Refactor TicketService to extract the repeated logic into private helper
methods, without changing what the service does from the outside.

Constraints:
- Do not change public method names (createTicket, updateTicket, etc.).
- Do not change the TicketController endpoint URLs.
- Do not change TicketResponse or TicketRequest DTO fields.
- Do not change exception types or messages thrown on invalid input.
- Do not change existing status or priority values.
- Keep the code readable for a beginner Java developer.

Expected output:
1. The refactored TicketService.java file
2. A short explanation of each new helper method and why it exists
3. A list of exactly what stayed the same

Tests:
What HTTP requests (create, update, invalid input) should I run afterward
to confirm behaviour is unchanged?

Review:
What could this refactor accidentally break? List the risks before I apply it.
```

**Why the second prompt is safer:** the poor prompt gives no context,
constraints, or expected output, so an AI assistant could rename methods,
change the API shape, or restructure things in ways that break the frontend
with no way to catch it. The better prompt fixes this with explicit
Constraints (protecting endpoints, DTOs, and exceptions from being touched)
and by asking for Tests and Review, so the response includes a verification
plan alongside the code instead of just a diff to trust blindly.


### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day16](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day16)

---

## Day 16 Exercise 1 - AI Refactor Safety Checklist

### What Was Added

- [ ] Safe to share: `TicketService.java`, `TicketController.java`, DTOs, `Ticket` model
- [ ] Safe to share: `TicketFormWizard.jsx`
- [ ] Not safe to share: `application.properties`, `UserDataSeeder.java`
- [ ] Not safe to share: `.http` files with a real token still pasted in
- [ ] Remove before pasting: `app.jwt.secret` value
- [ ] Remove before pasting: MongoDB username/password, any Bearer token
- [ ] Must not change: endpoint URLs, HTTP methods, DTO field names
- [ ] Must not change: exception types and messages, default `"OPEN"` status
- [ ] Must not change: ticket form field names, CSS classes, payload shape
- [ ] Proof it's safe: `.http` regression file + Vitest tests pass


### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day16](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day16)

---
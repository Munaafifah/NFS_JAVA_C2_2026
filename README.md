
---

## Day 15 Exercise 01 - Set Up Frontend Testing Tools

### What Was Added
- Installed `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, and `@testing-library/user-event` as dev dependencies
- Added `test` and `test:watch` scripts to `package.json`
- Updated `vite.config.js` with a `test` block: `environment: 'jsdom'`, `globals: true`, `setupFiles: './src/test/setup.js'`, and `css: true`
- Created `src/test/setup.js` importing `@testing-library/jest-dom/vitest`, plus `afterEach` cleanup (unmounting components, clearing localStorage, restoring mocks) between tests
- Created a sample sanity test at `src/test/sanity.test.js` to confirm the test environment runs correctly
- Verified `npm run test` runs with no configuration errors and the sample test passes

### Output Screenshot
![Set Up Frontend Testing Tools](screenshots/Day15/D15_Exercise01.png)

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day15](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day15)

---

## Day 15 Exercise 02 - Test Ticket Filter Utility

### What Was Added
- Created `src/utils/tickets.test.js` with unit tests for the existing `filterTickets(tickets, searchText, statusFilter, priorityFilter)` function
- Tests cover: filtering by search text matching title, filtering by search text matching category, filtering by status, filtering by search text and status together, returning no results when search and status don't both match the same ticket, returning all tickets when search is empty and status is `ALL`, and case-insensitive search
- All tests run against local sample data with no React rendering and no backend calls, matching the unit test definition from the Day 15 concepts guide
- Verified all 7 new tests pass alongside the existing sanity test, for 8 passing tests total

### Output Screenshot
![Test Ticket Filter Utility](screenshots/Day15/D15_Exercise02.png)

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day15](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day15)

---

## Day 15 Exercise 03 - Test Ticket Summary Cards

### What Was Added
- Created `src/components/TicketSummaryCards.test.jsx` using React Testing Library to render `TicketSummaryCards` with sample ticket data
- Tests confirm all four card labels render (`Total Tickets`, `Open`, `In Progress`, `Closed`) and that each card displays the correct count, scoped per-card using `within()` so the test verifies each number is paired with the right label rather than just present anywhere on the page
- Added an edge case test confirming all counts correctly show `0` when given an empty ticket list
- Verified all 6 new component tests pass alongside the existing 8 tests from Exercises 1 and 2, for 14 passing tests total across 3 test files

### Output Screenshot
![Test Ticket Summary Cards](screenshots/Day15/D15_Exercise03.png)

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day15](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day15)

---

## Day 15 Exercise 04 - Test Protected Ticket Route

### What Was Added
- Created `src/components/ProtectedRoute.test.jsx`, mocking `useAuth()` directly so each test controls `isAuthenticated` without needing a real backend call
- Built a small test router using `MemoryRouter` matching the actual `Outlet`-based structure from `App.jsx` (rather than a `children`-prop pattern), with a `/login` route and a protected `/app/tickets` route wrapped by `ProtectedRoute`
- Test 1 confirms an unauthenticated user (`isAuthenticated: false`) is redirected to and sees the login page, with the protected content never rendering
- Test 2 confirms an authenticated user (`isAuthenticated: true`) sees the protected ticket page directly, with the login page never rendering
- Verified both tests pass alongside the existing 14 tests from Exercises 1–3, for 16 passing tests total across 4 test files
- This test proves frontend route guarding only; the backend still independently enforces JWT validation and role checks on every protected endpoint

### Output Screenshot
![Test Protected Ticket Route](screenshots/Day15/D15_Exercise04.png)

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day15](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day15)

---

## Day 15 Exercise 05 - Test Ticket Form Validation

### What Was Added
- Created `src/components/TicketFormWizard.test.jsx` using React Testing Library and `userEvent` to simulate real typing and clicking
- Test 1 submits a completely empty form and confirms inline errors appear for title, description, and category, and that `onSubmit` is never called
- Test 2 types trimmed-with-whitespace values into title, description, and category, submits, and confirms `onSubmit` is called exactly once with a clean, trimmed payload including the default `priority: 'MEDIUM'` and `status: 'OPEN'`
- Test 3 renders the form with `saving={true}` and confirms the submit button shows "Saving..." and is disabled
- Verified all 3 new tests pass alongside the existing 16 tests from Exercises 1–4, for 19 passing tests total across 5 test files
- This test protects the core frontend flow: user input → validation → submit, catching regressions before they reach the backend

### Output Screenshot
![Test Ticket Form Validation](screenshots/Day15/D15_Exercise05.png)

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day15](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day15)

---
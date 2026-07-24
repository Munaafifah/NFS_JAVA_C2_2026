
---

## Day 11 Exercise 01 - Create the React Project

### What Was Added
- Created a new Vite React project named `support-desk-ui` inside the `frontend/` folder
- Installed dependencies with `npm install`
- Ran the dev server with `npm run dev` and confirmed the default Vite React page loaded at `http://localhost:5173`
- Replaced the default `App.jsx` content with a minimal component rendering `Support Desk UI`

```jsx
export default function App() {
  return <h1>Support Desk UI</h1>;
}
```

### Output Screenshot
![Support Desk UI](screenshots/Day11/D11_Exercise01.png)

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day11](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day11)

---

## Day 11 Exercise 02 - Build Layout Components

### What Was Added
- Created `src/components/AppHeader.jsx` rendering the title "Support Desk UI" and subtitle "Day 11 React Fundamentals"
- Created `src/components/Layout.jsx` that wraps page content and renders `AppHeader` plus any `children` passed to it
- Updated `App.jsx` to use `Layout`, passing in a placeholder `<p>Ticket dashboard goes here</p>`

**Component tree:**
```text
App
└── Layout
    └── AppHeader
```

### Output Screenshot
![Layout Components](screenshots/Day11/D11_Exercise02.png)

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day11](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day11)

---

## Day 11 Exercise 03 - Ticket Sample Data, List and Detail

### What Was Added
- Created `src/data/sampleTickets.js` with 5 sample tickets (id, title, category, priority, status, createdBy, createdAt)
- Created `src/components/PriorityBadge.jsx` and `src/components/StatusBadge.jsx` to render priority/status as badges
- Created `src/components/TicketList.jsx` to display all tickets and handle selection via click
- Created `src/components/TicketDetail.jsx` to show the currently selected ticket's details, with a fallback message when nothing is selected
- Updated `App.jsx` to hold `selectedId` state with `useState`, find the matching ticket, and pass data/handlers down to `TicketList` and `TicketDetail`

### Output Screenshot
![Ticket List and Detail](screenshots/Day11/D11_Exercise03.png)

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day11](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day11)

---

## Day 11 Exercise 04 - State, Search and Filter

### What Was Added
- Created `src/components/TicketFilterPanel.jsx` with a search input and dropdowns for status and priority, all as controlled inputs
- Updated `App.jsx` to hold `searchText`, `statusFilter`, and `priorityFilter` state with `useState`
- Added filtering logic that derives `filteredTickets` from `sampleTickets` on every render, matching search text against title/category and applying status/priority filters
- Updated `TicketList` and `TicketDetail` to use the filtered results instead of the full ticket list
- Fixed a styling conflict in `index.css` where leftover Vite default root styles (`color-scheme: light dark`, root text/background colors) were overriding `App.css` and causing washed-out text on dropdowns and ticket titles

### Output Screenshot
![Search and Filter](screenshots/Day11/D11_Exercise04.png)

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day11](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day11)

---
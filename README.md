# NFS_JAVA_C2_2026 | Full-Stack Development with Java, React & MongoDB



## Programme Description



This 20-day programme is designed to help participants build a complete full-stack web application using Java, Spring Boot, React, and MongoDB.



The programme takes learners from programming and web fundamentals to backend API development, frontend interface design, database modelling, authentication, testing, performance improvement, and final capstone presentation.



Throughout the programme, participants will work on practical exercises and gradually build a small but production-like web application. The final outcome is a working capstone project that demonstrates the use of a React frontend, Spring Boot backend, MongoDB database, secure authentication, API documentation, testing practices, and deployment-readiness basics.



AI tools such as Gemini are used as learning accelerators to help scaffold examples, suggest refactoring ideas, draft tests, generate sample data, and support MongoDB query or aggregation design. However, participants are expected to review, verify, understand, and take ownership of all generated code.



---



## Programme Duration



* Duration: 20 training days

* Daily Duration: 7 hours per day

* Total Training Hours: 140 hours

* Mode: Instructor-led training with guided labs, team build activities, review sessions, quizzes, and capstone development



---



## Programme Objectives



By the end of this programme, participants will be able to:



* Understand web fundamentals, HTTP, REST, and JSON.

* Write basic to intermediate Java and JavaScript code.

* Build REST APIs using Spring Boot.

* Apply validation, authentication, authorisation, and error-handling practices.

* Model data effectively using MongoDB.

* Use MongoDB indexes, queries, pagination, and aggregation pipelines.

* Build accessible React user interfaces with routing, forms, state, and data fetching.

* Apply testing practices for backend and frontend development.

* Use AI coding assistants responsibly for learning, refactoring, testing, and documentation.

* Design, build, document, and present a full-stack capstone project.

---

## Day 7 Exercise 1 - Install and Secure MongoDB

### What Was Added
**MongoDB Community Server, Compass, and mongosh installed**
- Verified `mongod` v8.3.4 and `mongosh` v2.9.2 via command line
- Added MongoDB `bin` folder and `mongosh` install folder to Windows PATH

**Root administrator account created**
- Switched to `admin` database in `mongosh`
- Created root user with `db.createUser()`
- Verified creation by authenticating with `db.auth("root", "root")`

**Authentication enabled**
- Edited `mongod.cfg` to uncomment `security:` and add `authorization: enabled`
- Restarted the MongoDB Windows service
- Confirmed anonymous connections are rejected (`Unauthorized` error on `listDatabases` without login)
- Confirmed login succeeds using the root administrator account

**Application database and user created**
- Created `support_desk_db` database
- Created `support_app_user` with `readWrite` role scoped only to `support_desk_db`
- Verified the application user can log in and only sees `support_desk_db`

**Sample data created**
- Created `tickets` collection inside `support_desk_db`
- Inserted one ticket document with `title`, `description`, `category`, `priority`, `status`, `createdBy`, and `createdAt` fields
- Verified the document with `db.tickets.find()`

**Verified using MongoDB Compass**
- Connected Compass using both the root account and `support_app_user`
- Confirmed `support_desk_db` and `tickets` collection are visible with the sample document

---
### README Reflection

**What is the purpose of the `admin` database?**
The `admin` database stores administrative and authentication data for the whole MongoDB server, such as user accounts, roles, and privileges. It's the database you need to authenticate against to perform server-wide actions.

**Why should an application use its own database user instead of the root administrator?**
A dedicated application user limits access to only what the app needs (in this case, `readWrite` on `support_desk_db` only). If the app's credentials are ever leaked, the damage is contained to one database instead of exposing full control over the entire server.

**What is the difference between authentication and authorisation?**
Authentication is proving who you are (logging in with a username and password). Authorisation is what you're allowed to do once logged in (e.g. read-only vs read/write, which databases you can access).

**What would happen if authentication was disabled on a production database?**
Anyone who could reach the server over the network could connect without credentials and read, modify, or delete any data — as shown earlier when `listDatabases` succeeded with no login before `authorization: enabled` was set.

---
### Output Screenshot
![Day 7 Exercise 1 Output](screenshots/Day7/D7_Exercise01a.png)

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day7](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day7)

---


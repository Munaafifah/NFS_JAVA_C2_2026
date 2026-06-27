const students = [
    { studentId: "S001", studentName: "Ignacio de Paul", email: "ignacio@example.com", status: "Active" },
    { studentId: "S002", studentName: "Ben Tan", email: "ben@example.com", status: "Inactive" },
    { studentId: "S003", studentName: "Chong Mei", email: "mei@example.com", status: "Active" },
    { studentId: "S004", studentName: "Danish Nawaz", email: "danish@example.com", status: "Active" }
];

// Step 1: Find the container div by its id
const studentList = document.getElementById("student-list");

// Step 2: Loop through every student and create a card
students.forEach((student) => {

    // Step 3: Create a new div element (the card)
    const card = document.createElement("div");

    // Step 4: Fill the card with student details
    card.innerHTML = `
        <p><strong>Student ID:</strong> ${student.studentId}</p>
        <p><strong>Name:</strong> ${student.studentName}</p>
        <p><strong>Email:</strong> ${student.email}</p>
        <p><strong>Status:</strong> ${student.status}</p>
        <hr>
    `;

    // Step 5: Add the card into the container on the page
    studentList.appendChild(card);
});
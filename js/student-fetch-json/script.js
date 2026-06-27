const statusMessage = document.getElementById("status-message");
const studentList = document.getElementById("student-list");

function renderStudents(students) {
    studentList.innerHTML = "";

    students.forEach((student) => {
        const studentCard = document.createElement("div");

        studentCard.innerHTML = `
            <h2>${student.studentName}</h2>
            <p>Student ID: ${student.studentId}</p>
            <p>Email: ${student.email}</p>
            <p>Status: ${student.status}</p>
            <hr>
        `;

        studentList.appendChild(studentCard);
    });
}

async function loadStudents() {
    try {
        // Show loading message while fetching
        statusMessage.textContent = "Loading students...";

        // Request the JSON file
        const response = await fetch("students.json");

        // Check if the file loaded successfully
        if (!response.ok) {
            throw new Error("Failed to load student data.");
        }

        // Convert JSON into JavaScript objects
        const students = await response.json();

        // Clear loading message and render cards
        statusMessage.textContent = "";
        renderStudents(students);

    } catch (error) {
        // Show error message if something goes wrong
        statusMessage.textContent = "Error: " + error.message;
    }
}

// Call the function to start loading
loadStudents();
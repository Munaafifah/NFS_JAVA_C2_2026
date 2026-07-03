/* app.js
small front end REST client
1. GET data from the mock API
2. POST data to the mock API

User clicks a buttn -> GET request to the mock API -> API returns courses in JSON -> JS converts JSON into list -> display list in the browser

1. Select HTML Elements
2. Create showStatus() 
3. Create renderCourses()
4. Create loadCourses()
5. Connect button click
6. Create createCourse()
7. Connect form submit
*/

const API_BASE_URL = "http://localhost:8081/api";

const statusText = document.querySelector("#statusText");
const coursesList = document.querySelector("#coursesList");
const loadButton = document.querySelector("#loadButton");
const createForm = document.querySelector("#createForm");
const createButton = document.querySelector("#createButton");

function showStatus(message, isError = false) {
    statusText.textContent = message;
}

function renderCourses(courses) {
    coursesList.innerHTML = "";

    courses.forEach(course => {
        const listItem = document.createElement("li");

        listItem.textContent = 
        `${course.courseTitle} by ${course.instructorName} ` + 
        `starts on ${course.startDate}. Capacity: ${course.capacity}. Status: ${course.status}`;

        coursesList.appendChild(listItem);
    });

}

async function loadCourses() {
    showStatus("Loading courses...");

    try {
        const response = await fetch(`${API_BASE_URL}/course-offerings`);

        console.log("GET status", response.status);

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();

        renderCourses(data);
        showStatus(`Loaded ${data.length} courses.`);
    }
    catch (error) {
        showStatus(error.message);
    }

}

async function createCourse() {
    event.preventDefault();

    const payload = {
        courseTitle: createForm.courseTitle.value,
        instructorName: createForm.instructorName.value,
        startDate: createForm.startDate.value,
        capacity: parseInt(createForm.capacity.value, 10)
    };

    try {
        const response = await fetch(`${API_BASE_URL}/course-offerings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        console.log("POST status", response.status);
        console.log("POST response", data);

        if (!response.ok) {
            showStatus(`Error: ${data.message}`);
            return;
        }

        showStatus(`Created course offering ${data.id}`);
        createForm.reset();
        await loadCourses();
    }
    catch (error) {
        showStatus(error.message);
    }

}


loadButton.addEventListener("click", loadCourses);
createForm.addEventListener("submit",createCourse);
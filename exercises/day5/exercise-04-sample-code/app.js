const API_BASE_URL = "http://localhost:8081/api";

const statusText = document.querySelector("#statusText");
const eventList = document.querySelector("#eventList");
const loadButton = document.querySelector("#loadButton");

function renderEvents(events) {
    eventList.innerHTML = "";

    events.forEach(event => {
        const listItem = document.createElement("li");

        listItem.textContent =
            `${event.title} - ${event.date} - ${event.venue} - ` +
            `${event.availableSeats} seats available`;

        eventList.appendChild(listItem);
    });
}

async function loadEvents() {
    statusText.textContent = "Loading events...";

    try {
        const response = await fetch(`${API_BASE_URL}/events`);

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();

        renderEvents(data);
        statusText.textContent = `Loaded ${data.length} event(s).`;
    } catch (error) {
        statusText.textContent = `Error: ${error.message}`;
    }
}

loadButton.addEventListener("click", loadEvents);

// Challenge: search for one event by ID

const searchInput = document.createElement("input");
searchInput.id = "searchInput";
searchInput.placeholder = "Enter event ID (e.g. EV001)";

const searchButton = document.createElement("button");
searchButton.id = "searchButton";
searchButton.textContent = "Search Event";

document.body.insertBefore(searchButton, eventList);
document.body.insertBefore(searchInput, searchButton);

async function searchEvent() {
    const eventId = searchInput.value.trim();

    if (!eventId) {
        statusText.textContent = "Please enter an event ID.";
        return;
    }

    statusText.textContent = `Searching for ${eventId}...`;

    try {
        const response = await fetch(`${API_BASE_URL}/events/${eventId}`);

        if (!response.ok) {
            eventList.innerHTML = "";
            statusText.textContent = `Event ${eventId} was not found.`;
            return;
        }

        const event = await response.json();

        renderEvents([event]);
        statusText.textContent = `Found event ${event.id}.`;
    } catch (error) {
        statusText.textContent = `Error: ${error.message}`;
    }
}

searchButton.addEventListener("click", searchEvent);
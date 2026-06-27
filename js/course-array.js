/*
Java
List<Courses> coures = new ArrayList<>();

JavaScript
const courses = []
*/

const courses = [
    {
        id: "C001",
        title: "JavaScript Fundamentals",
        durationHours: 12,  
        level: "Beginner",
    },
    {
        id: "C002",
        title: "Advanced JavaScript",
        durationHours: 16,
        level: "Advanced"
    },
    {
        id: "C003",
        title: "MongoDB Basics",    
        durationHours: 20,
        level: "Intermediate"
    }
];

console.log("=== Course Details ===");

// `` called as backtick or grave accent, used for template literals in javascript
// enhanced for loop in  java is similar to for ... of loop in javascript
for (const course of courses) {
    console.log(`${course.id} - ${course.title} - Duration: ${course.durationHours} - Level: ${course.level}`);
}

console.log("\nTotal Courses: " + courses.length); // .size() in Java is .length in JavaScript
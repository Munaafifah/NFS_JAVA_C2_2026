// JS does not require classes for simple data
//We can represent a course using an object literal
//to run, type: node javascript-demo.js
// semicolon is optional in JS, but recommended

/*
Java:
    1.Stricter type checking
    2.Class-based structure
    3.Private fields and methods
    4.Compile-time errors
    5.More boilerplate code

JavaScript:
    1.Dynamic typing
    2.Prototype based structure
    3.No private fields (ES6+ has private fields with #)
    4.Propertiescan be accessed and modified at runtime
    5.Less boilerplate code
    6.Object 
    7.Runtime errors
*/

const courses = {
    courseId: "C001",
    title: "JavaScript Fundamentals",
    durationHours: 12,
    level: "Beginner",
    instructor: "John Doe"
};

console.log("=== Course Details ===");
console.log(`Course ID: ${courses.courseId}`);
console.log(`Title: ${courses.title}`);
console.log(`Duration (hours): ${courses.durationHours}`);
console.log(`Level: ${courses.level}`); // `${}` is a template literal, allows embedding expressions
console.log(`Instructor: ${courses.instructor}`);
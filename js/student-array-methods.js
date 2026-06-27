const students = [
  { studentId: "S001", studentName: "Ignacio de Paul", email: "ignacio@example.com", status: "Active" },
  { studentId: "S002", studentName: "Ben Tan", email: "ben@example.com", status: "Inactive" },
  { studentId: "S003", studentName: "Chong Mei", email: "mei@example.com", status: "Active" }
];

console.log("=== Original Students ===");
console.log(students);

// forEach: loops through every student and prints their name
console.log("\n=== All Student Names ===");
students.forEach((student) => {
    console.log(student.studentName);
});

// filter: keeps only students whose status is "Active" — returns a new array
console.log("\n=== Active Students ===");
const activeStudents = students.filter((student) => student.status === "Active");
console.log(activeStudents);

// find: returns the FIRST student that matches — returns one object, not an array
console.log("\n=== Find Student S002 ===");
const foundStudent = students.find((student) => student.studentId === "S002");
console.log(foundStudent);

// map: transforms every student — returns a new array of emails only
console.log("\n=== Student Emails ===");
const studentEmails = students.map((student) => student.email);
console.log(studentEmails);

// push: adds a new student to the END — returns new length
const newLengthAfterPush = students.push({
    studentId: "S004",
    studentName: "Danish Nawaz",
    email: "danish@example.com",
    status: "Active"
});
console.log("\n=== After push ===");
console.log(students);
console.log("\nNew length after push:", newLengthAfterPush);

// pop: removes the LAST student — returns the removed student
const removedLastStudent = students.pop();
console.log("\n=== After pop ===");
console.log(students);
console.log("\nRemoved last student:", removedLastStudent);

// unshift: adds a new student to the BEGINNING — returns new length
const newLengthAfterUnshift = students.unshift({
    studentId: "S000",
    studentName: "Ignacio de Paul",
    email: "ignacio@example.com",
    status: "Active"
});
console.log("\n=== After unshift ===");
console.log(students);
console.log("\nNew length after unshift:", newLengthAfterUnshift);

// shift: removes the FIRST student — returns the removed student
const removedFirstStudent = students.shift();
console.log("\n=== After shift ===");
console.log(students);
console.log("\nRemoved first student:", removedFirstStudent);

console.log("\n=== Final Students Array ===");
console.log(students);
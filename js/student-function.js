const student = {
    studentId : "S001",
    stutdentName : "Aina Rahman",
    email : "aina@example.com",
    status : "Active"
};

// Normal function to display course details
function formatStudent(student) {
    return `${student.studentId} - ${student.stutdentName} (${student.status})`;
}

// Arrow function to display course details (Java lambda ->)
const getStudentEmail = (student) => {
    return `${student.email}`;
}

// Short arrow function to display course details
const getStudentStatus = (student) => student.status;

console.log("=== Student Details using Functions ===");
console.log(formatStudent(student));
console.log(getStudentEmail(student));
console.log(getStudentStatus(student));
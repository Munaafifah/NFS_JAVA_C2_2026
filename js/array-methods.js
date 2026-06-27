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

/*
====== Important JavaScript Array Methods for React =====
forEach | Do something for every item  | Returns undefined
filter  | Keep matching items           | Returns new array
find    | Find the first matching item  | Returns the first matching item
map     | Transform each item           | Returns a new array
*/

// forEach: loops through every item and runs a function — returns nothing (undefined)
console.log("=== forEach: Print all course titles ===");
courses.forEach((course) => {
    console.log(course.title);
});

// filter: keeps only items that match the condition — returns a new array
console.log("\n=== filter: Get all beginner courses ===");
const beginnerCourses = courses.filter((course) => course.level === "Beginner");
console.log(beginnerCourses);

// find: returns the FIRST item that matches — returns a single object, not an array
console.log("\n=== find: Find course C002 ===");
const foundCourse = courses.find((course) => {
    return course.id === "C002";
});
console.log(foundCourse);

// map: transforms every item and returns a NEW array with the results
console.log("\n=== map: Course titles only ===");
const courseTitles = courses.map((course) => course.title);
console.log(courseTitles);

/*
====== Other JavaScript Array Methods =========
push    | Add an item to the end of the array      | Returns the new length
pop     | Remove the last item from the array       | Returns the removed item
shift   | Remove the first item from the array      | Returns the removed item
unshift | Add an item to the beginning of the array | Returns the new length
*/

// push: adds a new course object to the END of the array — returns new length
const newLengthAfterPush = courses.push({
    id: "C004",
    title: "React Fundamentals",
    durationHours: 18,
    level: "Intermediate"
});
console.log("\n=== push: New length after adding a course ===", newLengthAfterPush);
console.log(courses);

// pop: removes the LAST item from the array — returns the removed item
const removedCourse = courses.pop();
console.log("\n=== pop: Removed the last course ===", removedCourse);
console.log(courses);

// shift: removes the FIRST item from the array — returns the removed item
const removedFirstCourse = courses.shift();
console.log("\n=== shift: Removed the first course ===", removedFirstCourse);
console.log(courses);

// unshift: adds a new course to the BEGINNING of the array — returns new length
const newLengthAfterUnshift = courses.unshift({
    id: "C000",
    title: "Web Basics",
    durationHours: 8,
    level: "Beginner"
});
console.log("\n=== unshift: New length after adding to beginning ===", newLengthAfterUnshift);
console.log(courses);
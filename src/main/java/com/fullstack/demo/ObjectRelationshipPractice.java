package com.fullstack.demo;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.model.CourseOffering;
import com.fullstack.demo.model.Instructor;

public class ObjectRelationshipPractice {
    public static void main(String[] args) {

        // Task A: Create two instructors
        Instructor aina = new Instructor("I001", "Aina Rahman", "Java and Spring Boot");
        Instructor marcus = new Instructor("I002", "Marcus Lee", "React and Frontend Development");

        // Task B: Create two courses
        Course javaCourse = new Course("C001", "Java Fundamentals", 14, "Beginner");
        Course reactCourse = new Course("C002", "React Frontend Development", 21, "Intermediate");

        // Task C: Assign instructors to courses
        // Course HAS an Instructor - this is composition
        javaCourse.setInstructor(aina);
        reactCourse.setInstructor(marcus);

        System.out.println("=== Courses ===");
        javaCourse.printSummary();
        reactCourse.printSummary();

        // Task D: Create course offerings
        // CourseOffering uses composition because it HAS a Course and HAS an Instructor
        CourseOffering offer1 = new CourseOffering("OFF001", "Java Fundamentals June Intake", javaCourse, aina, "2026-06-29", "2026-06-30", 25, "Physical");
        CourseOffering offer2 = new CourseOffering("OFF002", "React Frontend July Intake", reactCourse, marcus, "2026-07-01", "2026-07-03", 20, "Hybrid");

        System.out.println();
        
        // Task E: Print both offerings
        System.out.println("=== Course Offerings ===");
        offer1.printSummary();
        offer2.printSummary();

        // Extension: Same course, different date
        // This shows Course and CourseOffering are not the same thing
        CourseOffering offer3 = new CourseOffering("OFF003", "Java Fundamentals July Weekend Intake", javaCourse, aina, "2026-07-05", "2026-07-06", 20, "Physical");
        offer3.printSummary();
    }
}
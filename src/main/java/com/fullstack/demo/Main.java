package com.fullstack.demo;

import com.fullstack.demo.model.Instructor;
import com.fullstack.demo.model.Course;
import com.fullstack.demo.model.CourseOffering;
import com.fullstack.demo.model.Student;

import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {

        // --- Instructors ---
        ArrayList<Instructor> instructors = new ArrayList<>();
        instructors.add(new Instructor("I001", "Alice Johnson", "Java Development"));
        instructors.add(new Instructor("I002", "Bob Smith", "React Development"));

        // --- Courses ---
        ArrayList<Course> courses = new ArrayList<>();
        courses.add(new Course("C001", "Java Fundamentals", 14, "Beginner"));
        courses.add(new Course("C002", "React Frontend Development", 21, "Intermediate"));
        courses.add(new Course("C003", "MongoDB Basics", 14, "Beginner"));

        // Assign instructors to courses
        courses.get(0).setInstructor(instructors.get(0));
        courses.get(1).setInstructor(instructors.get(1));

        // --- Students ---
        ArrayList<Student> students = new ArrayList<>();
        students.add(new Student("S001", "Charlie Brown", "charlie@example.com"));
        students.add(new Student("S002", "Daisy Duck", "daisy@example.com"));
        students.add(new Student("S003", "Eve Adams", "eve@example.com"));

        // --- Course Offerings ---
		ArrayList<CourseOffering> courseOfferings = new ArrayList<>();
		courseOfferings.add(new CourseOffering(
			"OF001",
			"Java Fundamentals - Batch 1",
			courses.get(0),
			instructors.get(0),
			"2025-01-01",
			"2025-03-01",
			30,
			"In-Person"
		));
		courseOfferings.add(new CourseOffering(
			"OF002",
			"React Frontend - Batch 1",
			courses.get(1),
			instructors.get(1),
			"2025-02-01",
			"2025-04-01",
			25,
			"Online"
		));

        // --- Print All ---
        System.out.println("Instructor Profiles:");
        System.out.println("************************");
        for (Instructor instructor : instructors) {
            instructor.printProfile();
        }
		System.out.println();

        System.out.println("Course Summaries:");
        System.out.println("************************");
        for (Course course : courses) {
            course.printSummary();
        }
		System.out.println();

        System.out.println("Student Profiles:");
        System.out.println("************************");
        for (Student student : students) {
            student.printProfile();
        }
		System.out.println();

        System.out.println("Course Offerings:");
        System.out.println("************************");
        for (CourseOffering offering : courseOfferings) {
            offering.printSummary();
        }
		System.out.println();
    }
}
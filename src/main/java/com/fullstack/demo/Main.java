package com.fullstack.demo;

import com.fullstack.demo.model.Instructor;
import com.fullstack.demo.model.Course;
import com.fullstack.demo.model.Student;

public class Main {
    public static void main(String[] args) {
        // Syntax for creating a new object (instance) of the Course class
        // ClassName objectName = new Constructor();
        // ClassName and Constructor usually match

        Instructor instructor1 = new Instructor("I001", "Alice Johnson", "Java Development");
        Instructor instructor2 = new Instructor("I002", "Bob Smith", "React Development");

        Course course1 = new Course("C001", "Java Fundamentals", 14, "Beginner");
        Course course2 = new Course("C002", "React Frontend Development", 21, "Intermediate");

        Student student1 = new Student("S001", "Charlie Brown", "charlie@example.com");
        Student student2 = new Student("S002", "Daisy Duck", "daisy@example.com");

        course1.setInstructor(instructor1);
        course2.setInstructor(instructor2);

        System.out.println("Instructor Profiles:");
		System.out.println("------------------------------");
        instructor1.getProfile();
		System.out.println("************************");
        instructor2.getProfile();

        System.out.println("Course Summaries:");
		System.out.println("------------------------------");
        course1.printSummary();
		System.out.println("************************");
        course2.printSummary();

        System.out.println("Student Profiles:");
		System.out.println("------------------------------");
        student1.printProfile();
		System.out.println("************************");
        student2.printProfile();

    }
}

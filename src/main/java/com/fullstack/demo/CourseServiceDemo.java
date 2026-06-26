package com.fullstack.demo;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.model.Instructor;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import com.fullstack.demo.service.CourseService;
import java.util.List;

public class CourseServiceDemo {

    public static void main(String[] args) {

        CourseRepository courseRepository = new InMemoryCourseRepository();
        CourseService courseService = new CourseService(courseRepository);

        System.out.println("=== Valid Course Test ===");
        try {
            courseService.createCourse(new Course("C001", "Java Fundamentals", 14, "Beginner"));
            System.out.println("Course saved successfully.");
        } catch (Exception e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        try {
            courseService.createCourse(new Course("C002", "React Frontend Development", 21, "Intermediate"));
            System.out.println("Course saved successfully.");
        } catch (Exception e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        try {
            courseService.createCourse(new Course("C003", "MongoDB Basics", 14, "Beginner"));
            System.out.println("Course saved successfully.");
        } catch (Exception e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        try {
            courseService.createCourse(new Course("C004", "Advanced Java Backend", 28, "Advanced"));
            System.out.println("Course saved successfully.");
        } catch (Exception e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        System.out.println();
        System.out.println("=== Invalid Course Tests ===");

        try {
            courseService.createCourse(new Course("", "Java Fundamentals", 14, "Beginner"));
            System.out.println("Course saved successfully.");
        } catch (Exception e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        try {
            courseService.createCourse(new Course("C005", "", 14, "Beginner"));
            System.out.println("Course saved successfully.");
        } catch (Exception e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        try {
            courseService.createCourse(new Course("C006", "MongoDB Basics", 0, "Beginner"));
            System.out.println("Course saved successfully.");
        } catch (Exception e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        try {
            courseService.createCourse(new Course("C007", "MongoDB Basics", 14, ""));
            System.out.println("Course saved successfully.");
        } catch (Exception e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        System.out.println();
        System.out.println("=== Search by Title: java ===");
        List<Course> searchResults = courseService.searchByTitle("java");
        for (Course course : searchResults) {
            System.out.println(course.getCourseId() + " - " + course.getTitle());
        }

        System.out.println();
        System.out.println("=== Filter by Level: Beginner ===");
        List<Course> filtered = courseService.filterByLevel("Beginner");
        for (Course course : filtered) {
            System.out.println(course.getCourseId() + " - " + course.getTitle());
        }

        Instructor instructor1 = new Instructor("I001", "Alice Johnson", "Java Development");
        Instructor instructor2 = new Instructor("I002", "Bob Smith", "React Development");

        courseService.assignInstructor("C001", instructor1);
        courseService.assignInstructor("C002", instructor2);
        courseService.assignInstructor("C004", instructor1);

        System.out.println();
        System.out.println("=== Search by Instructor Name: alice ===");
        List<Course> byInstructor = courseService.searchByInstructorName("alice");
        for (Course course : byInstructor) {
            System.out.println(course.getCourseId() + " - " + course.getTitle());
        }

        System.out.println();
        System.out.println("=== Update Duration ===");
        try {
            courseService.updateDuration("C001", 20);
            System.out.println("C001 duration updated to 20 hours.");
        } catch (Exception e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        System.out.println();
        System.out.println("=== Delete Course ===");
        try {
            courseService.deleteCourse("C003");
            System.out.println("C003 deleted successfully.");
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }

        System.out.println();
        System.out.println("=== Remaining Courses ===");
        List<Course> remaining = courseService.getAllCourses();
        for (Course course : remaining) {
            System.out.println(course.getCourseId() + " - " + course.getTitle());
        }

        System.out.println();
        System.out.println("=== Find Deleted Course ===");
        try {
            courseService.getCourseById("C003");
        } catch (Exception e) {
            System.out.println("Course not found error: " + e.getMessage());
        }

        System.out.println();
        System.out.println("=== Invalid Duration Test ===");
        try {
            courseService.updateDuration("C001", 0);
        } catch (Exception e) {
            System.out.println("Validation error: " + e.getMessage());
        }
    }
}
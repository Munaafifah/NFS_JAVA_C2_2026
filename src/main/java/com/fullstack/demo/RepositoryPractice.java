package com.fullstack.demo;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import java.util.List;
import java.util.Optional;

public class RepositoryPractice {

    public static void main(String[] args) {

        // The variable type is CourseRepository (interface) but the actual
        // object is InMemoryCourseRepository (the real implementation).
        CourseRepository courseRepository = new InMemoryCourseRepository();

        // TASK B: Save three courses directly through the repository
        Course apiCourse = new Course("C006", "API Documentation", 7, "Beginner");
        courseRepository.save(apiCourse);

        Course collectionsCourse = new Course("C007", "Java Collections Practice", 12, "Beginner");
        courseRepository.save(collectionsCourse);

        Course cleanCodeCourse = new Course("C008", "Clean Code Basics", 8, "Intermediate");
        courseRepository.save(cleanCodeCourse);

        // TASK C: Print all courses
        System.out.println("=== All Courses ===");
        List<Course> courses = courseRepository.findAll();
        for (Course course : courses) {
            course.printSummary();
        }

        System.out.println();

        // TASK D: Find one course using Optional
        System.out.println("=== Find C008 ===");
        Optional<Course> optionalCourse = courseRepository.findById("C008");
        if (optionalCourse.isPresent()) {
            Course foundCourse = optionalCourse.get();
            foundCourse.printSummary();
        } else {
            System.out.println("Course not found.");
        }

        // TASK E: Check if a course exists
        System.out.println("=== Exists Check ===");
        System.out.println("C008 exists: " + courseRepository.existsById("C008"));
        System.out.println();
    }
}
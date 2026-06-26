package com.fullstack.demo;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import com.fullstack.demo.service.CourseService;

public class CodeFlowPractice {

    public static void main(String[] args) {

        // We create the repository FIRST because CourseService depends on it.
        // InMemoryCourseRepository is the concrete class that stores data
        // in a LinkedHashMap. CourseRepository is just the interface (a contract).
        CourseRepository courseRepository = new InMemoryCourseRepository();

        // CourseService needs CourseRepository so it can delegate save/find
        // operations to it. The service handles business rules (validation),
        // while the repository handles storage.
        CourseService courseService = new CourseService(courseRepository);

        System.out.println("=== Add and Find Course ===");

        // FLOW STEP 1 - Demo calls CourseService.createCourse()
        // FLOW STEP 2 - CourseService validates the course
        // FLOW STEP 3 - CourseService calls courseRepository.save()
        // FLOW STEP 4 - InMemoryCourseRepository stores it in the LinkedHashMap
        courseService.createCourse(new Course("C005", "Spring Boot API Development", 18, "Intermediate"));

        // FLOW STEP 1 - Demo calls CourseService.getCourseById("C005")
        // FLOW STEP 2 - CourseService calls courseRepository.findById("C005")
        // FLOW STEP 3 - InMemoryCourseRepository looks up the LinkedHashMap
        // FLOW STEP 4 - CourseService unwraps the Optional, returns Course
        // FLOW STEP 5 - Demo receives the Course and prints it
        Course found = courseService.getCourseById("C005");

        found.printSummary();
    }
}
package com.fullstack.demo.service;

import com.fullstack.demo.exception.CourseNotFoundException;
import com.fullstack.demo.exception.InvalidCourseException;
import com.fullstack.demo.model.Course;
import com.fullstack.demo.model.Instructor;
import com.fullstack.demo.repository.CourseRepository;
import java.util.List;

public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course createCourse(Course course) {
        validateCourse(course);
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    private void validateCourse(Course course) {
        if (course == null) {
            throw new InvalidCourseException("Course cannot be null.");
        }
        if (isBlank(course.getCourseId())) {
            throw new InvalidCourseException("Course ID is required.");
        }
        if (isBlank(course.getTitle())) {
            throw new InvalidCourseException("Course title is required.");
        }
        if (course.getDurationHours() <= 0) {
            throw new InvalidCourseException("Course duration must be greater than zero.");
        }
        if (isBlank(course.getLevel())) {
            throw new InvalidCourseException("Course level is required.");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    public List<Course> searchByTitle(String keyword) {
        String search = keyword == null ? "" : keyword.toLowerCase();
        return courseRepository.findAll()
                .stream()
                .filter(c -> c.getTitle().toLowerCase().contains(search))
                .toList();
    }

    public List<Course> filterByLevel(String level) {
        String search = level == null ? "" : level.toLowerCase();
        return courseRepository.findAll()
                .stream()
                .filter(c -> c.getLevel().toLowerCase().contains(search))
                .toList();
    }

    public Course assignInstructor(String courseId, Instructor instructor) {
        Course course = getCourseById(courseId);
        course.setInstructor(instructor);
        return courseRepository.save(course);
    }

    public List<Course> searchByInstructorName(String instructorName) {
        String search = instructorName == null ? "" : instructorName.toLowerCase();
        return courseRepository.findAll()
                .stream()
                .filter(c -> c.getInstructor() != null)
                .filter(c -> c.getInstructor().getInstructorName().toLowerCase().contains(search))
                .toList();
    }

    public Course getCourseById(String courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseNotFoundException("Course not found: " + courseId));
    }

    public Course updateDuration(String courseId, int newDurationHours) {
        if (newDurationHours <= 0) {
            throw new InvalidCourseException("Course duration must be greater than zero.");
        }
        Course course = getCourseById(courseId);
        course.setDurationHours(newDurationHours);
        return courseRepository.save(course);
    }

    public void deleteCourse(String courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new CourseNotFoundException("Course not found: " + courseId);
        }
        courseRepository.deleteById(courseId);
    }
}

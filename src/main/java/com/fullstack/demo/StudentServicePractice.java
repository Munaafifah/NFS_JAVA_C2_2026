package com.fullstack.demo;

import com.fullstack.demo.exception.StudentNotFoundException;
import com.fullstack.demo.model.Student;
import com.fullstack.demo.repository.InMemoryStudentRepository;
import com.fullstack.demo.repository.StudentRepository;
import com.fullstack.demo.service.StudentService;
import java.util.List;

public class StudentServicePractice {

    public static void main(String[] args) {

        StudentRepository studentRepository = new InMemoryStudentRepository();
        StudentService studentService = new StudentService(studentRepository);

        // Register students
        System.out.println("=== Register Students ===");
        studentService.registerStudent(new Student("S001", "Roberto Chan", "roberto@example.com"));
        studentService.registerStudent(new Student("S002", "Priya Nair", "priya@example.com"));
        studentService.registerStudent(new Student("S003", "Lee Salazar", "lee@example.com"));
        System.out.println(studentService.getAllStudents().size() + " students registered.");

        // Print all students
        System.out.println("\n=== All Students ===");
        List<Student> allStudents = studentService.getAllStudents();
        for (Student student : allStudents) {
            student.printProfile();
        }

        System.out.println();

        // Find by ID
        System.out.println("=== Find Student By ID ===");
        Student found = studentService.getStudentById("S001");
        found.printProfile();

        System.out.println();

        // Search by name
        System.out.println("=== Search Student By Name (Loop) ===");
        List<Student> searchResults = studentService.searchByNameUsingLoop("Lee");
        for (Student student : searchResults) {
            student.printProfile();
        }

        System.out.println();

        System.out.println("=== Search StudentBy Name (Stream) ===");
        List<Student> streamResults = studentService.searchByNameUsingStream("Lee");
        for (Student student : streamResults) {
            student.printProfile();
        }

        System.out.println();

        // Missing student test
        System.out.println("=== Missing Student Test ===");
        try {
            studentService.getStudentById("S999");
        } catch (StudentNotFoundException e) {
            System.out.println("Friendly message: " + e.getMessage());
        }

        System.out.println();

        // Duplicate student test
        System.out.println("=== Duplicate Student Test ===");
        try {
            studentService.registerStudent(new Student("S001", "Roberto Chan", "roberto@example.com"));
        } catch (Exception e) {
            System.out.println("Friendly message: " + e.getMessage());
        }

        System.out.println();

        // Null student test
        System.out.println("=== Null Student Test ===");
        try {
            studentService.registerStudent(null);
        } catch (Exception e) {
            System.out.println("Friendly message: " + e.getMessage());
        }

        System.out.println();
    }
}

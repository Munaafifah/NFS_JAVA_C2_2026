package src.main.java.com.fullstack.demo;

public class Main {
	public static void main(String[] args) {

  	    //Syntax for creating an object of a class:
		// ClassName objectName = new Constructor();
		// ClassName and Constructor are the same name as the class name.

		Instructor instructor1 = new Instructor("I001", "Dr. Smith", "Computer Science");
		Instructor instructor2 = new Instructor("I002", "Prof. Johnson", "Data Science");

		Course course1 = new Course("C001","Introduction to Computer Science",40, "Beginner", "Programming", true);
		Course course2 = new Course("C002","Data Structures and Algorithms",60, "Intermediate", "Programming", false);

		Student student1 = new Student("S001", "Alice", "alice@example.com");
		Student student2 = new Student("S002", "Bob", "bob@example.com");

		CourseOffering offering1 = new CourseOffering("OFF001", "Java Fundamentals - June 2026 Intake", course1, instructor1, "2026-06-19", "2026-06-20", 30, "Online");
		CourseOffering offering2 = new CourseOffering("OFF002", "Data Structures - July 2026 Intake", course2, instructor2, "2026-07-01", "2026-07-02", 25, "Physical");
		CourseOffering offering3 = new CourseOffering("OFF003", "Data Structures - August 2026 Intake", course2, instructor2, "2026-08-01", "2026-08-02", 25, "Hybrid");

		course1.setInstructor(instructor1);
		course2.setInstructor(instructor2);

        System.out.println("Instructor Profiles:");
		System.out.println("------------------------------");
        instructor1.printProfile();
		System.out.println("************************");
        instructor2.printProfile();

		System.out.println("\nCourse Summaries:");
		System.out.println("------------------------------");
		course1.printSummary();
		System.out.println("************************");
		course2.printSummary();

		System.out.println("\nStudent Profiles:");
		System.out.println("------------------------------");
		student1.printProfile();
		System.out.println("************************");
		student2.printProfile();

		System.out.println("\nCourse Offering Summaries:");
		System.out.println("------------------------------");	
		offering1.printOfferingSummary();
		System.out.println("************************");
		offering2.printOfferingSummary();	
		System.out.println("************************");
		offering3.printOfferingSummary();
	}
}
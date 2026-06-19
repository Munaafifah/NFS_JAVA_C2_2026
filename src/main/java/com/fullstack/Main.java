package src.main.java.com.fullstack;

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
	}
}
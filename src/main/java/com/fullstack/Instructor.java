package src.main.java.com.fullstack;  

public class Instructor {
    private String instructorId;
    private String instructorName;
    private String expertise;

    public Instructor(String instructorId, String name, String expertise) {
        this.instructorId = instructorId;
        this.instructorName = name;
        this.expertise = expertise;
    }

    public String getInstructorId() {
        return instructorId;
    }

    public String getInstructorName() {
        return instructorName;
    }

    public String getExpertise() {
        return expertise;
    }

    public void printProfile() {
        System.out.println("Instructor ID: " + instructorId);
        System.out.println("Name: " + instructorName);
        System.out.println("Expertise: " + expertise);
    }
}
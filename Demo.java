public class Demo {
    public static void main(String[] args) {
        //Primitives in Java
        int number = 10; //32-bit signed integer
        double pi = 3.1415926535897932386;//64-bit floating-point number
        boolean isTrue = true; //1-bit boolean value
        char character = 'A'; //16-bit Unicode character
        byte smallNumber = 127; //8-bit signed integer
        short mediumNumber = 32767; //16-bit signed integer
        long largeNumber = 9223372036854775807L; //64-bit signed integer
        float floatNumber = 3.14f; //32-bit floating-point number

        //Reference data types in Java
        String text = "Hello, World!"; //String is a reference type
        Object obj = new Object(); //Object is the root class of all reference types
        int[] numbers = {1, 2, 3, 4, 5}; //Array is a reference type
        double[] decimalNumbers = {1.1, 2.2, 3.3, 4.4, 5.5}; //Array is a reference type
        String[] words = {"apple", "banana", "cherry"}; //Array of Strings is a reference type
        String[] emptyArray = new String[5]; //Array of Strings with 5 elements, all initialized to null
    }
}
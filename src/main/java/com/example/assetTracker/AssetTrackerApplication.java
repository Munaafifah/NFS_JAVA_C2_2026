package com.example.assetTracker;

/*	
Normal run:
.\mvn spring-boot:run

Run this local profile:
.\mvn spring-boot:run -Dspring-boot.run.profiles=local
*/

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AssetTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(AssetTrackerApplication.class, args);
	}

}

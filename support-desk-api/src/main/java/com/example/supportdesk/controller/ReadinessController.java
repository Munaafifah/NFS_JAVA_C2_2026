package com.example.supportdesk.controller;

import com.example.supportdesk.service.ReadinessService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class ReadinessController {

    private final ReadinessService readinessService;

    public ReadinessController(ReadinessService readinessService) {
        this.readinessService = readinessService;
    }

    @GetMapping("/api/readiness")
    public ResponseEntity<Map<String, String>> checkReadiness() {
        boolean databaseConnected = readinessService.isDatabaseConnected();

        Map<String, String> response = new LinkedHashMap<>();
        response.put("service", "support-desk-api");

        if (databaseConnected) {
            response.put("status", "READY");
            response.put("database", "CONNECTED");
            return ResponseEntity.ok(response);
        }

        response.put("status", "NOT_READY");
        response.put("database", "Database readiness check failed");

        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
    }
}
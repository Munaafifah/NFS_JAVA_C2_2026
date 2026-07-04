package com.example.assetTracker.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class HealthController {

    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of(
            "status", "UP",
            "service", "asset-tracker-api"
        );
    }

    @GetMapping("/api/about")
    public Map<String, String> about() {
        return Map.of(
            "appName", "Support Desk API",
            "version", "1.0.0",
            "description", "API for managing IT support tickets"
        );
    }
}

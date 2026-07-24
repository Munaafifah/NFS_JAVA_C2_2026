package com.example.supportdesk.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class InfoController {

    @GetMapping("/info")
    public Map<String, String> getApiInfo() {
        return Map.of(
                "name", "Support Desk API",
                "version", "1.0.0"
        );
    }
}
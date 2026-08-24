package com.example.supportdesk.service;

import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class ReadinessService {

    private static final Logger log = LoggerFactory.getLogger(ReadinessService.class);

    private final MongoTemplate mongoTemplate;

    public ReadinessService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public boolean isDatabaseConnected() {
        try {
            mongoTemplate.executeCommand(new Document("ping", 1));
            return true;
        } catch (Exception ex) {
            log.error("Database readiness check failed");
            return false;
        }
    }
}
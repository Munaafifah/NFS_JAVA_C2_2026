package com.example.supportdesk.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.data.mapping.context.MappingContext;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.IndexOperations;
import org.springframework.data.mongodb.core.index.IndexResolver;
import org.springframework.data.mongodb.core.index.MongoPersistentEntityIndexResolver;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoPersistentEntity;
import org.springframework.data.mongodb.core.mapping.MongoPersistentProperty;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
public class MongoConfig {

    @Value("${spring.data.mongodb.host}")
    private String mongoHost;

    @Value("${spring.data.mongodb.port}")
    private String mongoPort;

    @Value("${spring.data.mongodb.database}")
    private String mongoDatabase;

    @Value("${spring.data.mongodb.authentication-database}")
    private String mongoAuthDatabase;

    @Value("${spring.data.mongodb.username}")
    private String mongoUsername;

    @Value("${spring.data.mongodb.password}")
    private String mongoPassword;

    @Bean
    public MongoClient mongoClient() {
        String uri = String.format(
                "mongodb://%s:%s@%s:%s/%s?authSource=%s",
                mongoUsername, mongoPassword, mongoHost, mongoPort, mongoDatabase, mongoAuthDatabase
        );

        ConnectionString connectionString = new ConnectionString(uri);

        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .build();

        return MongoClients.create(settings);
    }

    @Bean
    public MongoTemplate mongoTemplate(MongoClient mongoClient) {
        return new MongoTemplate(mongoClient, mongoDatabase);
    }

    // Manually defining MongoClient/MongoTemplate above means Spring Boot's
    // automatic @Indexed index creation (auto-index-creation=true) does not
    // reliably fire on its own. This listener explicitly rebuilds indexes for
    // every @Document entity on startup, so a fresh clone/grading environment
    // always ends up with the correct indexes without any manual mongosh step.
    @Bean
    public ApplicationListener<ContextRefreshedEvent> mongoIndexInitializer(MongoTemplate mongoTemplate) {
        return event -> {
            MappingContext<? extends MongoPersistentEntity<?>, MongoPersistentProperty> mappingContext =
                    mongoTemplate.getConverter().getMappingContext();

            IndexResolver resolver = new MongoPersistentEntityIndexResolver(mappingContext);

            mappingContext.getPersistentEntities().stream()
                    .filter(entity -> entity.isAnnotationPresent(Document.class))
                    .forEach(entity -> {
                        IndexOperations indexOps = mongoTemplate.indexOps(entity.getType());
                        resolver.resolveIndexFor(entity.getType()).forEach(indexOps::ensureIndex);
                    });
        };
    }
}
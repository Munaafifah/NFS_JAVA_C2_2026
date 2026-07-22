package com.example.assetTracker.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.assetTracker.model.Ticket;

public interface TicketRepository extends MongoRepository<Ticket, String> {
}
package com.example.supportdesk.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.supportdesk.model.Ticket;

public interface TicketRepository extends MongoRepository<Ticket, String> {
}
package com.example.supportdesk.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.supportdesk.model.Ticket;

public interface TicketRepository extends MongoRepository<Ticket, String> {

    List<Ticket> findByStatus(String status);

    List<Ticket> findByPriority(String priority);

    List<Ticket> findByCategory(String category);

    boolean existsByTitleIgnoreCase(String title);
}
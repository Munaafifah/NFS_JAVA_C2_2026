package com.example.supportdesk.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.supportdesk.dto.CreateTicketRequest;
import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.exception.ResourceNotFoundException;
import com.example.supportdesk.model.Ticket;
import com.example.supportdesk.repository.TicketRepository;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<TicketResponse> getAllTickets() {
        return ticketRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public TicketResponse getTicketById(String id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket " + id + " was not found"));
        return toResponse(ticket);
    }

    public TicketResponse createTicket(CreateTicketRequest request) {
        Ticket newTicket = new Ticket(
                request.getTitle(),
                request.getDescription(),
                request.getCategory(),
                request.getPriority(),
                "OPEN",
                request.getCreatedBy(),
                LocalDate.now()
        );

        Ticket saved = ticketRepository.save(newTicket);
        return toResponse(saved);
    }

    private TicketResponse toResponse(Ticket ticket) {
        return new TicketResponse(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getCategory(),
                ticket.getPriority(),
                ticket.getStatus(),
                ticket.getCreatedBy(),
                ticket.getCreatedAt().toString()
        );
    }
}
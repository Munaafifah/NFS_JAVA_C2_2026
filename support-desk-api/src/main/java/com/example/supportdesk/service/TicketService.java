package com.example.supportdesk.service;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.supportdesk.dto.CreateTicketRequest;
import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.exception.ResourceNotFoundException;
import com.example.supportdesk.model.Ticket;
import com.example.supportdesk.repository.TicketRepository;

@Service
public class TicketService {

    private static final Logger log = LoggerFactory.getLogger(TicketService.class);

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<TicketResponse> getAllTickets(String status, String priority, String category) {
        log.info("Fetching tickets with filters - status={}, priority={}, category={}", status, priority, category);

        List<Ticket> tickets;

        if (status != null) {
            tickets = ticketRepository.findByStatus(status);
        } else if (priority != null) {
            tickets = ticketRepository.findByPriority(priority);
        } else if (category != null) {
            tickets = ticketRepository.findByCategory(category);
        } else {
            tickets = ticketRepository.findAll();
        }

        return tickets.stream()
                .map(this::toResponse)
                .toList();
    }

    public Page<TicketResponse> getPagedTickets(int page, int size, String sortBy, String direction) {
        log.info("Fetching paginated tickets - page={}, size={}, sortBy={}, direction={}", page, size, sortBy, direction);

        Sort.Direction sortDirection = direction.equalsIgnoreCase("asc")
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));

        Page<Ticket> ticketPage = ticketRepository.findAll(pageable);

        return ticketPage.map(this::toResponse);
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
        log.info("Created new ticket with id={}", saved.getId());
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
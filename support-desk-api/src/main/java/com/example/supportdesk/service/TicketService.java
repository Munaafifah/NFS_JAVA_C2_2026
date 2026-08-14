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
import com.example.supportdesk.dto.UpdateTicketRequest;
import com.example.supportdesk.exception.DuplicateResourceException;
import com.example.supportdesk.exception.ResourceNotFoundException;
import com.example.supportdesk.model.Ticket;
import com.example.supportdesk.repository.TicketRepository;

@Service
public class TicketService {

    private static final String DEFAULT_STATUS_ON_CREATE = "OPEN";

    private static final Logger log = LoggerFactory.getLogger(TicketService.class);

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<TicketResponse> getAllTickets(String status, String priority, String category) {
        log.info("Fetching tickets with filters - status={}, priority={}, category={}", status, priority, category);

        List<Ticket> tickets = fetchByFirstMatchingFilter(status, priority, category);

        return tickets.stream()
                .map(this::toResponse)
                .toList();
    }

    public Page<TicketResponse> getPagedTickets(int page, int size, String sortBy, String direction) {
        log.info("Fetching paginated tickets - page={}, size={}, sortBy={}, direction={}", page, size, sortBy, direction);

        Pageable pageable = PageRequest.of(page, size, Sort.by(resolveSortDirection(direction), sortBy));

        Page<Ticket> ticketPage = ticketRepository.findAll(pageable);

        return ticketPage.map(this::toResponse);
    }

    public TicketResponse getTicketById(String id) {
        Ticket ticket = findTicketOrThrow(id);
        return toResponse(ticket);
    }

    public TicketResponse createTicket(CreateTicketRequest request) {
        ensureTitleIsUniqueForCreate(request.getTitle());

        Ticket newTicket = new Ticket(
                request.getTitle(),
                request.getDescription(),
                request.getCategory(),
                request.getPriority(),
                DEFAULT_STATUS_ON_CREATE,
                request.getCreatedBy(),
                LocalDate.now()
        );

        Ticket saved = ticketRepository.save(newTicket);
        log.info("Created new ticket with id={}", saved.getId());
        return toResponse(saved);
    }

    public TicketResponse updateTicket(String id, UpdateTicketRequest request) {
        Ticket ticket = findTicketOrThrow(id);

        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setCategory(request.getCategory());
        ticket.setPriority(request.getPriority());
        ticket.setStatus(request.getStatus());

        Ticket updated = ticketRepository.save(ticket);
        log.info("Updated ticket with id={}", updated.getId());
        return toResponse(updated);
    }

    private List<Ticket> fetchByFirstMatchingFilter(String status, String priority, String category) {
        if (status != null) {
            return ticketRepository.findByStatus(status);
        }
        if (priority != null) {
            return ticketRepository.findByPriority(priority);
        }
        if (category != null) {
            return ticketRepository.findByCategory(category);
        }
        return ticketRepository.findAll();
    }

    private Ticket findTicketOrThrow(String id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket " + id + " was not found"));
    }

    private void ensureTitleIsUniqueForCreate(String title) {
        if (ticketRepository.existsByTitleIgnoreCase(title)) {
            throw new DuplicateResourceException(
                    "A ticket with the title '" + title + "' already exists");
        }
    }

    private Sort.Direction resolveSortDirection(String direction) {
        return direction.equalsIgnoreCase("asc")
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;
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
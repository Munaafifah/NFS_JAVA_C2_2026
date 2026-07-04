package com.example.assetTracker.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.assetTracker.dto.CreateTicketRequest;
import com.example.assetTracker.dto.TicketResponse;
import com.example.assetTracker.exception.ResourceNotFoundException;

@Service
public class TicketService {

    private final List<TicketResponse> tickets = new ArrayList<>();

    public TicketService() {
        tickets.add(new TicketResponse(
                "T001",
                "Cannot access email",
                "User cannot login to company email account.",
                "Email",
                "HIGH",
                "OPEN",
                "amir@example.com",
                "2026-07-03"
        ));

        tickets.add(new TicketResponse(
                "T002",
                "Laptop is slow",
                "User reports laptop taking long time to start up and open apps.",
                "Hardware",
                "MEDIUM",
                "OPEN",
                "siti@example.com",
                "2026-07-03"
        ));

        tickets.add(new TicketResponse(
                "T003",
                "VPN connection not working",
                "User is unable to connect to company VPN from home.",
                "Network",
                "HIGH",
                "OPEN",
                "raju@example.com",
                "2026-07-04"
        ));
    }

    public List<TicketResponse> getAllTickets() {
        return tickets;
    }

    public TicketResponse getTicketById(String id) {
        return tickets.stream()
                .filter(ticket -> ticket.getId().equalsIgnoreCase(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Ticket " + id + " was not found"));
    }

    public TicketResponse createTicket(CreateTicketRequest request) {
        TicketResponse newTicket = new TicketResponse(
                createNextId(),
                request.getTitle(),
                request.getDescription(),
                request.getCategory(),
                request.getPriority(),
                "OPEN",
                request.getCreatedBy(),
                LocalDate.now().toString()
        );

        tickets.add(newTicket);
        return newTicket;
    }

    private String createNextId() {
        return "T" + String.format("%03d", tickets.size() + 1);
    }
}

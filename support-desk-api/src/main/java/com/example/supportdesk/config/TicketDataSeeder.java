package com.example.supportdesk.config;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.supportdesk.model.Ticket;
import com.example.supportdesk.repository.TicketRepository;

@Configuration
public class TicketDataSeeder {

    @Bean
    CommandLineRunner seedTickets(TicketRepository ticketRepository) {
        return args -> {
            if (ticketRepository.count() > 0) {
                return;
            }

            ticketRepository.save(new Ticket(
                    "Cannot access email",
                    "User cannot login to company email account.",
                    "Email",
                    "HIGH",
                    "OPEN",
                    "amir@example.com",
                    LocalDate.of(2026, 7, 3)
            ));

            ticketRepository.save(new Ticket(
                    "Laptop is slow",
                    "User reports laptop taking long time to start up and open apps.",
                    "Hardware",
                    "MEDIUM",
                    "OPEN",
                    "siti@example.com",
                    LocalDate.of(2026, 7, 3)
            ));

            ticketRepository.save(new Ticket(
                    "VPN connection not working",
                    "User is unable to connect to company VPN from home.",
                    "Network",
                    "HIGH",
                    "OPEN",
                    "raju@example.com",
                    LocalDate.of(2026, 7, 4)
            ));
        };
    }
}
package com.example.supportdesk.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.supportdesk.dto.AuthResponse;
import com.example.supportdesk.dto.LoginRequest;
import com.example.supportdesk.dto.RegisterRequest;
import com.example.supportdesk.model.AppUser;
import com.example.supportdesk.repository.AppUserRepository;

@Service
public class AuthService {

    private final AppUserRepository appUserRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(AppUserRepository appUserRepository, JwtService jwtService) {
        this.appUserRepository = appUserRepository;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        if (appUserRepository.existsByEmailIgnoreCase(normalizedEmail)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());

        AppUser newUser = new AppUser(
                request.getName(),
                normalizedEmail,
                hashedPassword,
                "USER"
        );

        AppUser saved = appUserRepository.save(newUser);

        String token = jwtService.generateToken(saved.getEmail(), saved.getRole());

        return new AuthResponse(token, saved.getEmail(), saved.getRole());
    }

    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        AppUser user = appUserRepository.findByEmailIgnoreCase(normalizedEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getRole());

        return new AuthResponse(token, user.getEmail(), user.getRole());
    }
}
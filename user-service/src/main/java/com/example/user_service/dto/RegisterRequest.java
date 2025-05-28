package com.example.user_service.dto;

public record RegisterRequest(
    @NotBlank String email,
    @NotBlank @Size(min = 6) String password
) {}

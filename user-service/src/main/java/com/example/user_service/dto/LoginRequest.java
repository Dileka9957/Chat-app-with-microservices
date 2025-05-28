package com.example.user_service.dto;

public record LoginRequest(
    @NotBlank String email,
    @NotBlank String password
) {}
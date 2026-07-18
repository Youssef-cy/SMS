package com.Company.SMS.DTO.Response;

import lombok.*;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private Long expiresAt;
    private String role;
}

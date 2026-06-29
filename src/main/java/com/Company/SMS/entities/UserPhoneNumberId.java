package com.Company.SMS.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class UserPhoneNumberId implements Serializable {
    private static final long serialVersionUID = 4986848407214847006L;
    @NotNull
    @Column(name = "USER_ID", nullable = false)
    private Long userId;

    @NotNull
    @Column(name = "PHONE_NUMBER", nullable = false)
    private Long phoneNumber;


}
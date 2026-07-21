package com.Company.SMS.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "USER_PHONE_NUMBERS")
@AllArgsConstructor
@NoArgsConstructor
public class UserPhoneNumber {
    @EmbeddedId
    private UserPhoneNumberId id;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;


}

package com.Company.SMS.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "NOTIFICATION")
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator ="NOTIFICATION_SEQ" )
    @SequenceGenerator(
            name = "NOTIFICATION_SEQ",
            sequenceName = "NOTIFICATION_SEQ",
            allocationSize = 1
    )
    @Column(name = "NOTIFICATION_ID", nullable = false)
    private Long id;

    @Size(max = 255)
    @NotNull
    @Column(name = "TITLE", nullable = false)
    private String title;

    @Size(max = 255)
    @NotNull
    @Column(name = "\"TYPE\"", nullable = false)
    private String type;

    @Size(max = 255)
    @NotNull
    @Column(name = "PRIORITY", nullable = false)
    private String priority;

    @ColumnDefault("sysdate")
    @Column(name = "SENT_AT")
    private LocalDate sentAt;

    @Size(max = 255)
    @NotNull
    @Column(name = "\"BODY\"", nullable = false)
    private String body;


}

package com.Company.SMS.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "SESSIONS")
@AllArgsConstructor
@NoArgsConstructor
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sessions_seq")
    @SequenceGenerator(
            name = "sessions_seq",
            sequenceName = "SESSIONS_SEQ",
            allocationSize = 1
    )
    @Column(name = "SESSION_ID")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "CLASS_ID", nullable = false)
    private Class classField;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "COURSE_ID", nullable = false)
    private Course course;

    @NotNull
    @Column(name = "DAY_OF_WEEK", nullable = false)
    private Long dayOfWeek;

    @NotNull
    @Column(name = "START_AT", nullable = false)
    private LocalTime startAt;

    @NotNull
    @Column(name = "END_AT", nullable = false)
    private LocalTime endAt;

    @NotNull
    @Column(name = "UPDATED_AT", nullable = false)
    private LocalDate updatedAt;
}
package com.Company.SMS.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "TEACHER")
@AllArgsConstructor
@NoArgsConstructor
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE ,generator = "TEACHER_SEQ")
    @SequenceGenerator(
            name = "TEACHER_SEQ",
            sequenceName = "TEACHER_SEQ",
            allocationSize = 1
    )
    @Column(name = "TEACHER_ID", nullable = false)
    private Long id;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY, optional = false ,cascade = CascadeType.ALL)
    @JoinColumn(name = "USER_ID", nullable = false, unique = true)
    private User user;

    @Size(max = 255)
    @Column(name = "EDUCATION")
    private String education;

    @Size(max = 255)
    @Column(name = "EMPLOYMENT_HISTORY")
    private String employmentHistory;

    @Column(name = "NUMBER_OF_YEARS_OF_EXPERIENCE")
    private Long numberOfYearsOfExperience;


}
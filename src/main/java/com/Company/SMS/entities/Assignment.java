package com.Company.SMS.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "ASSIGNMENT")
@AllArgsConstructor
@NoArgsConstructor
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ASSIGNMENT_ID", nullable = false)
    private Long id;

    @Size(max = 255)
    @NotNull
    @Column(name = "NAME", nullable = false)
    private String name;

    @NotNull
    @Column(name = "DEADLINE", nullable = false)
    private LocalDate deadline;

    @NotNull
    @Column(name = "ASSIGN_DATE", nullable = false)
    private LocalDate assignDate;

    @Size(max = 255)
    @NotNull
    @Column(name = "DESCRIPTION", nullable = false)
    private String description;

    @Size(max = 255)
    @Column(name = "FILE_LINK")
    private String fileLink;

    @Size(max = 255)
    @NotNull
    @Column(name = "STUDENT_SUBMISSION", nullable = false)
    private String studentSubmission;

    @ManyToMany(mappedBy = "assignments")
    private Set<Course> courses = new LinkedHashSet<>();


}
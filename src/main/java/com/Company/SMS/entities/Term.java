package com.Company.SMS.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "TERM")
@AllArgsConstructor
@NoArgsConstructor
public class Term {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "TERM_ID", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "TERM", nullable = false)
    private Long term;


    @ManyToMany(mappedBy = "terms")
    @JsonIgnore
    private Set<Grade> grades = new LinkedHashSet<>();

    @Column(name = "NAME")
    private String name;

    @NotNull
    @Column(name = "YEAR", nullable = false)
    private Long year;
}
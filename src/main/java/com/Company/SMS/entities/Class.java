package com.Company.SMS.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "CLASS")
@AllArgsConstructor
@NoArgsConstructor
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE ,generator = "class_seq")
    @SequenceGenerator(
            name = "class_seq",
            sequenceName = "CLASS_SEQ",
            allocationSize = 1
    )
    @Column(name = "CLASS_ID", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "GRADE_ID", nullable = false)
    private Grade grade;

    @Size(max = 255)
    @NotNull
    @Column(name = "NAME", nullable = false)
    private String name;

    @NotNull
    @Column(name = "CAPACITY", nullable = false)
    private Long capacity;

    @OneToMany(mappedBy = "studentClass")
    private List<Student> students;

}
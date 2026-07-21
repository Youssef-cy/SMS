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
@Table(name = "MARKS_TYPE")
@AllArgsConstructor
@NoArgsConstructor
public class MarksType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "TYPE_ID", nullable = false)
    private Long id;

    @Size(max = 50)
    @NotNull
    @Column(name = "\"TYPE\"", nullable = false, length = 50)
    private String type;

    @OneToMany(mappedBy = "type", cascade = CascadeType.ALL)
    private List<Mark> marks = new ArrayList<>();
}

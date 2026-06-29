package com.Company.SMS.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "ATTENDANCE")
@AllArgsConstructor
@NoArgsConstructor
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "ATTENDANCE_SEQ")
    @SequenceGenerator(
            name = "ATTENDANCE_SEQ",
            sequenceName = "ATTENDANCE_SEQ",
            allocationSize = 1
    )
    @Column(name = "ATTENDANCE_ID", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "STUDENT_ID", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SESSION_ID")
    private Session session;

    @Column(name = "STATUS")
    private Character status;


}
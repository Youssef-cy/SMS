package com.Company.SMS.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "EXAMS_TABLE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExamTable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "exam_table_seq")
    @SequenceGenerator(
            name = "exam_table_seq",
            sequenceName = "EXAM_TABLE_SEQ",
            allocationSize = 1
    )
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STUDENT_EXAM_ID", nullable = false)
    private StudentExam studentExam;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GRADE_ID", nullable = false)
    private Grade grade;

    @Column(name = "DURATION")
    private Long duration;

    @Column(name = "EXAM_DATE")
    private LocalDate examDate;

    @Column(name = "COURSE_NAME")
    private String courseName;

    @Column(name = "EXAM_TIME")
    private LocalTime examTime;

    @Column(name = "LOCATION")
    private String location;

    @Column(name = "STATUS")
    private String status;

    @Enumerated(EnumType.STRING)
    @Column(name = "EXAM_TYPE", nullable = false)
    private ExamType examType;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;
}



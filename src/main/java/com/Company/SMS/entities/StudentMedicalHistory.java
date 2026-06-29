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
@Table(name = "STUDENT_MEDICAL_HISTORY")
@AllArgsConstructor
@NoArgsConstructor
public class StudentMedicalHistory {
    @EmbeddedId
    private StudentMedicalHistoryId id;

    @MapsId("studentId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "STUDENT_ID", nullable = false)
    private Student student;


}
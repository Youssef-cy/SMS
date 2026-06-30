import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.html',
  styleUrls: ['./students.css']
})
export class StudentsComponent {
    studentsList = [
    { id: '#10042', name: 'Salma Tamer', grade: 'Grade 12', attendance: 96, class: 'B' },
    { id: '#10043', name: 'Raghad Mostafa', grade: 'Grade 11', attendance: 80, class: 'A' },
    { id: '#10044', name: 'Farah Hussein', grade: 'Grade 10', attendance: 55, class: 'B' },
    { id: '#10045', name: 'Jana Mohammed', grade: 'Grade 12', attendance: 78, class: 'A' },
    { id: '#10046', name: 'Fatma El-zahraa', grade: 'Grade 12', attendance: 92, class: 'B' },
    { id: '#10047', name: 'Basmala Ashraf', grade: 'Grade 11', attendance: 90, class: 'A' }
  ];
  getAttendanceClass(attendance: number): string {
    if (attendance >= 90) {
      return 'green';
    } else if (attendance >= 75) {
      return 'orange';
    } else {
      return 'red';
    }
  }
  onViewStudent(studentName: string) {
    console.log('Viewing student details for:', studentName);
  }
}
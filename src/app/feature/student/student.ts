import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { StudentS } from '../../core/service/student-s';
import { StudentI } from '../../core/model/student-i';
import { TopNavbar } from "./components/top-navbar/top-navbar";

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, TopNavbar],
  templateUrl: './student.html',
  styleUrls: ['./student.css']
})
export class StudentsComponent implements OnInit {
   data = signal<StudentI[]>([])
   grades = signal<string[]>([]);
  searchText = signal<string>('');
selectedGrade = signal<string>('ALL');
    constructor(private content:StudentS){}

  ngOnInit(): void {
    this.getAll()
  }

 getAll() {
  this.content.getAllStudent().subscribe({
    next: (data) => {
      this.data.set(data);

      const uniqueGrades = Array.from(
        new Set(data.map(s => s.gradeName))
      );

      this.grades.set(uniqueGrades);
    },
    error: (err) => console.log(err)
  });
}

get filteredStudents() {
  const grade = this.selectedGrade();
  const search = this.searchText().toLowerCase();

  return this.data().filter(student => {
    const matchGrade = grade === 'ALL' || student.gradeName === grade;

    const matchSearch =
      student.firstName.toLowerCase().includes(search) ||
      student.studentId.toString().includes(search);

    return matchGrade && matchSearch;
  });
} 
}
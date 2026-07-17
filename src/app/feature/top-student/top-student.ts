import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Marks } from '../../core/service/marks';
import { MarkI } from '../../core/model/markRES';

@Component({
  selector: 'app-top-students',
  templateUrl: './top-student.html',
  styleUrls: ['./top-student.css'],
})
export class TopStudentsComponent implements OnInit {
  constructor(private content: Marks, private router: Router) {}

  allData = signal<MarkI[]>([]);
  grades = signal<string[]>([]);
  data = signal<MarkI[]>([]);

  ngOnInit() {
    this.getMarks();
  }

  getMarks() {
    this.content.getMarks().subscribe({
      next: (res) => {
        this.allData.set(res);
        this.data.set(res);

        this.grades.set([...new Set(res.map((x) => x.gradeName))]);
      },
      error: (err) => console.log(err),
    });
  }

  filterByGrade(grade: string) {
    if (grade === 'All grades') {
      this.data.set(this.allData());
      return;
    }

    this.data.set(this.allData().filter((x) => x.gradeName === grade));
  }

  viewStudent(student: any) {
    const id = student.studentId || student.StudentId || student.student_id || student.id;
    if (id) {
      this.router.navigate(['/studentProfile', id]);
    } else {
      console.error('Could not find student ID in:', student);
    }
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { Marks } from '../../core/service/marks';
import { MarkI } from '../../core/model/mark-i';

@Component({
  selector: 'app-top-students',
  templateUrl: './top-student.html',
  styleUrls: ['./top-student.css'],
})
export class TopStudentsComponent implements OnInit {
  constructor(private content: Marks) {}

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
}

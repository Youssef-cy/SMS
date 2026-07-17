import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { SessionsService } from '../../../core/service/session-service';
import { ClassRES } from '../../../core/model/class-res';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter.html',
  styleUrls: ['./filter.css'],
})
export class Filter implements OnInit{
constructor(private sessionservice:SessionsService){}

data = signal<ClassRES[]>([])
grades = signal<string[]>([]);

@Output() filterChanged = new EventEmitter<{
  grade: string;
  classId: number | string;
}>();

  selectedGrade = 'all';
  selectedClass: string | number = 'all';

  ngOnInit(): void {
    this.getAllClass();
  }

  getAllClass() {
    this.sessionservice.getClass().subscribe({
      next: (data) => {
        this.data.set(data);

        const uniqueGrades = [...new Set(data.map(c => c.grade))];
        this.grades.set(uniqueGrades);

        if (data.length > 0) {
          this.selectedGrade = 'all';
          this.selectedClass = data[0].id;
        } else {
          this.selectedGrade = 'all';
          this.selectedClass = 'all';
        }

        this.emitFilter();
      }
    });
  }

  getFilteredClasses(): ClassRES[] {
    if (this.selectedGrade === 'all') {
      return this.data();
    }
    return this.data().filter(c => c.grade === this.selectedGrade);
  }

  onGradeChange() {
    const filtered = this.getFilteredClasses();
    if (filtered.length > 0) {
      this.selectedClass = filtered[0].id;
    } else {
      this.selectedClass = 'all';
    }
    this.emitFilter();
  }

  emitFilter() {
    this.filterChanged.emit({
      grade: this.selectedGrade,
      classId: this.selectedClass
    });
  }

  clearFilters() {
    this.selectedGrade = 'all';
    this.selectedClass = 'all';
    this.emitFilter();
  }
}
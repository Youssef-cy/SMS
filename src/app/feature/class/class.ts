import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClassFormComponent } from './create-class/form-group';
import { ClassService } from '../../core/service/class.service';
import { GradeService } from '../../core/service/grade-service';
import { ClassRES } from '../../core/model/class-res';
import { GradeRES } from '../../core/model/grade-res';

@Component({
  selector: 'app-class',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './class.html',
  styleUrl: './class.css',
})
export class Class implements OnInit {

  classes: ClassRES[] = [];
  allClasses: ClassRES[] = [];
  grades: GradeRES[] = [];
  selectedGradeId: number | null = null;

  constructor(
    private dialog: MatDialog,
    private classService: ClassService,
    private gradeService: GradeService
  ) {}

  ngOnInit(): void {
    this.gradeService.getAllGrades().subscribe(res => {
      this.grades = res || [];
      if (this.grades.length > 0) {
        this.selectedGradeId = this.grades[0].id;
      }
      this.loadClasses();
    });
  }

  loadClasses(): void {
    this.classService.getAllClasses().subscribe(res => {
      this.allClasses = res;
      this.filterClasses();
    });
  }

  filterClasses(): void {
    if (this.selectedGradeId !== null && this.grades.length > 0) {
      const selectedGradeObj = this.grades.find(g => g.id == this.selectedGradeId);
      if (selectedGradeObj) {
        this.classes = this.allClasses.filter(c => c.grade === selectedGradeObj.grade);
      } else {
        this.classes = [];
      }
    } else {
      this.classes = [];
    }
  }

  openDilog(classObj?: ClassRES) {
    const dialogRef = this.dialog.open(ClassFormComponent, {
      width: '1000px',
      data: classObj || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClasses();
      }
    });
  }

  deleteClass(id: number): void {
    if (confirm('Are you sure you want to delete this class?')) {
      this.classService.deleteClass(id).subscribe(() => {
        this.loadClasses();
      });
    }
  }

  deleteAllClasses(): void {
    if (confirm('Are you sure you want to delete ALL classes?')) {
      this.classService.deleteAllClasses().subscribe(() => {
        this.loadClasses();
      });
    }
  }
}

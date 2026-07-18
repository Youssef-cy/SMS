import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClassFormComponent } from './create-class/form-group';
import { ClassService } from '../../core/service/class.service';
import { GradeService } from '../../core/service/grade-service';
import { ClassRES } from '../../core/model/class-res';
import { GradeRES } from '../../core/model/grade-res';
import swal from 'sweetalert2';
import { forkJoin } from 'rxjs';

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
  
  loading: boolean = false;
  selectedClassIds: Set<number> = new Set();

  constructor(
    private dialog: MatDialog,
    private classService: ClassService,
    private gradeService: GradeService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    console.log("SMS_DEBUG: Fetching grades from GradeService...");
    this.gradeService.getAllGrades().subscribe({
      next: (res) => {
        console.log("SMS_DEBUG: Grades received successfully from backend:", res);
        this.grades = res || [];
        if (this.grades.length > 0) {
          this.selectedGradeId = this.grades[0].id;
          console.log("SMS_DEBUG: Selected default Grade ID:", this.selectedGradeId);
        } else {
          console.warn("SMS_DEBUG: Received empty grades list from backend.");
        }
        this.loadClasses();
      },
      error: (err) => {
        console.error("SMS_DEBUG: Error fetching grades from backend:", err);
        this.loading = false;
      }
    });
  }

  loadClasses(): void {
    this.loading = true;
    console.log("SMS_DEBUG: Fetching classes from ClassService...");
    this.classService.getAllClasses().subscribe({
      next: (res) => {
        console.log("SMS_DEBUG: Classes received successfully from backend:", res);
        this.allClasses = res || [];
        try {
          this.filterClasses();
          console.log("SMS_DEBUG: Filtered classes for current grade:", this.classes);
        } catch(e) {
          console.error("SMS_DEBUG: Exception inside filterClasses():", e);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error("SMS_DEBUG: Error fetching classes from backend:", err);
        this.loading = false;
        swal.fire('Error', 'Failed to load classes', 'error');
      }
    });
  }

  filterClasses(): void {
    this.selectedClassIds.clear(); // clear selections when filter changes
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

  toggleSelection(classId: number): void {
    if (this.selectedClassIds.has(classId)) {
      this.selectedClassIds.delete(classId);
    } else {
      this.selectedClassIds.add(classId);
    }
  }

  deleteClass(id: number): void {
    swal.fire({
      title: 'Delete Class?',
      text: 'Are you sure you want to delete this class?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.classService.deleteClass(id).subscribe({
          next: () => {
            swal.fire('Deleted!', 'Class has been deleted.', 'success');
            this.selectedClassIds.delete(id);
            this.loadClasses();
          },
          error: (err) => {
            console.error(err);
            this.loading = false;
            swal.fire('Error!', 'Failed to delete class.', 'error');
          }
        });
      }
    });
  }

  deleteSelectedClasses(): void {
    if (this.selectedClassIds.size === 0) return;

    swal.fire({
      title: 'Delete Selected Classes?',
      text: `Are you sure you want to delete ${this.selectedClassIds.size} selected classes?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete them!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        const deleteObservables = Array.from(this.selectedClassIds).map(id => this.classService.deleteClass(id));
        
        forkJoin(deleteObservables).subscribe({
          next: () => {
            swal.fire('Deleted!', 'Selected classes have been deleted.', 'success');
            this.selectedClassIds.clear();
            this.loadClasses();
          },
          error: (err) => {
            console.error(err);
            this.loading = false;
            swal.fire('Error!', 'Failed to delete some or all selected classes.', 'error');
          }
        });
      }
    });
  }
}

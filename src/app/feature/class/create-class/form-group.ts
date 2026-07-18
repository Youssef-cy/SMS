import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClassService } from '../../../core/service/class.service';
import { GradeService } from '../../../core/service/grade-service';
import { GradeRES } from '../../../core/model/grade-res';
import { ClassRES } from '../../../core/model/class-res';
import { ClassREQ } from '../../../core/model/class-req';
import swal from 'sweetalert2';

@Component({
  selector: 'app-class-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-group.html',
  styleUrls: ['./form-group.css']
})
export class ClassFormComponent implements OnInit {

  classForm: FormGroup;
  grades: GradeRES[] = [];
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClassFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClassRES | null,
    private classService: ClassService,
    private gradeService: GradeService
  ) {
    this.isEditMode = !!data;
    this.classForm = this.fb.group({
      className: [data?.className || '', Validators.required],
      grade: ['', Validators.required],
      capacity: [data?.capacity || '', Validators.required]
    });
  }

  ngOnInit(): void {
    this.gradeService.getAllGrades().subscribe(res => {
      this.grades = res;
      if (this.isEditMode && this.data) {
        const gradeObj = this.grades.find(g => g.grade === this.data?.grade);
        if (gradeObj) {
          this.classForm.patchValue({ grade: gradeObj.id });
        }
      }
    });
  }

  get f() {
    return this.classForm.controls;
  }

  onSubmit(): void {
    if (this.classForm.valid) {
      const formValue = this.classForm.value;
      const req: ClassREQ = {
        className: formValue.className,
        gradeId: Number(formValue.grade),
        capacity: Number(formValue.capacity)
      };
      
      if (this.isEditMode && this.data) {
        this.classService.updateClass(this.data.id, req).subscribe({
          next: () => {
            swal.fire('Success', 'Class updated successfully', 'success');
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
            swal.fire('Error', 'Failed to update class', 'error');
          }
        });
      } else {
        this.classService.addClass(req).subscribe({
          next: () => {
            swal.fire('Success', 'Class created successfully', 'success');
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
            swal.fire('Error', 'Failed to create class', 'error');
          }
        });
      }
    } else {
      this.classForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
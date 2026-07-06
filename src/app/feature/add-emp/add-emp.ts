import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TeacherService } from '../../core/service/TeacherService';
import Swal from 'sweetalert2';
import { AddBtn } from '../../shared/add-btn/add-btn';
import { SaveBtn } from '../../shared/save-btn/save-btn';
import { CancelBtn } from '../../shared/cancel-btn/cancel-btn';
import { WorkerService } from '../../core/service/worker-service';
import { GradeService } from '../../core/service/grade-service';
import { GradeRES } from '../../core/model/grade-res';
import { RoleService } from '../../core/service/role-service';
import { Role } from '../../core/model/role';

@Component({
  selector: 'app-add-emp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddBtn, SaveBtn, CancelBtn],
  templateUrl: './add-emp.html',
  styleUrl: './add-emp.css',
})
export class AddEmp implements OnInit{
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teacherservice: TeacherService,
    private workerservice: WorkerService,
    private grades:GradeService,
    private roles:RoleService
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      firstNameAnArabic: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      ],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastNameAnArabic: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      ],

      nationalId: [null, [Validators.required, Validators.pattern(/^[0-9]{14}$/)]],

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],

      address: ['', [Validators.required, Validators.minLength(3)]],

      gender: ['M', Validators.required],

      nationality: ['', Validators.required],

      birthDate: ['', Validators.required],

      role: [1, [Validators.required, Validators.min(1)]],

      isDeleted: [false],

      religion: ['', Validators.required],

      education: ['', Validators.required],

      employeeHistory: [''],

      numberYearsOfExperience: [0, [Validators.required, Validators.min(0), Validators.max(60)]],

      subject: [''],
      subjectType: [''],
      subjectDescription: [''],
      gradeId: [null],
      termId: [null],
      materialLink: [''],
    });
  }

  grade = signal<GradeRES[]>([])
  Roles = signal<Role[]>([])

  ngOnInit(): void {
    this.getAllGrades(),
    this.getAllRoles()
  }

  getAllGrades(){
    this.grades.getAllGrades().subscribe({
      next:(data)=>{
        console.log(data)
        this.grade.set(data)
      }
    })
  }
  
  getAllRoles(){
    this.roles.getAllRoles().subscribe({
      next:(data)=>{
        console.log(data)
        this.Roles.set(data)
      }
    })
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;

    const isTeacher =
      data.subject?.trim() &&
      data.subjectType?.trim() &&
      data.materialLink?.trim() &&
      data.gradeId &&
      data.termId;

    if (isTeacher) {
      this.teacherservice.createTeacher(data).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Teacher Created Successfully',
            html: `
            <div style="text-align:left">
              <p><strong>Email:</strong> ${res.email}</p>
              <p><strong>Password:</strong> ${res.password}</p>
            </div>
          `,
            confirmButtonColor: '#0F2747',
          });

          this.form.reset({
            gender: 'M',
            role: 1,
            gradeId: 1,
            termId: 1,
            isDeleted: false,
            numberYearsOfExperience: 0,
          });
        },

        error: (err) => {
          console.error(err);

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error while creating teacher',
          });
        },
      });
    } else {
      this.workerservice.createWorker(data).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Worker Created Successfully',
            html: `
            <div style="text-align:left">
              <p><strong>Email:</strong> ${res.email}</p>
              <p><strong>Password:</strong> ${res.password}</p>
            </div>
          `,
            confirmButtonColor: '#0F2747',
          });

          this.form.reset({
            gender: 'M',
            role: 1,
            gradeId: 1,
            termId: 1,
            isDeleted: false,
            numberYearsOfExperience: 0,
          });
        },

        error: (err) => {
          console.error(err);

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error while creating worker',
          });
        },
      });
    }
  }
  cancel(): void {
    this.form.reset({
      gender: 'M',
      role: 1,
      gradeId: 1,
      termId: 1,
      isDeleted: false,
      numberYearsOfExperience: 0,
    });
  }

  onlyNumbers(event: KeyboardEvent) {
  const charCode = event.which || event.keyCode;

  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}
}

import { Component, OnInit, signal, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WorkerService } from '../../core/service/worker-service';
import Swal from 'sweetalert2';
import { AddBtn } from '../../shared/add-btn/add-btn';
import { SaveBtn } from '../../shared/save-btn/save-btn';
import { CancelBtn } from '../../shared/cancel-btn/cancel-btn';
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
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private workerservice: WorkerService,
    private grades:GradeService,
    private roles:RoleService,
    @Optional() @Inject(MAT_DIALOG_DATA) public editData: any,
    @Optional() private dialogRef: MatDialogRef<AddEmp>
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
    this.getAllGrades();
    this.getAllRoles();

    this.form.get('role')?.valueChanges.subscribe(() => {
      this.updateTeacherValidations();
    });

    if (this.editData && this.editData.id) {
      this.isEditMode = true;
      this.workerservice.getProfile(this.editData.id).subscribe({
        next: (res) => {
          const profile = Array.isArray(res) ? res[0] : res;
          const user = profile?.teacher?.user ?? profile;
          
          this.form.patchValue({
            firstName: user.firstName,
            firstNameAnArabic: user.firstNameInArabic,
            lastName: user.lastName,
            lastNameAnArabic: user.lastNameInArabic,
            nationalId: user.nationalNumber,
            email: user.email,
            address: user.address,
            gender: user.gender,
            nationality: user.nationality,
            birthDate: user.birthDate,
            role: user.role?.id,
            isDeleted: user.isDeleted,
            religion: user.religion,
          });

          // No password field to update

          if (profile.teacher) {
            this.form.patchValue({
              education: profile.teacher.education,
              employeeHistory: profile.teacher.employmentHistory,
              numberYearsOfExperience: profile.teacher.numberOfYearsOfExperience,
              subject: profile.courseName,
              subjectType: profile.courseType,
              subjectDescription: profile.description,
              gradeId: profile.gradeId,
              termId: profile.termId,
              materialLink: profile.materials
            });
          }
        },
        error: (err) => {}
      });
    }
  }

  get isTeacherRoleSelected(): boolean {
    const roleId = this.form.get('role')?.value;
    const role = this.Roles().find((r) => r.id == roleId);
    return role?.name?.toLowerCase().includes('teacher') ?? false;
  }

  updateTeacherValidations() {
    const teacherControls = ['subject', 'subjectType', 'materialLink', 'gradeId', 'termId'];
    
    if (this.isTeacherRoleSelected) {
      teacherControls.forEach(ctrl => {
        this.form.get(ctrl)?.setValidators([Validators.required]);
        this.form.get(ctrl)?.updateValueAndValidity();
      });
    } else {
      teacherControls.forEach(ctrl => {
        this.form.get(ctrl)?.clearValidators();
        this.form.get(ctrl)?.updateValueAndValidity();
      });
      this.form.patchValue({
        subject: '',
        subjectType: '',
        subjectDescription: '',
        gradeId: null,
        termId: null,
        materialLink: ''
      });
    }
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

    let data = { ...this.form.value };

    if (!this.isTeacherRoleSelected) {
      delete data.subject;
      delete data.subjectType;
      delete data.subjectDescription;
      delete data.gradeId;
      delete data.termId;
      delete data.materialLink;
    }

    const isTeacher = this.isTeacherRoleSelected;

    if (this.isEditMode) {
      const id = this.editData.id;
      if (isTeacher) {
        this.workerservice.updateTeacher(id, data).subscribe({
          next: () => {
            Swal.fire({ icon: 'success', title: 'Teacher Updated Successfully', confirmButtonColor: '#0F2747' });
            if (this.dialogRef) this.dialogRef.close(true);
          },
          error: (err) => Swal.fire('Error', 'Failed to update teacher', 'error')
        });
      } else {
        this.workerservice.updateWorker(id, data).subscribe({
          next: () => {
            Swal.fire({ icon: 'success', title: 'Worker Updated Successfully', confirmButtonColor: '#0F2747' });
            if (this.dialogRef) this.dialogRef.close(true);
          },
          error: (err) => Swal.fire('Error', 'Failed to update worker', 'error')
        });
      }
    } else {
      if (isTeacher) {
        this.workerservice.createTeacher(data).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Teacher Created Successfully',
              html: `
              <div style="text-align:left">
                <p><strong>Email:</strong> ${res.email}</p>
                <p><i>A secure password has been sent to this email address.</i></p>
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
            if (this.dialogRef) this.dialogRef.close(true);
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
                <p><i>A secure password has been sent to this email address.</i></p>
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
            if (this.dialogRef) this.dialogRef.close(true);
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
    if (this.dialogRef) this.dialogRef.close();
  }

  onlyNumbers(event: KeyboardEvent) {
  const charCode = event.which || event.keyCode;

  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}
}

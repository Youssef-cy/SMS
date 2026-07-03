import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { EmployeeS } from '../../core/service/employee-s';
import Swal from 'sweetalert2';
import { AddBtn } from '../../shared/add-btn/add-btn';
import { SaveBtn } from '../../shared/save-btn/save-btn';
import { CancelBtn } from '../../shared/cancel-btn/cancel-btn';

@Component({
  selector: 'app-add-emp',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddBtn,
    SaveBtn,
    CancelBtn
  ],
  templateUrl: './add-emp.html',
  styleUrl: './add-emp.css',
})
export class AddEmp {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: EmployeeS
  ) {

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      firstNameAnArabic: ['', Validators.required],
      lastName: ['', Validators.required],
      lastNameAnArabic: ['', Validators.required],

      nationalId: [0, Validators.required],

      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

      address: ['', Validators.required],

      gender: ['M', Validators.required],

      nationality: ['', Validators.required],

      birthDate: ['', Validators.required],

      roleId: [1, Validators.required],

      isDeleted: [false],

      religion: ['', Validators.required],

      education: ['', Validators.required],

      employeeHistory: [''],

      numberYearsOfExperience: [0],

      subject: ['', Validators.required],

      subjectType: ['', Validators.required],

      subjectDescription: [''],

      gradeId: [1, Validators.required],

      termId: [1, Validators.required],
      materialLink:['',Validators.required]
    });

  }

  submit(): void {

    console.log(this.form.value);
    console.log("hhhh")
 

    this.service.createTeacher(this.form.value).subscribe({

     next: (res) => {

  console.log(res);

  Swal.fire({
    icon: 'success',
    title: 'Employee Created Successfully',
    html: `
      <div style="text-align:left">
        <p><strong>Email:</strong> ${res.email}</p>
        <p><strong>Password:</strong> ${res.password}</p>
      </div>
    `,
    confirmButtonText: 'OK',
    confirmButtonColor: '#0F2747'
  });

  this.form.reset({
    gender: 'M',
    roleId: 1,
    gradeId: 1,
    termId: 1,
    isDeleted: false,
    numberYearsOfExperience: 0
  });

},

      error: (err) => {
        console.error(err);
        alert('Error while creating teacher');
      }

    });

  }

  cancel(): void {
    this.form.reset({
      gender: 'M',
      roleId: 1,
      gradeId: 1,
      termId: 1,
      isDeleted: false,
      numberYearsOfExperience: 0
    });
  }

}
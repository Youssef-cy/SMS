import { Component, OnInit, signal, computed } from '@angular/core';
import { RemoveBtn } from '../../shared/remove-btn/remove-btn';
import { ViewBtn } from '../../shared/view-btn/view-btn';
import { AddBtn } from '../../shared/add-btn/add-btn';
import { TeacherService } from '../../core/service/TeacherService';
import { MatDialog } from '@angular/material/dialog';
import { AddEmp } from '../add-emp/add-emp';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { WorkerService } from '../../core/service/worker-service';

@Component({
  selector: 'app-employees',
  imports: [RemoveBtn, ViewBtn, AddBtn, RouterLink],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees implements OnInit {
  constructor(
    private teacherservice: TeacherService,
    private dialog: MatDialog,
    private workerservice: WorkerService
  ) {}

  data = signal<any[]>([]);

  selectedDepartment = signal('ALL DEPARTMENTS');

  departments = computed(() => {
    const deps = this.data().map(
      (emp) => emp.subject ?? 'Student Affairs'
    );

    return ['ALL DEPARTMENTS', ...new Set(deps)];
  });

  filteredData = computed(() => {
    const department = this.selectedDepartment();

    if (department === 'ALL DEPARTMENTS') {
      return this.data();
    }

    return this.data().filter(
      (emp) => (emp.subject ?? 'Student Affairs') === department
    );
  });

  ngOnInit() {
    this.getallTeacher();
  }

  getallTeacher() {
    this.workerservice.allWorkers().subscribe({
      next: (data) => {
        console.log();
        this.data.set(data);
      },
    });
  }

  onDepartmentChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedDepartment.set(value);
  }

  openDialog() {
    this.dialog.open(AddEmp, {
      width: '400px',
    });
  }

  changeStatus(id: number) {
    this.workerservice.changeStatus(id).subscribe({
      next: () => {
        this.getallTeacher();

        Swal.fire({
          icon: 'success',
          title: 'Status changed',
          confirmButtonColor: '#0F2747',
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
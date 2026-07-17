import { Component, computed, signal } from '@angular/core';
import { WorkerService } from '../../../../core/service/worker-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddEmp } from '../../../add-emp/add-emp';

@Component({
  selector: 'app-teachet-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  constructor(
    private workerservice: WorkerService,
    private routing: Router,
    private dialog: MatDialog,
  ) {}

  data = signal<any>(null);

  selectedDepartment = signal('ALL DEPARTMENTS');

  departments = computed(() => {
    const employees = this.data()?.employeesList ?? [];

    const deps = employees.map((emp: any) => emp.subject ?? 'Student Affairs');

    return ['ALL DEPARTMENTS', ...new Set(deps)];
  });

  filteredData = computed(() => {
    const department = this.selectedDepartment();
    const employees = this.data()?.employeesList ?? [];

    if (department === 'ALL DEPARTMENTS') {
      return employees;
    }

    return employees.filter((emp: any) => (emp.subject ?? 'Student Affairs') === department);
  });

  ngOnInit() {
    this.getallTeacher();
  }

  getallTeacher() {
    this.workerservice.allWorkers().subscribe({
      next: (res) => {
        console.log(res);
        this.data.set(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onDepartmentChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedDepartment.set(value);
  }

  navigateToView(id: number) {
    console.log(id);
    this.routing.navigate(['/teacherProfile', id]);
  }

  openEditDialog(id: number) {
    const dialogRef = this.dialog.open(AddEmp, {
      width: '500px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getallTeacher();
      }
    });
  }

  changeStatus(id: number) {
    this.workerservice.changeStatus(id).subscribe({
      next: () => {
        this.getallTeacher();
        this.workerservice.reloadEmployees$.next();

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

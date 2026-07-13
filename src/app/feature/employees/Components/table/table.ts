import { Component, computed, signal } from '@angular/core';
import { WorkerService } from '../../../../core/service/worker-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

import { Component, computed, OnInit, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { WorkerService } from '../../../../core/service/worker-service';
import { WorkerRES } from '../../../../core/model/worker-res';


@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.html',
  styleUrls: ['./filter-bar.css'],
})
export class WorkersComponent implements OnInit {

  constructor(private workerservice: WorkerService) {}

  data = signal<WorkerRES | null>(null);

  selectedDepartment = signal('ALL DEPARTMENTS');

  departments = computed(() => {
    const employees = this.data()?.employeesList ?? [];

    const deps = employees.map(
      emp => emp.subject ?? 'Student Affairs'
    );

    return ['ALL DEPARTMENTS', ...new Set(deps)];
  });

  filteredData = computed(() => {
    const department = this.selectedDepartment();
    const employees = this.data()?.employeesList ?? [];

    if (department === 'ALL DEPARTMENTS') {
      return employees;
    }

    return employees.filter(
      emp => (emp.subject ?? 'Student Affairs') === department
    );
  });

  ngOnInit(): void {
    this.getallTeacher();
  }

  getallTeacher(): void {
    this.workerservice.allWorkers().subscribe({
      next: (res: WorkerRES) => {
        console.log(res);
        this.data.set(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onDepartmentChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedDepartment.set(value);
  }

  navigateToView(): void {}

  changeStatus(id: number): void {
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
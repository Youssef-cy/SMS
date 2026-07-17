import { Component, computed, signal } from '@angular/core';
import { WorkerService } from '../../../../core/service/worker-service';
import Swal from 'sweetalert2';
import { WorkerRES } from '../../../../core/model/worker-res';

@Component({
  selector: 'app-over-view',
  imports: [],
  templateUrl: './over-view.html',
  styleUrl: './over-view.css',
})
export class OverView {
  constructor(
    private workerservice: WorkerService
  ) {}

  data = signal<WorkerRES | null>( null);


  ngOnInit() {
    this.getallTeacher();
    this.workerservice.reloadEmployees$.subscribe(() => {
      this.getallTeacher();
    });
  }

  getallTeacher() {
    this.workerservice.allWorkers().subscribe({

      next: (data) => {
        console.log(data);
        this.data.set(data);
      },
    });
  }

  
}

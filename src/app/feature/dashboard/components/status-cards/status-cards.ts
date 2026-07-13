import { Component, signal } from '@angular/core';
import { DashboardS } from '../../../../core/service/dashboard';
import { DashboardI } from '../../../../core/model/dashboardI';

@Component({
  selector: 'app-status-cards',
  imports: [],
  templateUrl: './status-cards.html',
  styleUrl: './status-cards.css',
})
export class StatusCards {
  constructor(private content:DashboardS){}
  
    data = signal<DashboardI | null>(null);
  
  ngOnInit() {
    this.getAllDashboard();
  }


  getAllDashboard(){
    this.content.getDashboardContent().subscribe({next:(data)=>{
        console.log(data);
        this.data.set(data);
      },error:(err)=>{
        console.log(err)
        console.log(err.status)
        console.log(err.error)
      }
    });

  }

}

import { Component, signal } from '@angular/core';
import { EditBtn } from "../../shared/edit-btn/edit-btn";
import { DashboardS } from '../../core/service/dashboard';
import { DashboardI } from '../../core/model/dashboardI';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [EditBtn, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  constructor(private content:DashboardS){}
  
    data = signal<DashboardI | null>(null);

  
  ngOnInit() {
    this.getAllDashboard();
  }


  getAllDashboard(){
    this.content.getDashboardContent().subscribe({next:(data)=>{
        console.log(data);
        this.data.set(data);
      }
    });

  }
  
}

  import { Component, OnInit, signal } from '@angular/core';
  import { ReportRES } from '../../core/model/report-res';
  import { ReportS } from '../../core/service/report-s';

  @Component({
    selector: 'app-reports',
    imports: [],
    templateUrl: './reports.html',
    styleUrl: './reports.css',
  })
  export class Reports implements OnInit {
    constructor(private content:ReportS){}

    data = signal<ReportRES[]>([])

    ngOnInit(): void {
      this.getAll()
    }

    getAll(){
      this.content.getAllReports().subscribe({next:(data)=>{
        console.log(data)
        this.data.set(data)

      }})
    }

  }

import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportRES } from '../../core/model/report-res';
import { ReportS } from '../../core/service/report-s';
import { RemoveBtn } from "../../shared/remove-btn/remove-btn";
import { CancelBtn } from "../../shared/cancel-btn/cancel-btn";

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [FormsModule, RemoveBtn, CancelBtn],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit {

  constructor(private content: ReportS) {}

  data = signal<ReportRES[]>([]);
  reportTypes = signal<string[]>([]);

  allReports: ReportRES[] = [];

  selectedType: string = '';
  selectedDate: string = '';

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.content.getAllReports().subscribe({
      next: (res) => {
        console.log(res);

        this.allReports = res;
        this.data.set(res);

        const types = [...new Set(res.map(report => report.type))];
        this.reportTypes.set(types);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  filterReports() {

    let filtered = [...this.allReports];

    // Filter by Type
    if (this.selectedType) {
      filtered = filtered.filter(
        report => report.type === this.selectedType
      );
    }

    // Filter by Date
    if (this.selectedDate) {
      filtered = filtered.filter(
        report => report.creationDate === this.selectedDate
      );
    }

    this.data.set(filtered);
  }

  resetFilter() {
    this.selectedType = '';
    this.selectedDate = '';
    this.data.set(this.allReports);
  }
}
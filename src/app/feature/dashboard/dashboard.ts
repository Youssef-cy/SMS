import { Component } from '@angular/core';
import { TopBanner } from "./components/top-banner/top-banner";
import { StatusCards } from "./components/status-cards/status-cards";
import { ExamComponant } from "./components/exam-componant/exam-componant";
import { AbsentChart } from "./components/absent-chart/absent-chart";
import { BestGradesv } from "./components/best-grades/best-grades";

@Component({
  selector: 'app-dashboard',
  imports: [TopBanner, StatusCards, ExamComponant, AbsentChart, BestGradesv],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

    
}

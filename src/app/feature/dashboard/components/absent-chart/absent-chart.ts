import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { DashboardS } from '../../../../core/service/dashboard';
import { DashboardI } from '../../../../core/model/dashboardI';

@Component({
  selector: 'app-absent-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './absent-chart.html',
  styleUrls: ['./absent-chart.css'],
})
export class AbsentChart implements OnInit {

  constructor(private absent: DashboardS) {}

  attendanceChart: EChartsOption = {};

  ngOnInit(): void {
    this.getAttendanceChart();
  }

  getAttendanceChart(): void {
    this.absent.getDashboardContent().subscribe({
      next: (res: DashboardI) => {

        const days = [
          '',
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ];

        this.attendanceChart = {
          title: {
            text: 'Most Absent Days',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: res.attendanceChart.map(item => days[item.dayOfWeek])
          },
          yAxis: {
            type: 'value',
            name: 'Students'
          },
          series: [
            {
              name: 'Absent Students',
              type: 'bar',
              data: res.attendanceChart.map(item => item.absentCount),
              itemStyle: {
                color: '#4F7CFF',
                borderRadius: [8, 8, 0, 0]
              },
              label: {
                show: true,
                position: 'top'
              }
            }
          ]
        };
      },
      error: err => console.error(err)
    });
  }
}
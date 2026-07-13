  import { Component, OnInit, signal } from '@angular/core';
  import { EChartsOption } from 'echarts';
  import { NgxEchartsDirective } from 'ngx-echarts';
  import { DashboardS } from '../../../../core/service/dashboard';
  import { DashboardI } from '../../../../core/model/dashboardI';

  @Component({
    selector: 'app-best-grades',
    standalone: true,
    imports: [NgxEchartsDirective],
    templateUrl: './best-grades.html',
    styleUrls: ['./best-grades.css'],
  })
  export class BestGradesv implements OnInit {
    constructor(private grades: DashboardS) {}

    data = signal<DashboardI | null>(null);

    ngOnInit(): void {
      this.getGrades();
    }

    attendanceChart: EChartsOption = {
      title: {
        text: 'Top Grades',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>Average: {c}',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          type: 'pie',
          radius: '60%',
          data: [],
          label: {
            show: true,
            formatter: '{b}\n{c}',
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 15,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0,0,0,0.5)',
            },
          },
        },
      ],
    };

    getGrades(): void {
      this.grades.getDashboardContent().subscribe({
        next: (res: DashboardI) => {
          console.log(res);

          this.data.set(res);

          this.attendanceChart = {
            ...this.attendanceChart,
            series: [
              {
                type: 'pie',
                radius: '60%',
                data: res.averageGrades.map((g) => ({
                  name: g.gradeName,
                  value: Number(g.average.toFixed(2)),
                })),
                label: {
                  show: true,
                  formatter: '{b}\n{c}',
                },
                emphasis: {
                  itemStyle: {
                    shadowBlur: 15,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0,0,0,0.5)',
                  },
                },
              },
            ],
          };
          console.log(res.averageGrades);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
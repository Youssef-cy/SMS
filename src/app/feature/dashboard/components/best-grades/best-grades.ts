  import { Component, OnInit, signal } from '@angular/core';
  import { EChartsOption } from 'echarts';
  import { DashboardS } from '../../../../core/service/dashboard';
  import { DashboardI } from '../../../../core/model/dashboardI';
  import { BaseChartComponent } from '../../../../shared/chart/base-chart.component';

  @Component({
    selector: 'app-best-grades',
    standalone: true,
    imports: [BaseChartComponent],
    templateUrl: './best-grades.html',
    styleUrls: ['./best-grades.css'],
  })
  export class BestGradesv implements OnInit {
    constructor(private grades: DashboardS) {}

    data = signal<DashboardI | null>(null);
    isLoading = signal<boolean>(true);
    hasError = signal<boolean>(false);
    isEmpty = signal<boolean>(false);

    attendanceChart: EChartsOption = {
      title: {
        text: 'Top 3 Grades\n{sub|Highest Average score}',
        left: 'center',
        top: 20,
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          rich: {
            sub: {
              fontSize: 12,
              color: '#888',
              padding: [5, 0, 0, 0]
            }
          }
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>Average: {c}',
      },
      legend: {
        orient: 'vertical',
        left: 20,
        bottom: 20,
        icon: 'roundRect'
      },
      series: [
        {
          name: 'Grades',
          type: 'pie',
          radius: ['0%', '65%'],
          center: ['50%', '55%'],
          data: [],
          label: {
            show: true,
            formatter: '{b}\n{c}',
            color: '#666',
            fontSize: 12
          },
          labelLine: {
            length: 15,
            length2: 10,
            smooth: true
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.2)',
            },
          },
        },
      ],
    };

    ngOnInit(): void {
      this.getGrades();
    }

    getGrades(): void {
      this.isLoading.set(true);
      this.hasError.set(false);
      this.isEmpty.set(false);

      this.grades.getDashboardContent().subscribe({
        next: (res: DashboardI) => {
          this.data.set(res);
          this.isLoading.set(false);

          if (!res.averageGrades || res.averageGrades.length === 0) {
            this.isEmpty.set(true);
            return;
          }

          // Sort by average to get top 3
          const top3 = [...res.averageGrades]
            .sort((a, b) => b.average - a.average)
            .slice(0, 3);

          this.attendanceChart = {
            ...this.attendanceChart,
            series: [
              {
                ...(this.attendanceChart.series as any)[0],
                data: top3.map((g) => ({
                  name: g.gradeName,
                  value: Number(g.average.toFixed(2)),
                }))
              },
            ],
          };
        },
        error: (err) => {
          console.error(err);
          this.isLoading.set(false);
          this.hasError.set(true);
        },
      });
    }
  }
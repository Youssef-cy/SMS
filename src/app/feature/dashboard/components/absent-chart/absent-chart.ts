import { Component, OnInit, signal } from '@angular/core';
import { EChartsOption } from 'echarts';
import { DashboardS } from '../../../../core/service/dashboard';
import { DashboardI } from '../../../../core/model/dashboardI';
import { BaseChartComponent } from '../../../../shared/chart/base-chart.component';

@Component({
  selector: 'app-absent-chart',
  standalone: true,
  imports: [BaseChartComponent],
  templateUrl: './absent-chart.html',
  styleUrls: ['./absent-chart.css'],
})
export class AbsentChart implements OnInit {

  constructor(private absent: DashboardS) {}

  attendanceChart: EChartsOption = {
    title: {
      text: 'Most Absent Days',
      left: 'center',
      top: 20,
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: [],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#666',
        margin: 15
      }
    },
    yAxis: {
      type: 'value',
      name: 'Students',
      nameTextStyle: {
        color: '#999',
        padding: [0, 0, 10, 0]
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#eee'
        }
      },
      axisLabel: {
        color: '#666'
      }
    },
    series: [
      {
        name: 'Absent Students',
        type: 'bar',
        barWidth: '30%',
        data: [],
        itemStyle: {
          color: '#2b4b7c',
          borderRadius: [8, 8, 0, 0]
        },
        label: {
          show: true,
          position: 'top',
          color: '#333',
          fontWeight: 'bold'
        }
      }
    ]
  };

  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);
  isEmpty = signal<boolean>(false);

  ngOnInit(): void {
    this.getAttendanceChart();
  }

  getAttendanceChart(): void {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.isEmpty.set(false);

    this.absent.getDashboardContent().subscribe({
      next: (res: DashboardI) => {
        this.isLoading.set(false);
        if (!res.attendanceChart || res.attendanceChart.length === 0) {
          this.isEmpty.set(true);
          return;
        }

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
          ...this.attendanceChart,
          xAxis: {
            ...(this.attendanceChart.xAxis as any),
            data: res.attendanceChart.map(item => days[item.dayOfWeek])
          },
          series: [
            {
              ...(this.attendanceChart.series as any)[0],
              data: res.attendanceChart.map(item => item.absentCount),
            }
          ]
        };
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
        this.hasError.set(true);
      }
    });
  }
}
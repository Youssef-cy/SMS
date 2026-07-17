import { Component, Input, OnChanges, SimpleChanges, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { DEFAULT_CHART_OPTIONS } from './chart.config';


@Component({
  selector: 'app-base-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './base-chart.component.html',
  styleUrls: ['./base-chart.component.css']
})
export class BaseChartComponent implements OnChanges {
  @Input() options!: EChartsOption;
  @Input() isLoading = false;
  @Input() hasError = false;
  @Input() isEmpty = false;
  @Input() height = '400px';

  mergedOptions = signal<EChartsOption>({});

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && this.options) {
      // Merge default options with specific chart options
      // Deep merge is preferred, but simple spread works for basic cases.
      // We will do a basic merge for the root level properties, but you can use lodash.merge if installed.
      // Since I don't see lodash, I will write a simple deep merge or just assign.
      const merged = this.deepMerge({}, DEFAULT_CHART_OPTIONS, this.options);
      this.mergedOptions.set(merged);
    }
  }

  // Simple deep merge helper to avoid adding lodash dependency if not present
  private deepMerge(target: any, ...sources: any[]): any {
    if (!sources.length) return target;
    const source = sources.shift();

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          this.deepMerge(target[key], source[key]);
        } else if (Array.isArray(source[key])) {
          // Overwrite arrays for simplicity in echarts config (like series)
          target[key] = source[key];
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return this.deepMerge(target, ...sources);
  }

  private isObject(item: any): boolean {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }
}

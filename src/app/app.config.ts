import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/service/auth-interceptor';
import { errorInterceptor } from './core/service/error.interceptor';

import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';

import { BarChart, PieChart } from 'echarts/charts';

import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
} from 'echarts/components';

import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  PieChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  CanvasRenderer
]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      authInterceptor,
      errorInterceptor
    ])),
    provideEchartsCore({ echarts })
  ]
};
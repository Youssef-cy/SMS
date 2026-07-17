import { EChartsOption } from 'echarts';

export const CHART_COLORS = {
  primary: '#2b4b7c', // Dark blue
  secondary: '#800000', // Dark red
  tertiary: '#4f7cff', // Light blue
  text: '#333333',
  gridLine: '#eeeeee',
  tooltipBg: 'rgba(255, 255, 255, 0.95)',
  tooltipBorder: '#dddddd'
};

export const DEFAULT_CHART_OPTIONS: EChartsOption = {
  color: [CHART_COLORS.primary, CHART_COLORS.secondary, CHART_COLORS.tertiary],
  textStyle: {
    fontFamily: '"Segoe UI", "Inter", sans-serif',
    color: CHART_COLORS.text
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: CHART_COLORS.tooltipBg,
    borderColor: CHART_COLORS.tooltipBorder,
    borderWidth: 1,
    padding: [10, 15],
    textStyle: {
      color: CHART_COLORS.text,
      fontSize: 13
    },
    extraCssText: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border-radius: 8px;'
  },
  legend: {
    textStyle: {
      color: CHART_COLORS.text
    },
    itemWidth: 14,
    itemHeight: 14,
    itemGap: 15
  },
  grid: {
    top: 60,
    right: 20,
    bottom: 30,
    left: 40,
    containLabel: true
  }
};

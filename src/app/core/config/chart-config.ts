export interface ChartThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    
    // Bar chart colors based on student absence level
    barLow: string;      // Navy
    barModerate: string; // Steel Blue
    barHigh: string;     // Red
    
    // Pie chart colors
    pieColors: string[];
    
    // UI elements
    bg: string;
    textPrimary: string;
    textSecondary: string;
    gridLine: string;
    shadow: string;
  };
  typography: {
    fontFamily: string;
    titleSize: number;
    subtitleSize: number;
    labelSize: number;
    valueSize: number;
  };
  grid: {
    top: number | string;
    bottom: number | string;
    left: number | string;
    right: number | string;
    containLabel: boolean;
  };
  animation: {
    duration: number;
    easing: string;
  };
  shadow: {
    shadowBlur: number;
    shadowOffsetX: number;
    shadowOffsetY: number;
    shadowColor: string;
  };
  borderRadius: number;
}

export const DEFAULT_CHART_CONFIG: ChartThemeConfig = {
  colors: {
    primary: '#1B365D', // Dark Blue/Navy
    secondary: '#4A6FA5', // Steel Blue
    
    barLow: '#1B365D', // Dark Navy
    barModerate: '#4A6FA5', // Steel Blue
    barHigh: '#7A0C22', // Wine Red
    
    pieColors: ['#7A0C22', '#1B365D', '#4A6FA5'], // Match mockup colors
    
    bg: 'transparent',
    textPrimary: '#212529',
    textSecondary: '#6C757D',
    gridLine: '#E9ECEF',
    shadow: 'rgba(0, 0, 0, 0.05)'
  },
  typography: {
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    titleSize: 20,
    subtitleSize: 12,
    labelSize: 12,
    valueSize: 14
  },
  grid: {
    top: 40,
    bottom: 20,
    left: 20,
    right: 20,
    containLabel: true
  },
  animation: {
    duration: 1000,
    easing: 'cubicOut'
  },
  shadow: {
    shadowBlur: 10,
    shadowOffsetX: 0,
    shadowOffsetY: 4,
    shadowColor: 'rgba(0, 0, 0, 0.15)'
  },
  borderRadius: 8
};

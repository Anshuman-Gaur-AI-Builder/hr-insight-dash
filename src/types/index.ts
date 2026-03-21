export interface MetricData {
  id: string;
  label: string;
  value: number;
  unit: string;
  previousValue: number;
  trend: "up" | "down" | "flat";
  trendIsPositive: boolean;
  description: string;
}

export interface MonthlyAttrition {
  month: string;
  rate: number;
}

export interface DepartmentHiring {
  department: string;
  days: number;
}

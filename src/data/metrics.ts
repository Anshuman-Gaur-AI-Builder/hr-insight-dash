import type { MetricData, MonthlyAttrition, DepartmentHiring } from "../types";

export const metrics: MetricData[] = [
  {
    id: "headcount",
    label: "Headcount",
    value: 2_487,
    unit: "",
    previousValue: 2_451,
    trend: "up",
    trendIsPositive: true,
    description: "Total active employees",
  },
  {
    id: "attrition-rate",
    label: "Attrition Rate",
    value: 14.2,
    unit: "%",
    previousValue: 15.8,
    trend: "down",
    trendIsPositive: true,
    description: "Annual voluntary & involuntary turnover",
  },
  {
    id: "time-to-hire",
    label: "Time to Hire",
    value: 38,
    unit: "days",
    previousValue: 42,
    trend: "down",
    trendIsPositive: true,
    description: "Avg days from req open to offer accepted",
  },
  {
    id: "regrettable-attrition",
    label: "Regrettable Attrition",
    value: 5.1,
    unit: "%",
    previousValue: 4.3,
    trend: "up",
    trendIsPositive: false,
    description: "% of attrition from high performers",
  },
  {
    id: "engagement-score",
    label: "Engagement Score",
    value: 72,
    unit: "%",
    previousValue: 69,
    trend: "up",
    trendIsPositive: true,
    description: "% favorable on latest pulse survey",
  },
];

export const monthlyAttrition: MonthlyAttrition[] = [
  { month: "Apr '25", rate: 16.1 },
  { month: "May '25", rate: 15.8 },
  { month: "Jun '25", rate: 16.4 },
  { month: "Jul '25", rate: 15.9 },
  { month: "Aug '25", rate: 15.3 },
  { month: "Sep '25", rate: 15.6 },
  { month: "Oct '25", rate: 15.1 },
  { month: "Nov '25", rate: 14.8 },
  { month: "Dec '25", rate: 15.2 },
  { month: "Jan '26", rate: 14.9 },
  { month: "Feb '26", rate: 14.5 },
  { month: "Mar '26", rate: 14.2 },
];

export const departmentHiring: DepartmentHiring[] = [
  { department: "Engineering", days: 45 },
  { department: "Sales", days: 32 },
  { department: "Marketing", days: 28 },
  { department: "Operations", days: 35 },
  { department: "Finance", days: 41 },
];

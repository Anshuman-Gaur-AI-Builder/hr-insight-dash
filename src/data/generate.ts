import type { MetricData, MonthlyAttrition, DepartmentHiring } from "../types";

function rand(min: number, max: number, decimals = 0): number {
  const val = Math.random() * (max - min) + min;
  return decimals ? Number(val.toFixed(decimals)) : Math.round(val);
}

function trend(
  current: number,
  previous: number
): { trend: "up" | "down" | "flat"; trendIsPositive: boolean } {
  const dir = current > previous ? "up" : current < previous ? "down" : "flat";
  return { trend: dir, trendIsPositive: false }; // overridden per metric
}

export function generateMetrics(): MetricData[] {
  const headcount = rand(2200, 2800);
  const headcountPrev = rand(2200, 2800);

  const attrition = rand(8, 22, 1);
  const attritionPrev = rand(8, 22, 1);

  const timeToHire = rand(25, 55);
  const timeToHirePrev = rand(25, 55);

  const regrettable = rand(2, 9, 1);
  const regrettablePrev = rand(2, 9, 1);

  const engagement = rand(55, 88);
  const engagementPrev = rand(55, 88);

  return [
    {
      id: "headcount",
      label: "Headcount",
      value: headcount,
      unit: "",
      previousValue: headcountPrev,
      ...trend(headcount, headcountPrev),
      trendIsPositive: headcount >= headcountPrev,
      description: "Total active employees",
    },
    {
      id: "attrition-rate",
      label: "Attrition Rate",
      value: attrition,
      unit: "%",
      previousValue: attritionPrev,
      ...trend(attrition, attritionPrev),
      trendIsPositive: attrition <= attritionPrev,
      description: "Annual voluntary & involuntary turnover",
    },
    {
      id: "time-to-hire",
      label: "Time to Hire",
      value: timeToHire,
      unit: "days",
      previousValue: timeToHirePrev,
      ...trend(timeToHire, timeToHirePrev),
      trendIsPositive: timeToHire <= timeToHirePrev,
      description: "Avg days from req open to offer accepted",
    },
    {
      id: "regrettable-attrition",
      label: "Regrettable Attrition",
      value: regrettable,
      unit: "%",
      previousValue: regrettablePrev,
      ...trend(regrettable, regrettablePrev),
      trendIsPositive: regrettable <= regrettablePrev,
      description: "% of attrition from high performers",
    },
    {
      id: "engagement-score",
      label: "Engagement Score",
      value: engagement,
      unit: "%",
      previousValue: engagementPrev,
      ...trend(engagement, engagementPrev),
      trendIsPositive: engagement >= engagementPrev,
      description: "% favorable on latest pulse survey",
    },
  ];
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function generateAttritionTrend(): MonthlyAttrition[] {
  let rate = rand(12, 20, 1);
  const trendDir = Math.random() > 0.5 ? -1 : 1;

  return MONTHS.map((month, i) => {
    const year = i < 4 ? "'25" : "'26";
    const point = { month: `${month} ${year}`, rate };
    rate = Number((rate + trendDir * rand(0, 8, 1) * 0.1 + (Math.random() - 0.5) * 0.6).toFixed(1));
    rate = Math.max(6, Math.min(25, rate));
    return point;
  });
}

const DEPARTMENTS = ["Engineering", "Sales", "Marketing", "Operations", "Finance"];

export function generateDepartmentHiring(): DepartmentHiring[] {
  return DEPARTMENTS.map((department) => ({
    department,
    days: rand(20, 55),
  }));
}

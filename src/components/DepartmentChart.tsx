import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { DepartmentHiring } from "../types";
import styles from "./ChartCard.module.css";

interface DepartmentChartProps {
  data: DepartmentHiring[];
}

export function DepartmentChart({ data }: DepartmentChartProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Time to Hire by Department</h2>
      <p className={styles.subtitle}>Average days from req open to offer accepted</p>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="department"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${v}d`}
            />
            <Tooltip
              formatter={(value) => [`${value} days`, "Time to Hire"]}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                fontSize: 13,
              }}
            />
            <Bar
              dataKey="days"
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
              barSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

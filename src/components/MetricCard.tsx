import type { MetricData } from "../types";
import styles from "./MetricCard.module.css";

interface MetricCardProps {
  metric: MetricData;
}

function formatValue(value: number): string {
  return value >= 1000 ? value.toLocaleString() : String(value);
}

function getTrendDelta(current: number, previous: number): string {
  const delta = Math.abs(current - previous);
  const rounded = delta % 1 === 0 ? delta : Number(delta.toFixed(1));
  return current >= previous ? `+${rounded}` : `-${rounded}`;
}

export function MetricCard({ metric }: MetricCardProps) {
  const arrow = metric.trend === "up" ? "↑" : metric.trend === "down" ? "↓" : "→";
  const trendClass = metric.trendIsPositive ? styles.trendPositive : styles.trendNegative;
  const delta = getTrendDelta(metric.value, metric.previousValue);

  return (
    <div className={styles.card}>
      <p className={styles.label}>{metric.label}</p>
      <div className={styles.valueRow}>
        <span className={styles.value}>{formatValue(metric.value)}</span>
        {metric.unit && <span className={styles.unit}>{metric.unit}</span>}
      </div>
      <span className={`${styles.trend} ${trendClass}`}>
        {arrow} {delta} vs last month
      </span>
      <p className={styles.description}>{metric.description}</p>
    </div>
  );
}

import { useState } from "react";
import type { MetricData } from "../types";
import styles from "./InsightPanel.module.css";

interface InsightPanelProps {
  metrics: MetricData[];
}

function formatInsight(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<h3 class="insightHeading">$1</h3>')
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/((<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>")
    .replace(/\n{2,}/g, "")
    .replace(/\n/g, "<br>");
}

export function InsightPanel({ metrics }: InsightPanelProps) {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateInsight() {
    setLoading(true);
    setError(null);
    setInsight(null);

    try {
      const response = await fetch("/api/insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metrics }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `API error: ${response.status}`);
      }

      setInsight(data.insight || "No insight returned.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.card}>
      <p className={styles.label}>CHRO INTELLIGENCE</p>
      <p className={styles.subtitle}>
        AI-generated workforce insight from current metrics
      </p>
      <button
        className={styles.button}
        onClick={generateInsight}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Generate Workforce Insight"}
      </button>
      {loading && <div className={styles.loader} />}
      {error && <p className={styles.error}>{error}</p>}
      {insight && (
        <div
          className={styles.insight}
          dangerouslySetInnerHTML={{ __html: formatInsight(insight) }}
        />
      )}
    </div>
  );
}

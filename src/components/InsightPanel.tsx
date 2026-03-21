import { useState } from "react";
import type { MetricData } from "../types";
import styles from "./InsightPanel.module.css";

interface InsightPanelProps {
  metrics: MetricData[];
}

function buildPrompt(metrics: MetricData[]): string {
  const summary = metrics
    .map(
      (m) =>
        `${m.label}: ${m.value}${m.unit} (prev: ${m.previousValue}${m.unit}, trend: ${m.trend})`
    )
    .join("\n");

  return `You are a senior workforce analytics advisor briefing a CHRO at a 2,500-person enterprise company.

Here are the current workforce metrics:
${summary}

Respond in exactly this format with these four sections. Use **bold** for section headers. Keep each section concise (2-3 bullet points max). Be direct — no hedging, no preamble.

**Insight**
A 2-3 sentence executive summary of the single biggest risk or opportunity in this data.

**Possible Root Causes**
- Bullet points identifying likely drivers behind the key finding

**Suggested Action Items**
- Specific, actionable next steps the CHRO should take

**Leading Metrics to Track**
- The forward-looking indicators to monitor for early warning or progress`;
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
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    if (!apiKey || apiKey === "your-api-key-here") {
      setError("Set VITE_ANTHROPIC_API_KEY in your .env file and restart the dev server.");
      return;
    }

    setLoading(true);
    setError(null);
    setInsight(null);

    try {
      const response = await fetch("/api/anthropic/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 800,
          messages: [{ role: "user", content: buildPrompt(metrics) }],
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(
          body?.error?.message || `API error: ${response.status}`
        );
      }

      const data = await response.json();
      const textBlock = data.content?.find(
        (block: { type: string }) => block.type === "text"
      );
      setInsight(textBlock?.text ?? "No insight returned.");
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

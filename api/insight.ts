import type { VercelRequest, VercelResponse } from "@vercel/node";

interface MetricInput {
  label: string;
  value: number;
  unit: string;
  previousValue: number;
  trend: string;
}

function buildPrompt(metrics: MetricInput[]): string {
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured" });
  }

  const { metrics } = req.body;
  if (!Array.isArray(metrics) || metrics.length === 0) {
    return res.status(400).json({ error: "metrics array is required" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 800,
        messages: [{ role: "user", content: buildPrompt(metrics) }],
      }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return res.status(response.status).json({
        error: body?.error?.message || `Anthropic API error: ${response.status}`,
      });
    }

    const data = await response.json();
    const textBlock = data.content?.find(
      (block: { type: string }) => block.type === "text"
    );

    return res.status(200).json({ insight: textBlock?.text ?? "" });
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error ? err.message : "Internal server error",
    });
  }
}

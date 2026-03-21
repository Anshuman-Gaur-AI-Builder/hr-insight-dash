# HR Insight Dashboard

**Live Demo:** [hr-insight-dash-vercel.vercel.app](https://hr-insight-dash-vercel.vercel.app/)

An AI-powered workforce analytics dashboard that gives CHROs and HR leaders instant, executive-level insights from key workforce metrics — powered by Claude.

## What It Does

- **5 workforce metric cards** — Headcount, Attrition Rate, Time to Hire, Regrettable Attrition, Engagement Score — each with trend indicators vs last month
- **Attrition trend chart** — 12-month rolling attrition rate (line chart)
- **Department hiring chart** — Time-to-hire breakdown by department (bar chart)
- **CHRO Intelligence panel** — One-click AI analysis using Claude Sonnet 4.6 that returns structured insights: risk assessment, root causes, action items, and leading metrics to track
- **Scenario generator** — Randomize all metrics to test different workforce intelligence scenarios

## Tech Stack

- **React 19** + **TypeScript** — Frontend
- **Vite** — Build tooling
- **Recharts** — Data visualization
- **Anthropic API** (Claude Sonnet 4.6) — AI insight generation
- **Vercel** — Hosting + serverless functions (API key stays server-side)

## Setup

```bash
git clone https://github.com/Anshuman-Gaur-AI-Builder/hr-insight-dash.git
cd hr-insight-dash
npm install
```

Create a `.env` file:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Run locally:

```bash
npm run dev
```

## Deployment

Deployed on Vercel. The Anthropic API call runs through a serverless function at `/api/insight` — the API key is never exposed to the browser.

Set `ANTHROPIC_API_KEY` in Vercel project settings under Environment Variables.

## About

Built as part of a **10-day AI builder challenge** — demonstrating how AI skills can be applied directly to enterprise data, replacing traditional SaaS logic wrappers with intelligent orchestration.

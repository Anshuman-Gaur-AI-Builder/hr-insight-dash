import { useState, useCallback } from "react";
import {
  metrics as defaultMetrics,
  monthlyAttrition as defaultAttrition,
  departmentHiring as defaultHiring,
} from "./data/metrics";
import {
  generateMetrics,
  generateAttritionTrend,
  generateDepartmentHiring,
} from "./data/generate";
import { MetricCard } from "./components/MetricCard";
import { TrendChart } from "./components/TrendChart";
import { DepartmentChart } from "./components/DepartmentChart";
import { InsightPanel } from "./components/InsightPanel";
import "./App.css";

function App() {
  const [metrics, setMetrics] = useState(defaultMetrics);
  const [attrition, setAttrition] = useState(defaultAttrition);
  const [hiring, setHiring] = useState(defaultHiring);
  const [scenarioCount, setScenarioCount] = useState(0);

  const refreshData = useCallback(() => {
    setMetrics(generateMetrics());
    setAttrition(generateAttritionTrend());
    setHiring(generateDepartmentHiring());
    setScenarioCount((n) => n + 1);
  }, []);

  return (
    <div className="dashboard">
      <header className="header">
        <div className="headerRow">
          <div>
            <h1>HR Insight Dashboard</h1>
            <p className="subtitle">
              Workforce metrics for a 2,500-person enterprise
              {scenarioCount > 0 && (
                <span className="scenarioBadge">Scenario #{scenarioCount}</span>
              )}
            </p>
          </div>
          <button className="refreshButton" onClick={refreshData}>
            ↻ New Scenario
          </button>
        </div>
      </header>
      <div className="grid">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
      <div className="charts">
        <TrendChart data={attrition} />
        <DepartmentChart data={hiring} />
      </div>
      <InsightPanel metrics={metrics} />
    </div>
  );
}

export default App;

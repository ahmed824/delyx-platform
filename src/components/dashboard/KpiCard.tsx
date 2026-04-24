import Card from "./Card";

type KpiCardProps = {
  title: string;
  value: string;
  trend: string;
  tone?: "orange" | "white";
  down?: boolean;
};

export default function KpiCard({ title, value, trend, tone = "white", down = false }: KpiCardProps) {
  return (
    <Card className={`kpi-card ${tone === "orange" ? "kpi-card--orange" : ""}`}>
      <div className="kpi-card__top">
        <h2>{title}</h2>
        <button className="circle-action" aria-label={`Open ${title}`}>
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      </div>
      <div className="kpi-card__value">{value}</div>
      <div className="kpi-card__meta">
        <span className={down ? "trend-pill trend-pill--down" : "trend-pill"}>
          <i className={`fa-solid ${down ? "fa-arrow-down" : "fa-arrow-up"}`}></i>
          {trend}
        </span>
        <p>This month vs last</p>
      </div>
    </Card>
  );
}

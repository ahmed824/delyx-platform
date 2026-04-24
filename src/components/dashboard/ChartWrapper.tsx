import Card from "./Card";
import type { ReactNode } from "react";

type ChartWrapperProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export default function ChartWrapper({ title, children, className = "" }: ChartWrapperProps) {
  return (
    <Card className={`chart-card ${className}`}>
      <div className="chart-card__head">
        <h2>{title}</h2>
        <button className="circle-action" aria-label={`Open ${title}`}>
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      </div>
      {children}
    </Card>
  );
}

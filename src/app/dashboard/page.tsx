"use client";

import { useEffect, useState } from "react";
import ChartWrapper from "@/components/dashboard/ChartWrapper";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KpiCard from "@/components/dashboard/KpiCard";

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("user_role");
    setUserRole(role);
  }, []);

  const isAdmin = userRole === "admin";

  return (
    <DashboardLayout title="Dashboard">
      <div className="dashboard-toolbar">
        <button className="filter-pill">This month <i className="fa-solid fa-caret-down"></i></button>
        <button className="calendar-button" aria-label="Open calendar">
          <i className="fa-solid fa-calendar-days"></i>
        </button>
      </div>

      {/* Admin Analytics Section - Only for admin */}
      {isAdmin && (
        <div className="dashboard-grid">
          <div className="kpi-grid">
            <KpiCard title="Total revenue" value="$ 99.560" trend="2.67%" tone="orange" />
            <KpiCard title="Total order" value="50" trend="1.55%" down />
            <KpiCard title="Total visitors" value="600" trend="1.55%" />
            <KpiCard title="Net profit" value="$ 54,660" trend="1.55%" />
          </div>

          <ChartWrapper title="Revenue" className="revenue-card">
            <div className="bar-chart">
              <div className="bar-axis">
                <span>7000$</span>
                <span>5000$</span>
                <span>1000$</span>
                <span>350$</span>
                <span>100$</span>
                <span>0$</span>
              </div>
              <div className="bars">
                {[42, 62, 78, 100, 42, 86, 22].map((height, index) => (
                  <div key={index} className="bar-item">
                    <span style={{ height: `${height}%` }}></span>
                  </div>
                ))}
              </div>
              <div className="chart-labels">
                <span>1 Aug</span>
                <span>4 Aug</span>
                <span>7 Aug</span>
                <span>15 Aug</span>
                <span>20 Aug</span>
                <span>25 Aug</span>
                <span>30 Aug</span>
              </div>
            </div>
          </ChartWrapper>

          <div className="mini-card">
            <span className="mini-icon"><i className="fa-solid fa-rectangle-list"></i></span>
            <p><strong>105</strong> orders</p>
            <small>105 order <b>are waiting</b> confirmation</small>
          </div>

          <div className="mini-card">
            <span className="mini-icon"><i className="fa-solid fa-user"></i></span>
            <p><strong>20</strong> customers</p>
            <small>20 customers <b>are waiting</b> for response</small>
          </div>

          <ChartWrapper title="customers Growth" className="growth-card">
            <div className="area-chart">
              <svg viewBox="0 0 520 210" role="img" aria-label="Customers growth line chart">
                <defs>
                  <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#FE9F30" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FE9F30" stopOpacity="0.55" />
                  </linearGradient>
                </defs>
                <path d="M70 170 C120 158 130 130 180 122 C220 114 214 126 250 104 C300 74 298 90 340 82 C382 74 390 52 430 48 C462 46 470 32 500 14 L500 190 L70 190 Z" fill="url(#areaFill)" />
                <path d="M70 170 C120 158 130 130 180 122 C220 114 214 126 250 104 C300 74 298 90 340 82 C382 74 390 52 430 48 C462 46 470 32 500 14" fill="none" stroke="#FE9F30" strokeWidth="6" />
                {[250, 430, 500].map((x, index) => (
                  <circle key={x} cx={x} cy={[104, 48, 14][index]} r="6" fill="#fff" stroke="#D87900" strokeWidth="4" />
                ))}
              </svg>
              <div className="area-y">
                <span>600</span><span>500</span><span>400</span><span>300</span><span>200</span><span>100</span>
              </div>
              <div className="chart-labels">
                <span>1 Aug</span><span>4 Aug</span><span>7 Aug</span><span>15 Aug</span><span>20 Aug</span><span>25 Aug</span><span>30 Aug</span>
              </div>
            </div>
          </ChartWrapper>

          <ChartWrapper title="Sales by Category" className="donut-card">
            <div className="donut-layout">
              <div className="donut">
                <span className="donut-label donut-label--left">50%</span>
                <span className="donut-label donut-label--top">25%</span>
                <span className="donut-label donut-label--right">18%</span>
                <span className="donut-label donut-label--bottom">10%</span>
              </div>
              <div className="legend-grid">
                <span><i></i> Apple MacBook Air M2</span>
                <span><i className="brown"></i> Apple Airpods pro</span>
                <span><i className="dark"></i> Apple Watch 9</span>
                <span><i className="gold"></i> Acoustic JBL Charge 5</span>
              </div>
            </div>
          </ChartWrapper>
        </div>
      )}

      {/* Non-admin users see a message */}
      {!isAdmin && (
        <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
          <h2>Welcome to the Dashboard</h2>
          <p>Visit the <a href="/tracking" style={{ color: "#FE9F30" }}>Tracking</a> page to view delivery tracking.</p>
        </div>
      )}
    </DashboardLayout>
  );
}

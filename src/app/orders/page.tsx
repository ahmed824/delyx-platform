"use client";

import { useState, useMemo } from "react";
import Button from "@/components/dashboard/Button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OrderTable from "@/components/dashboard/OrderTable";
import { orders, statusSummary } from "@/data/dashboard";

const tabs = ["New order", "Waiting order", "On way order", "Delivered order"];

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "highest", label: "Highest amount" },
  { value: "lowest", label: "Lowest amount" },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All orders");
  const [sortOption, setSortOption] = useState("default");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Filter orders based on active tab
  const filteredOrders = useMemo(() => {
    if (activeTab === "All orders") {
      return orders;
    } else if (activeTab === "New order") {
      return orders.filter((order) => order.status === "New");
    } else if (activeTab === "Waiting order") {
      return orders.filter((order) => order.status === "Waiting");
    } else if (activeTab === "On way order") {
      return orders.filter((order) => order.status === "On way");
    } else if (activeTab === "Delivered order") {
      return orders.filter((order) => order.status === "Delivered");
    }
    return orders;
  }, [activeTab, orders]);

  // Sort orders based on sort option
  const sortedOrders = useMemo(() => {
    const sorted = [...filteredOrders];
    switch (sortOption) {
      case "newest":
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      case "oldest":
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      case "highest":
        return sorted.sort((a, b) => b.amount - a.amount);
      case "lowest":
        return sorted.sort((a, b) => a.amount - b.amount);
      default:
        return sorted;
    }
  }, [filteredOrders, sortOption]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setIsSortDropdownOpen(false);
  };

  const currentSortLabel = sortOptions.find((opt) => opt.value === sortOption)?.label || "Default";

  return (
    <DashboardLayout title="Order List">
      <div className="order-summary-grid">
        {statusSummary.map((item) => (
          <section key={item.label} className={`status-card ${item.label === activeTab ? "active" : ""}`}>
            <h2>{item.label}</h2>
            <div>
              <strong>{item.count}</strong>
              <span className={item.tone === "down" ? "trend-pill trend-pill--down" : "trend-pill"}>
                <i className={`fa-solid ${item.tone === "down" ? "fa-arrow-down" : "fa-arrow-up"}`}></i>
                {item.trend}
              </span>
            </div>
            <p>This month vs last</p>
          </section>
        ))}
      </div>

      <div className="orders-actions">
        <div className="tab-row">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={tab === activeTab ? "active" : ""}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="sort-actions">
          <div className="sort-dropdown-container" style={{ position: "relative" }}>
            <button
              className="sort-button"
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            >
              <b>Sort :</b> {currentSortLabel} <i className="fa-solid fa-chevron-down"></i>
            </button>
            {isSortDropdownOpen && (
              <div className="sort-dropdown-menu" style={{
                position: "absolute",
                top: "100%",
                right: "0",
                marginTop: "8px",
                background: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                zIndex: 100,
                minWidth: "180px",
              }}>
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    className="sort-dropdown-item"
                    onClick={() => handleSortChange(option.value)}
                    style={{
                      width: "100%",
                      padding: "10px 16px",
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "14px",
                      color: "#4e4e4e",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#f5f5f5"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                  >
                    {option.label}
                    {sortOption === option.value && (
                      <i className="fa-solid fa-check" style={{ color: "var(--primary)" }}></i>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button href="/orders/add">+ Add Order</Button>
        </div>
      </div>

      <OrderTable orders={sortedOrders} />
    </DashboardLayout>
  );
}

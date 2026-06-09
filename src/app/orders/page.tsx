"use client";

import { useState, useMemo, useEffect } from "react";
import Button from "@/components/dashboard/Button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OrderTable from "@/components/dashboard/OrderTable";
import type { Order, StatusSummary } from "@/lib/types";
import { ordersApi, type ApiOrder } from "@/lib/api";

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
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusSummary, setStatusSummary] = useState<StatusSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await ordersApi.getOrders();
      const mappedOrders = data.orders.map(mapApiOrderToOrder);
      setOrders(mappedOrders);
      setStatusSummary(calculateStatusSummary(mappedOrders));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch orders");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const mapApiOrderToOrder = (apiOrder: ApiOrder): Order => {
    const firstItem = apiOrder.items[0] || { name: "Unknown", quantity: 1, price: 0 };
    const allItemNames = apiOrder.items.map(item => item.name).join(", ");
    
    // Map API status to OrderStatus
    let mappedStatus: "New" | "Waiting" | "On Way" | "Delivered" = "New";
    if (apiOrder.status === "pending") mappedStatus = "New";
    else if (apiOrder.status === "waiting") mappedStatus = "Waiting";
    else if (apiOrder.status === "on way") mappedStatus = "On Way";
    else if (apiOrder.status === "delivered") mappedStatus = "Delivered";

    return {
      id: apiOrder._id,
      customer: allItemNames,
      category: firstItem.name,
      price: apiOrder.totalPrice,
      date: new Date(apiOrder.createdAt).toLocaleDateString("de-DE"),
      payment: "Online",
      status: mappedStatus,
      address: "N/A",
    };
  };

  const calculateStatusSummary = (orders: Order[]): StatusSummary[] => {
    const summary: StatusSummary[] = [
      { label: "New order", count: 0, trend: "0%", tone: "up" },
      { label: "Waiting order", count: 0, trend: "0%", tone: "up" },
      { label: "On way order", count: 0, trend: "0%", tone: "up" },
      { label: "Delivered order", count: 0, trend: "0%", tone: "up" },
    ];

    orders.forEach(order => {
      if (order.status === "New") summary[0].count++;
      else if (order.status === "Waiting") summary[1].count++;
      else if (order.status === "On Way") summary[2].count++;
      else if (order.status === "Delivered") summary[3].count++;
    });

    return summary;
  };

  // Filter orders based on active tab
  const filteredOrders = useMemo(() => {
    if (activeTab === "All orders") {
      return orders;
    } else if (activeTab === "New order") {
      return orders.filter((order) => order.status === "New");
    } else if (activeTab === "Waiting order") {
      return orders.filter((order) => order.status === "Waiting");
    } else if (activeTab === "On way order") {
      return orders.filter((order) => order.status === "On Way");
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
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case "oldest":
        return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case "highest":
        return sorted.sort((a, b) => b.price - a.price);
      case "lowest":
        return sorted.sort((a, b) => a.price - b.price);
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
      {loading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
          <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: "24px", marginBottom: "16px" }}></i>
          <p>Loading orders...</p>
        </div>
      ) : error ? (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <div style={{ padding: "16px", background: "#fee", border: "1px solid #fcc", borderRadius: "8px", marginBottom: "16px", color: "#c33", display: "inline-block" }}>
            {error}
          </div>
          <br />
          <button
            onClick={fetchOrders}
            style={{
              padding: "12px 24px",
              background: "var(--primary)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Retry
          </button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </DashboardLayout>
  );
}

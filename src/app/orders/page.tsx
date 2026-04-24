import Button from "@/components/dashboard/Button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OrderTable from "@/components/dashboard/OrderTable";
import { orders, statusSummary } from "@/data/dashboard";

const tabs = ["New order", "Waiting order", "On way order", "Delivered order"];

export default function OrdersPage() {
  return (
    <DashboardLayout title="Order List">
      <div className="order-summary-grid">
        {statusSummary.map((item) => (
          <section key={item.label} className={`status-card ${item.label === "On way order" ? "active" : ""}`}>
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
            <button key={tab} className={tab === "On way order" ? "active" : ""}>{tab}</button>
          ))}
        </div>
        <div className="sort-actions">
          <button className="sort-button"><b>Sort :</b> default <i className="fa-solid fa-chevron-down"></i></button>
          <Button href="/orders/add">+ Add Order</Button>
        </div>
      </div>

      <OrderTable orders={orders} />
    </DashboardLayout>
  );
}

"use client";

import { useEffect, useState } from "react";
import Button from "@/components/dashboard/Button";
import Card from "@/components/dashboard/Card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ordersApi, type OrderDetailsResponse } from "@/lib/api";
import toast from "react-hot-toast";

type OrderDetailsProps = {
  params: Promise<{ id: string }>;
};

export default function OrderDetailsPage({ params }: OrderDetailsProps) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { id } = await params;
        const decodedId = decodeURIComponent(id);
        const data = await ordersApi.getOrderById(decodedId);
        
        // Map API response to frontend format
        const firstItem = data.order.items[0] || { name: "Unknown", quantity: 1, price: 0 };
        const mappedOrder = {
          id: data.order._id,
          status: data.order.status,
          date: new Date(data.order.createdAt).toLocaleDateString("de-DE"),
          category: firstItem.name,
          price: data.order.totalPrice,
          payment: "Online",
          address: "N/A", // Dummy data since not in API response
          customer: "Customer", // Dummy data since not in API response
          items: data.order.items,
          deviceId: data.order.deviceId,
        };
        
        setOrder(mappedOrder);
        setSelectedStatus(data.order.status);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [params]);

  const handleStatusUpdate = async () => {
    if (!order || !selectedStatus) return;

    setIsUpdating(true);
    try {
      if (selectedStatus === "delivered") {
        await ordersApi.markAsDelivered(order.id);
        toast.success("Order marked as delivered");
      }
      // Update local state
      setOrder({ ...order, status: selectedStatus });
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update order status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <DashboardLayout title="Order Details">
      {loading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
          <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: "24px", marginBottom: "16px" }}></i>
          <p>Loading order details...</p>
        </div>
      ) : error ? (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <div style={{ padding: "16px", background: "#fee", border: "1px solid #fcc", borderRadius: "8px", marginBottom: "16px", color: "#c33", display: "inline-block" }}>
            {error}
          </div>
        </div>
      ) : order ? (
        <div className="details-grid">
          <Card className="details-main">
            <div className="details-head">
              <div>
                <h2>{order.id}</h2>
                <p>{order.status} • {order.date}</p>
              </div>
              <span className="status-badge">{order.status}</span>
            </div>
            <div className="info-grid">
              <span><b>Category</b>{order.category}</span>
              <span><b>Price</b>EGP {order.price}</span>
              <span><b>Payment</b>{order.payment}</span>
              <span><b>Address</b>{order.address}</span>
            </div>
            {order.items && order.items.length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <h3 style={{ fontSize: "16px", marginBottom: "12px", color: "#444" }}>Order Items</h3>
                {order.items.map((item: any, index: number) => (
                  <div key={index} style={{ padding: "12px", background: "#f9f9f9", borderRadius: "8px", marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
                    <span>{item.name}</span>
                    <span>Qty: {item.quantity} × EGP {item.price}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <h2 className="form-title">Customer details</h2>
            <div className="customer-panel">
              <img src="/images/sara.png" alt={order.customer} />
              <div><strong>{order.customer}</strong><span>customer@delyx.com</span></div>
            </div>
            <p className="muted-copy">Phone: +20 XXX XXX XXXX</p>
          </Card>

          {order.deviceId && (
            <Card>
              <h2 className="form-title">Device Information</h2>
              <div className="info-grid">
                <span><b>Device Name</b>{order.deviceId.deviceName}</span>
                <span><b>Type</b>{order.deviceId.type}</span>
                <span><b>Status</b>{order.deviceId.status}</span>
                <span><b>Active</b>{order.deviceId.isActive ? "Yes" : "No"}</span>
              </div>
              {order.deviceId.lastLocation && (
                <div style={{ marginTop: "12px", padding: "12px", background: "#f9f9f9", borderRadius: "8px" }}>
                  <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
                    <strong>Last Location:</strong> {order.deviceId.lastLocation.lat.toFixed(6)}, {order.deviceId.lastLocation.lng.toFixed(6)}
                  </p>
                  <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#666" }}>
                    <strong>Last Seen:</strong> {new Date(order.deviceId.lastSeen).toLocaleString()}
                  </p>
                </div>
              )}
            </Card>
          )}

          <Card>
            <h2 className="form-title">Order timeline</h2>
            <div className="delivery-timeline compact">
              <div className="done"><i></i><strong>Created</strong><span>Order was submitted</span></div>
              <div className="done"><i></i><strong>Preparing</strong><span>Package is ready</span></div>
              <div className="active"><i></i><strong>{order.status}</strong><span>Current status</span></div>
            </div>
          </Card>

          <Card>
            <h2 className="form-title">Status control</h2>
            <label className="wide-label">Update order status
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                disabled={isUpdating}
              >
                <option value="pending">New</option>
                <option value="waiting">Waiting</option>
                <option value="on way">On Way</option>
                <option value="delivered">Delivered</option>
              </select>
            </label>
            <Button 
              className="form-button" 
              onClick={handleStatusUpdate}
              disabled={isUpdating || selectedStatus === order.status}
            >
              {isUpdating ? "Updating..." : "Update order"}
            </Button>
          </Card>
        </div>
      ) : null}
    </DashboardLayout>
  );
}

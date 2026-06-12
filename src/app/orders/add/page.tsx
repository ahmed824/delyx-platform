"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/dashboard/Button";
import Card from "@/components/dashboard/Card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ordersApi, type OrderItem } from "@/lib/api";

export default function AddOrderPage() {
  const router = useRouter();
  const [items, setItems] = useState<OrderItem[]>([{ name: "", quantity: 1, price: 0 }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleItemChange = (index: number, field: keyof OrderItem, value: string | number) => {
    const updatedItems = [...items];
    if (field === "quantity" || field === "price") {
      updatedItems[index][field] = Number(value) || 0;
    } else {
      updatedItems[index][field] = value as string;
    }
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate items
    const validItems = items.filter(item => item.name && item.quantity > 0 && item.price > 0);
    if (validItems.length === 0) {
      setError("Please add at least one valid item with name, quantity, and price.");
      return;
    }

    setLoading(true);

    try {
      const data = await ordersApi.createOrder({
        items: validItems,
        totalPrice,
      });
      console.log("Order created:", data);
      router.push("/orders");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create order");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Add Order">
      <Card className="order-form-card">
        <h2 className="form-title">Create new order</h2>
        <form className="order-form" onSubmit={handleSubmit}>
          {items.map((item, index) => (
            <div key={index} className="order-item-row" style={{ marginBottom: "16px", padding: "16px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <strong>Item {index + 1}</strong>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#dc3545",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    <i className="fa-solid fa-trash"></i> Remove
                  </button>
                )}
              </div>
              <label>Product Name
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, "name", e.target.value)}
                  placeholder="Enter product name"
                  required
                />
              </label>
              <label>Quantity
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  placeholder="1"
                  required
                />
              </label>
              <label>Price (EGP)
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price || ""}
                  onChange={(e) => handleItemChange(index, "price", e.target.value)}
                  placeholder="0.00"
                  required
                />
              </label>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "16px",
              background: "#f5f5f5",
              border: "1px dashed #ccc",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#666",
            }}
          >
            <i className="fa-solid fa-plus"></i> Add Another Item
          </button>

          <div style={{ padding: "16px", background: "#f9f9f9", borderRadius: "8px", marginBottom: "16px" }}>
            <strong>Total Price: EGP {totalPrice.toFixed(2)}</strong>
          </div>

          {error && (
            <div style={{ padding: "12px", background: "#fee", border: "1px solid #fcc", borderRadius: "8px", marginBottom: "16px", color: "#c33" }}>
              {error}
            </div>
          )}

          <p className="validation-note"><i className="fa-solid fa-circle-info"></i> Product name, quantity, and price are required for each item.</p>
          <div className="form-actions">
            <Button href="/orders" variant="soft">Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Order"}
            </Button>
          </div>
        </form>
      </Card>
    </DashboardLayout>
  );
}

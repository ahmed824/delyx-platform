import Button from "@/components/dashboard/Button";
import Card from "@/components/dashboard/Card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { orders } from "@/data/dashboard";

type OrderDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailsPage({ params }: OrderDetailsProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const order = orders.find((item) => item.id === decodedId) ?? orders[0];

  return (
    <DashboardLayout title="Order Details">
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
            <span><b>Price</b>${order.price}</span>
            <span><b>Payment</b>{order.payment}</span>
            <span><b>Address</b>{order.address}</span>
          </div>
        </Card>

        <Card>
          <h2 className="form-title">Customer details</h2>
          <div className="customer-panel">
            <img src="/images/sara.png" alt={order.customer} />
            <div><strong>{order.customer}</strong><span>customer@delyx.com</span></div>
          </div>
          <p className="muted-copy">Phone: +20 XXX XXX XXXX</p>
        </Card>

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
          <label className="wide-label">Update order status<select defaultValue={order.status}><option>New</option><option>Waiting</option><option>On Way</option><option>Delivered</option></select></label>
          <Button className="form-button">Update order</Button>
        </Card>
      </div>
    </DashboardLayout>
  );
}

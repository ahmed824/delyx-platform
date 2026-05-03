import Card from "@/components/dashboard/Card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { updates } from "@/data/dashboard";

export default function TrackingPage() {
  const orders = [
    {
      id: '#35787588',
      status: 'Delivery',
      from: '12 Mustafa El-Nahhas St, Nasr City',
      to: 'Abbas El Akkad St, Nasr City',
      customer: 'Ahmed Hassan',
      note: 'Customer',
    },
    {
      id: '#87686588',
      status: 'Pending',
      from: 'Villa 15, Street 90, New Cairo',
      to: 'Axis Road, 6th of October City, Giza',
      customer: 'Omar Khaled',
      note: 'Customer',
    },
    {
      id: '#96870980',
      status: 'Transit',
      from: 'Building 8, District 5, New Cairo',
      to: 'Axis Road, 6th of October City, Giza',
      customer: 'Amr Samir',
      note: 'Customer',
    },
  ];

  return (
    <DashboardLayout title="Tracking Delivery">
      <div className="tracking-grid">
        <div className="orders-column">
          {orders.map((o) => (
            <Card key={o.id} className="order-card">
              <div className="order-header">
                <strong className="order-id">{o.id}</strong>
                <span className={`badge ${o.status.toLowerCase()}`}>{o.status}</span>
              </div>

              <div className="order-body">
                <div className="progress-line">
                  <span className="dot start" />
                  <span className="line" />
                  <img src="/images/car-deliver.png" alt="robot" className="robot-mini" />
                  <span className="dot end" />
                </div>

                <div className="addresses">
                  <div className="addr from">{o.from}</div>
                  <div className="addr to">{o.to}</div>
                </div>
              </div>

              <div className="order-footer">
                <div className="customer">
                  <img src="/images/avatar-placeholder.png" alt="avatar" className="avatar" />
                  <div>
                    <div className="name">{o.customer}</div>
                    <div className="role">{o.note}</div>
                  </div>
                </div>
                <div className="contacts">
                  <button className="icon-btn"><i className="fa-solid fa-phone"></i></button>
                  <button className="icon-btn"><i className="fa-solid fa-envelope"></i></button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="map-card large-map">
          <div className="map-toolbar">
            <div>
              <h2>Live delivery map</h2>
              <p>Order N°674839 • ETA 12 min</p>
            </div>
            <span className="live-pill">Live</span>
          </div>
          <div className="mock-map large">
            <span className="route route-a" />
            <span className="pin pin-start"><i className="fa-solid fa-store"></i></span>
            <span className="pin pin-robot"><img src="/images/car-deliver.png" alt="robot"/></span>
            <span className="pin pin-end"><i className="fa-solid fa-house"></i></span>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

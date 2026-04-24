import Card from "@/components/dashboard/Card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { updates } from "@/data/dashboard";

export default function TrackingPage() {
  return (
    <DashboardLayout title="Tracking Delivery">
      <div className="tracking-grid">
        <Card className="map-card">
          <div className="map-toolbar">
            <div>
              <h2>Live delivery map</h2>
              <p>Order N°674839 • ETA 12 min</p>
            </div>
            <span>Live</span>
          </div>
          <div className="mock-map">
            <span className="route route-a"></span>
            <span className="route route-b"></span>
            <span className="pin pin-start"><i className="fa-solid fa-store"></i></span>
            <span className="pin pin-robot"><i className="fa-solid fa-location-arrow"></i></span>
            <span className="pin pin-end"><i className="fa-solid fa-house"></i></span>
          </div>
        </Card>

        <Card className="timeline-card">
          <h2>Order tracking status</h2>
          <div className="delivery-timeline">
            <div className="done"><i></i><strong>Preparing</strong><span>Package verified</span></div>
            <div className="active"><i></i><strong>On way</strong><span>Robot is moving to customer</span></div>
            <div><i></i><strong>Delivered</strong><span>Waiting for confirmation</span></div>
          </div>
        </Card>

        <Card className="robot-card">
          <div className="robot-avatar"><i className="fa-solid fa-robot"></i></div>
          <h2>DX-04 Delivery Robot</h2>
          <p>Autonomous unit • Battery 86%</p>
          <div className="robot-stats">
            <span><b>3.2 km</b> Distance</span>
            <span><b>12 min</b> ETA</span>
          </div>
        </Card>

        <Card className="updates-card">
          <h2>Real-time updates</h2>
          <div className="updates-list">
            {updates.map((update, index) => (
              <p key={update}><span>{index + 1}</span>{update}</p>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

import Button from "@/components/dashboard/Button";
import Card from "@/components/dashboard/Card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout title="Setting">
      <div className="settings-grid">
        <Card>
          <h2 className="form-title">Profile settings</h2>
          <div className="form-grid">
            <label>Full name<input defaultValue="Ahmed khaled" /></label>
            <label>Email<input defaultValue="ahmed@delyx.com" /></label>
            <label>Phone<input defaultValue="+20 XXX XXX XXXX" /></label>
            <label>Store name<input defaultValue="DELY X Store" /></label>
          </div>
          <Button className="form-button">Save profile</Button>
        </Card>

        <Card>
          <h2 className="form-title">Password change</h2>
          <div className="form-grid single">
            <label>Current password<input type="password" placeholder="••••••••" /></label>
            <label>New password<input type="password" placeholder="Enter new password" /></label>
            <label>Confirm password<input type="password" placeholder="Confirm new password" /></label>
          </div>
          <Button className="form-button">Update password</Button>
        </Card>

        <Card>
          <h2 className="form-title">Notifications</h2>
          <div className="toggle-list">
            <label><span>Delivery status alerts</span><input type="checkbox" defaultChecked /></label>
            <label><span>Payment confirmations</span><input type="checkbox" defaultChecked /></label>
            <label><span>Robot health warnings</span><input type="checkbox" /></label>
          </div>
        </Card>

        <Card>
          <h2 className="form-title">Theme / preferences</h2>
          <div className="preference-row">
            <button className="active">Light</button>
            <button>Dark</button>
            <button>System</button>
          </div>
          <label className="wide-label">Default orders view<select defaultValue="On way order"><option>On way order</option><option>New order</option><option>Delivered order</option></select></label>
        </Card>
      </div>
    </DashboardLayout>
  );
}

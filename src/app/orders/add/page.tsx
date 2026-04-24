import Button from "@/components/dashboard/Button";
import Card from "@/components/dashboard/Card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function AddOrderPage() {
  return (
    <DashboardLayout title="Add Order">
      <Card className="order-form-card">
        <h2 className="form-title">Create new order</h2>
        <form className="order-form">
          <label>Customer<input placeholder="Enter customer name" /></label>
          <label>Category<select defaultValue=""><option value="" disabled>Select category</option><option>Laptops</option><option>Accessories</option><option>Phones</option></select></label>
          <label>Price<input placeholder="$ 0.00" /></label>
          <label>Address<input placeholder="Delivery address" /></label>
          <p className="validation-note"><i className="fa-solid fa-circle-info"></i> Customer, category, price, and address are required before submitting.</p>
          <div className="form-actions">
            <Button href="/orders" variant="soft">Cancel</Button>
            <Button type="submit">Submit Order</Button>
          </div>
        </form>
      </Card>
    </DashboardLayout>
  );
}

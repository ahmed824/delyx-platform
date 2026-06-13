import Link from "next/link";
import type { Order } from "@/lib/types";

type OrderTableProps = {
  orders: Order[];
  isAdmin?: boolean;
  onDispatch?: (orderId: string) => void;
};

export default function OrderTable({ orders, isAdmin = false, onDispatch }: OrderTableProps) {
  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Customer</th>
            <th>Category</th>
            <th>Price</th>
            <th>Date</th>
            <th>Payment</th>
            {isAdmin && <th>•••</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <Link href={`/orders/${encodeURIComponent(order.id)}`}>{order.id}</Link>
              </td>
              <td>{order.customer}</td>
              <td>{order.category}</td>
              <td>EGP {order.price}</td>
              <td>{order.date}</td>
              <td>{order.payment}</td>
              {isAdmin && (
                <td>
                  <button 
                    className="dots-button" 
                    aria-label={`Actions for ${order.id}`}
                    onClick={() => onDispatch?.(order.id)}
                  >
                    •••
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

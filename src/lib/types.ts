export type OrderStatus = "New" | "Waiting" | "On Way" | "Delivered";

export type Order = {
  id: string;
  customer: string;
  category: string;
  price: number;
  date: string;
  payment: string;
  status: OrderStatus;
  address: string;
};

export type StatusSummary = {
  label: string;
  count: number;
  trend: string;
  tone: "up" | "down";
};

export type DashboardStats = {
  orders: Order[];
  statusSummary: StatusSummary[];
  updates: string[];
};

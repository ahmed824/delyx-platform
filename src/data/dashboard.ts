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

export const orders: Order[] = [
  {
    id: "N°674839",
    customer: "Youssef Adel",
    category: "Laptops",
    price: 1302,
    date: "26.07.2024",
    payment: "PayPal",
    status: "On Way",
    address: "New Cairo, Cairo",
  },
  {
    id: "N°674836",
    customer: "Omar Khaled",
    category: "Laptops",
    price: 1202,
    date: "22.07.2024",
    payment: "PayPal",
    status: "Waiting",
    address: "Nasr City, Cairo",
  },
  {
    id: "N°674539",
    customer: "Nour Hassan",
    category: "Laptops",
    price: 7502,
    date: "23.07.2024",
    payment: "PayPal",
    status: "New",
    address: "Maadi, Cairo",
  },
  {
    id: "N°674889",
    customer: "Youssef Ali",
    category: "Laptops",
    price: 1342,
    date: "12.07.2024",
    payment: "PayPal",
    status: "On Way",
    address: "6th of October, Giza",
  },
  {
    id: "N°474839",
    customer: "Mariam Tarek",
    category: "Laptops",
    price: 4302,
    date: "23.07.2024",
    payment: "PayPal",
    status: "Delivered",
    address: "Heliopolis, Cairo",
  },
  {
    id: "N°774839",
    customer: "Karim Adel",
    category: "Laptops",
    price: 6702,
    date: "22.07.2024",
    payment: "PayPal",
    status: "Delivered",
    address: "Zamalek, Cairo",
  },
  {
    id: "N°676839",
    customer: "Dina Mostafa",
    category: "Laptops",
    price: 4302,
    date: "11.07.2024",
    payment: "PayPal",
    status: "Waiting",
    address: "Dokki, Giza",
  },
  {
    id: "N°676639",
    customer: "Karim Adel",
    category: "Laptops",
    price: 4302,
    date: "10.07.2024",
    payment: "PayPal",
    status: "New",
    address: "Garden City, Cairo",
  },
];

export const statusSummary = [
  { label: "New order", count: 12, trend: "2.67%", tone: "up" },
  { label: "Waiting order", count: 20, trend: "1.66%", tone: "up" },
  { label: "On way order", count: 19, trend: "2.67%", tone: "down" },
  { label: "Delivered order", count: 30, trend: "2.67%", tone: "up" },
];

export const updates = [
  "Robot DX-04 left pickup zone",
  "Traffic signal detected near gate B",
  "ETA updated to 12 minutes",
  "Customer notified by SMS",
];

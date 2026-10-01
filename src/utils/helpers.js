export const formatPrice = (price) => `$${Number(price).toFixed(2)}`;

export const mockOrders = [
  { id: "ORD-001", customer: "Ali Khan", products: 3, total: 249.99, status: "Pending", date: "2026-09-01" },
  { id: "ORD-002", customer: "Sara Ahmed", products: 1, total: 59.5, status: "Processing", date: "2026-09-03" },
  { id: "ORD-003", customer: "John Smith", products: 2, total: 129.0, status: "Completed", date: "2026-09-05" },
  { id: "ORD-004", customer: "Emma Brown", products: 4, total: 410.75, status: "Cancelled", date: "2026-09-08" },
  { id: "ORD-005", customer: "Usman Raza", products: 2, total: 89.99, status: "Completed", date: "2026-09-10" },
  { id: "ORD-006", customer: "Fatima Noor", products: 5, total: 320.0, status: "Pending", date: "2026-09-12" },
];

export const mockUsers = [
  { id: 1, name: "Ali Khan", email: "ali@example.com", role: "Customer", status: "Active" },
  { id: 2, name: "Sara Ahmed", email: "sara@example.com", role: "Customer", status: "Active" },
  { id: 3, name: "John Smith", email: "john@example.com", role: "Editor", status: "Inactive" },
  { id: 4, name: "Emma Brown", email: "emma@example.com", role: "Customer", status: "Active" },
  { id: 5, name: "Usman Raza", email: "usman@example.com", role: "Admin", status: "Active" },
];
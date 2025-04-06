import { products } from "../products/products.model.js";

export const orders = [
  {
    id: "101",
    product: products[0],
    quantity: 2,
    date: "2025-04-05",
    subtotal: 59.98,
    items: [
      {
        product: products[0],
        quantity: 2,
      },
    ],
  },
  {
    id: "102",
    product: products[1],
    quantity: 1,
    date: "2025-04-03",
    subtotal: 89.99,
    items: [
      {
        product: products[1],
        quantity: 1,
      },
    ],
  },
];

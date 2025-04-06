export const products = [
  {
    id: "1",
    description: "Wireless Mouse",
    price: 29.99,
    reviews: [
      { id: "r1", rating: 5, comment: "Works great!" },
      { id: "r2", rating: 4, comment: "Good but a bit small." },
    ],
  },
  {
    id: "2",
    description: "Mechanical Keyboard",
    price: 89.99,
    reviews: [{ id: "r3", rating: 5, comment: "Feels amazing to type!" }],
  },
];

export const getAllProducts = () => {
  return products;
};

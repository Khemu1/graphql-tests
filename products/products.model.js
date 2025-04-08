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

export const getProductPrice = (min, max) => {
  return products.filter(
    (product) => product.price >= min && product.price <= max
  );
};
export const getProductById = (id) => {
  return products.find((product) => product.id === id);
};

export const insertProduct = (id, description, price) => {
  const newProduct = {
    id,
    description,
    price,
    reviews: [],
  };
  products.push(newProduct);
  return newProduct;
};
export const inertNewReview = (productId, review) => {
  const product = products.find((product) => product.id === productId);
  if (product) {
    product.reviews.push(review);
    return review;
  }
  return null;
};

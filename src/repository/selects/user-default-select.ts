export const userDefaultSelect = {
  id: true,
  name: true,
  email: true,
  created_at: true,
  products: {
    select: {
      id: true,
      created_at: true,
      description: true,
      name: true,
      price: true,
    },
  },
};

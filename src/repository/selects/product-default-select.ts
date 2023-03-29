export const productDefaultSelect = {
  id: true,
  name: true,
  price: true,
  created_at: true,
  user: {
    select: {
      id: true,
      name: true,
    },
  },
};

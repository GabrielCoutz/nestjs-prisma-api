export const productDefaultSelect = {
  id: true,
  name: true,
  price: true,
  created_at: true,
<<<<<<< HEAD
=======
  description: true,
};

export const productConsultSelect = {
  ...productProps,
>>>>>>> parent of eef2560 (feat(product): add images to product)
  user: {
    select: {
      id: true,
      name: true,
    },
  },
};

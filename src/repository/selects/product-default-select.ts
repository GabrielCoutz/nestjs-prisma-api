const productProps = {
  id: true,
  name: true,
  price: true,
  created_at: true,
  description: true,
};

export const productConsultSelect = {
  ...productProps,
  user: {
    select: {
      id: true,
      name: true,
    },
  },
};

export const productDefaultSelect = {
  ...productProps,
};

const productProps = {
  id: true,
  name: true,
  price: true,
  created_at: true,
  description: true,
};

export const productDefaultSelect = {
  ...productProps,
  user: {
    select: {
      id: true,
      name: true,
    },
  },
};

export const productUpdateSelect = {
  ...productProps,
};

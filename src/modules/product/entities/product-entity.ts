export class Product {
  name: string;
  description?: string;
  price: number;
  images: ProductImages[];
}

export interface ProductImages {
  url: string;
}

export type CategoryType = {
    id: string;
    category_name: string;
    category_url?: string;
  };

export type ParamsType = {
    id: string;
  };

export type ArtisanCardType = {
  id: string;
  first_name: string;
  last_name: string;
  address: string;
  image_url: string;
  created_at: string;
  categories?: CategoryType[];
};

export type ArtisanDetailType = {
  id: string;
  first_name: string;
  last_name: string;
  address: string;
  image_url: string;
  introduction: string;
  created_at: string;
  categories: CategoryType[];
};

export type ProductDetailType = {
  product_name: string;
  image_url: string;
  category_name: string;
  category_id: string;
  description: string;
  quantity: number;
  created_at: string;
  price: number;
  first_name: string;
  last_name: string;
  artisan_id: string;
}
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
import { JSX } from "react";

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

export type TitleType = {
  name: string;
  description?: string;
  breadcrumbItems: BreadcrumbItemType[];
};

export type BreadcrumbItemType =
| {
    title: string;
  }
| { title: JSX.Element }
| { title: undefined };

export type SearchParamsType = {
  query: string;
};

export type ProductCardType = {
  id: string;
  product_name: string;
  image_url: string;
  price?: number;
  rate?: number;
  review_count?: number;
};

export type ReviewsType = {
  id: string;
  created_at: string;
  rate: number;
  comment: string;
  username: string;
};

export type SessionType = {
  user: {
    id: string;
    email: string;
  };
} | null;

export type SetSessionType = (session: SessionType | null) => void;

export type DashboardProductType = {
  category_name: string;
  created_at: string;
  description: string;
  id: string;
  image_url: string;
  price: number;
  product_name: string;
  quantity: number;
};

export type DashboardPurchaseType = {
  id: string;
  product_name: string;
  image_url: string;
  rate: number;
  created_at: string;
  comment: string;
}
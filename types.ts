
export interface ScentPyramid {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: 'Men' | 'Women' | 'Unisex';
  notes: string[];
  pyramid: ScentPyramid;
  image: string;
  rating: number;
  heritage: string;
  reviews?: Review[];
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string[];
  date: string;
  author: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
}

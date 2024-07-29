export interface Resource {
  _id?: string;
  title: string;
  description: string;
  url: string;
  favIcon: string;
  categories: string[];
  mainCategory: string;
  color: string;
}

export interface CategoryResources {
  category: string;
  resources: Resource[];
}

export interface UserInfo {
  email: string;
  role: string;
  exp: number;
  iat: number;
  username: string;
  _id: string;
}

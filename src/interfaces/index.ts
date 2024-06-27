export interface Resource {
  _id?: string;
  title: string;
  description: string;
  url: string;
  favIcon: string;
  categories: string[];
  mainCategory: string;
}

export interface CategoryResources {
  category: string;
  resources: Resource[];
}

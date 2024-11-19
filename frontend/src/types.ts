export type AdType = {
  id: string;
  picture: string;
  title: string;
  price: number;
  description?: string;
  owner: string;
  location: string;
  createdAt: Date;
  category: CategoryType;
  tags?: TagType[];
};

export type CategoryType = {
  id: string;
  name: string;
  ads?: AdType[];
};

export type TagType = {
  id: number;
  name: string;
};

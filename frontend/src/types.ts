export type AdType = {
  id: number;
  picture: string;
  title: string;
  price: number;
  description: string;
  owner: string;
  location: string;
  createdAt: Date;
  category?: CategoryType;
  tags: TagType[];
};

export type CategoryType = {
  id: number;
  name: string;
  ads?: AdType[];
};

export type TagType = {
  id: number;
  name: string;
};

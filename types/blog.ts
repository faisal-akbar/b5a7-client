export interface IBlogPost {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  excerpt: string;
  tags: string[];
  isFeatured: boolean;
  isPublished: boolean;
  views: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
  };
}

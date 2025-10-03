export interface IProjectData {
  id: number;
  title: string;
  slug: string;
  description: string;
  projectLink: string;
  liveSite: string;
  thumbnail: string;
  features: string[];
  techStack: string[];
  isFeatured: boolean;
  isPublished: boolean;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  owner: {
    name: string;
  };
}

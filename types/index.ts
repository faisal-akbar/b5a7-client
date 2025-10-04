export * from "./blog";
export * from "./project";
export * from "./user";

export interface IMeta {
  total: number;
  page: number;
  limit: number;
}

export interface IBlogPostResponse<T> {
  data: T;
  meta?: IMeta;
  status: boolean;
  message: string;
  success: boolean;
}

export interface IProjectResponse<T> {
  data: T;
  meta?: IMeta;
  status: boolean;
  message: string;
  success: boolean;
}

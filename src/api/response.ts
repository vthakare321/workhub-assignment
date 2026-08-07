export interface ApiResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  limit: number;
  skip: number;
  total: number;
  data: T[];
}

export type BackendResponse<T> = {
  status: number;
  message: string;
  timestamp: string;
  data: T;
};

export type BackendData = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  version?: number;
};

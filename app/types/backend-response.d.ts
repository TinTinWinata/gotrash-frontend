export type BackendResponse<T> = {
  status: number;
  message: string;
  timestamp: string;
  data: T;
};

export type BackendData = {
  createdAt: string;
  updatedAt: string;
};

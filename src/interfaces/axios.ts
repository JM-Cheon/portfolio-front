export interface AxiosResponse<T> {
  status: string;
  message: string;
  data: T;
}

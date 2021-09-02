export type ApiRequestMethod = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';

export interface HttpResponse<T> {
  status: number;
  data: T;
}

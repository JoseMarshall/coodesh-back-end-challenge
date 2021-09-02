import fetch from 'node-fetch';

import { ApiRequestMethod, HttpResponse } from './services.types';

const BASE_API_URL = process.env.BASE_API_URL ?? '';

const makeRequest =
  (method: ApiRequestMethod) =>
  async <T>(endpoint: string, data?: Object): Promise<HttpResponse<T>> => {
    const response = await fetch(`${BASE_API_URL}${endpoint}`, {
      method,
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (response.status < 200 || response.status > 299) throw new Error((responseData as any).msg);

    return {
      status: response.status,
      data: responseData as T,
    };
  };

// eslint-disable-next-line import/prefer-default-export
export const getRequest = makeRequest('GET');

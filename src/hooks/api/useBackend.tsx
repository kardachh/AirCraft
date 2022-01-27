import Settings from '../../../settings';
import {Aircraft} from './types';

const baseUrl = Settings.BACKEND_URL;

export const useBackend = () => {
  const request = (url: string, method = 'GET', params = {}) => {
    url = baseUrl + url;
    let options: any = {
      method,
    };
    if (method === 'GET') {
      url += '?' + new URLSearchParams(params).toString();
    } else {
      options.body = JSON.stringify(params);
    }
    return fetch(url, options).then(response => response.json());
  };

  const getAircrafts = (): Promise<Aircraft[]> => {
    return request('aircrafts', 'GET');
  };

  return {
    api: {
      getAircrafts,
    },
  };
};

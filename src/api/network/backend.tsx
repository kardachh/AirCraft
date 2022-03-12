import Settings from '../../../settings';
import {Airport} from '../../../state/types';

const baseUrl = Settings.BACKEND_URL;

export const Backend = () => {
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

  const getAirports = (): Promise<Airport[]> => {
    return request('airports', 'GET');
  };

  return {
    getAirports,
  };
};
// TODO: fix android network error

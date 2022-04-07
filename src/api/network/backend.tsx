import Settings from '../../../settings';
import {Airport, Flight} from '../../types';

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

  const getFlightsByDate = (): Promise<Flight[]> => {
    // TODO: запрос на текущий день
    return request('flights', 'GET', {date: "'2022-10-20'"});
  };

  return {
    getAirports,
    getFlightsByDate,
  };
};
// TODO: fix android network error

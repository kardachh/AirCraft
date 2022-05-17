import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Settings from '../../settings';
import {Airport, ErrorResponse, Flight} from '../types';

export const airportsAPI = createApi({
  reducerPath: 'airportsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: Settings.BACKEND_URL,
  }),
  endpoints: builder => ({
    fetchAirports: builder.query<Airport[], null>({
      query: () => ({url: Settings.AIRPORTS_PATH}),
    }),
    fetchFlights: builder.query<Flight[], string>({
      query: date => ({
        url: `${Settings.FLIGHTS_BY_DATE_PATH}`,
        params: {date: `${date}`},
      }),
    }),
    fetchFlightInfo: builder.query<Flight[] | ErrorResponse, number[]>({
      query: flight_id => ({
        url: `${Settings.INFO_FLIGHT}`,
        params: {flight_id: `${flight_id}`},
      }),
    }),
  }),
});

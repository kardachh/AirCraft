import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Settings from '../../settings';
import {Airport, ErrorResponse, Flight, Seat, SeatCheck} from '../types';

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
    fetchSeats: builder.query<Seat[], string>({
      query: aircraft_code => ({
        url: `${Settings.SEATS}`,
        params: {aircraft_code: aircraft_code},
      }),
    }),
    fetchAvailableSeat: builder.query<any, SeatCheck>({
      query: seat => ({
        url: `${Settings.CHECK_SEAT}`,
        params: {flight_id: seat.flight_id, seat_no: seat.seat_no},
      }),
    }),
  }),
});

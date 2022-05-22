import {createSlice} from '@reduxjs/toolkit';
import {Airport, Route} from '../types';
import moment from 'moment';

const onlineSlice = createSlice({
  name: 'online',
  initialState: {
    airports: <Airport[]>[],
    selectedAirport: <Airport | null>null,
    selectedDate: `${moment().format('YYYY-MM-DD')}`,
    favoritesFlights: <number[]>[],
    routes: <Route[]>[],
    fromCity: <Airport | null>null,
    toCity: <Airport | null>null,
  },
  reducers: {
    setAirports(state, action) {
      state.airports = action.payload;
    },
    setAirport(state, action) {
      state.selectedAirport = action.payload;
    },
    setDate(state, action) {
      state.selectedDate = action.payload.dateString;
    },
    setFavoritesFlights(state, action) {
      state.favoritesFlights = action.payload;
    },
    setRoutes(state, action) {
      state.routes = action.payload;
    },
    setFromCity(state, action) {
      state.fromCity = action.payload;
    },
    setToCity(state, action) {
      state.toCity = action.payload;
    },
  },
});

export default onlineSlice.reducer;
export const {
  setAirport,
  setAirports,
  setDate,
  setFavoritesFlights,
  setRoutes,
  setFromCity,
  setToCity,
} = onlineSlice.actions;

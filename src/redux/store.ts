import {createSlice} from '@reduxjs/toolkit';
import {Airport} from '../types';
import moment from 'moment';

const onlineSlice = createSlice({
  name: 'online',
  initialState: {
    airports: <Airport[]>[],
    selectedAirport: <Airport | null>null,
    selectedDate: `${moment().format('YYYY-MM-DD')}`,
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
  },
});

export default onlineSlice.reducer;
export const {setAirport, setAirports, setDate} = onlineSlice.actions;

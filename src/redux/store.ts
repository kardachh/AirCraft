import {createSlice} from '@reduxjs/toolkit';
import {Airport} from '../types';

const onlineSlice = createSlice({
  name: 'online',
  initialState: {
    airports: <Airport[]>[],
    selectedAirport: <Airport | null>null,
  },
  reducers: {
    setAirports(state, action) {
      state.airports = action.payload;
    },
    selectAirport(state, action) {
      state.selectedAirport = action.payload;
    },
  },
});

export default onlineSlice.reducer;
export const {selectAirport, setAirports} = onlineSlice.actions;

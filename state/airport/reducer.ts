import {AirportAction, AirportState, SelectAirportAction} from '../types';
import {AIRPORT_ACTION_TYPES} from './actions';

export const initialState: AirportState | null = null;

export const selectedAirport = (
  state: AirportState = initialState,
  action: AirportAction,
) => {
  const newState: AirportState = {...state!};
  switch (action.type) {
    case AIRPORT_ACTION_TYPES.SELECT_AIRPORT:
      const {airportData} = <SelectAirportAction>action;
      return airportData;
    default:
      console.log(newState);
      return newState;
  }
};

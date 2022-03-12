import {Airport, SelectAirportAction} from '../types';

export enum AIRPORT_ACTION_TYPES {
  SELECT_AIRPORT = 'AIRPORT/SELECT',
}

export const selectAirport = (airport: Airport): SelectAirportAction => ({
  type: AIRPORT_ACTION_TYPES.SELECT_AIRPORT,
  airportData: airport,
});

export type AppState = {
  selectedAirport: AirportState;
};

export type Airport = {
  airport_code: string;
  airport_name: string;
  city: string;
  longitude: number;
  latitude: number;
  timezone: string;
};

export type AirportState = Airport | null;

export type SelectAirportAction = {
  type: string;
  airportData: Airport;
};

export type AirportAction = SelectAirportAction;

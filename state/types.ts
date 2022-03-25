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

export type Flight = {
  flight_id: number;
  flight_no: string;
  scheduled_departure: string;
  scheduled_arrival: string;
  departure_airport: string;
  arrival_airport: string;
  status: string;
  aircraft_code: string;
  actual_departure: string | null;
  actual_arrival: string | null;
};

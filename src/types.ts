export type Airport = {
  airport_code: string;
  airport_name: string;
  city: string;
  longitude: number;
  latitude: number;
  timezone: string;
};

export type Seat = {
  aircraft_code: string;
  seat_no: string;
  fare_conditions: string;
};

export type SeatCheck = {
  flight_id: number;
  seat_no?: string;
};

export type Route = {
  flight_no: string;
  departure_airport: string;
  departure_airport_name: string;
  departure_city: string;
  arrival_airport: string;
  arrival_airport_name: string;
  arrival_city: string;
  aircraft_code: string;
  duration: {
    hours?: number;
    minutes?: number;
  };
  days_of_week: number[];
  scheduled_departure: string;
  scheduled_arrival: string;
};

export type Flight = {
  actual_arrival?: string;
  actual_arrival_local?: string;
  actual_departure?: string;
  actual_departure_local?: string;
  actual_duration?: {
    hours?: number;
    minutes?: number;
  };
  aircraft_code: string;
  arrival_airport: string;
  arrival_airport_name: string;
  arrival_city: string;
  departure_airport: string;
  departure_airport_name: string;
  departure_city: string;
  flight_id: number;
  flight_no: string;
  scheduled_arrival: string;
  scheduled_arrival_local: string;
  scheduled_departure: string;
  scheduled_departure_local: string;
  scheduled_duration: {
    hours?: number;
    minutes?: number;
  };
  status: string;
};

export type ErrorResponse = {
  type: string;
  msg: string;
  query: string;
};

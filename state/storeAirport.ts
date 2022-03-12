import {createStore} from 'redux';
import {selectedAirport} from './airport/reducer';

export const storeAirport = createStore(selectedAirport);

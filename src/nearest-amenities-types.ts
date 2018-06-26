import { Query } from 'react-apollo';
import { NearestAmenities } from './nearest-amenities-result-types';


type Coord = number | null;
export interface ICoordinates {
  lat: Coord,
  lon: Coord
};

export class NearestAmenitiesQuery extends Query<NearestAmenities, ICoordinates> {};

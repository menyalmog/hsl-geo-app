

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NearestAmenities
// ====================================================

export interface NearestAmenities_nearest_edges_node_place {
  __typename: "Stop" | "DepartureRow" | "BikeRentalStation" | "BikePark" | "CarPark";
  lat: number | null;
  lon: number | null;
}

export interface NearestAmenities_nearest_edges_node {
  __typename: "placeAtDistance";
  id: string;
  place: NearestAmenities_nearest_edges_node_place | null;
  distance: number | null;
}

export interface NearestAmenities_nearest_edges {
  __typename: "placeAtDistanceEdge";
  node: NearestAmenities_nearest_edges_node | null;  // The item at the end of the edge
}

export interface NearestAmenities_nearest {
  __typename: "placeAtDistanceConnection";
  edges: (NearestAmenities_nearest_edges | null)[] | null;
}

export interface NearestAmenities {
  nearest: NearestAmenities_nearest | null;  // Get all places (stops, stations, etc. with coordinates) within the specified radius from a location. The returned type has two fields place and distance. The search is done by walking so the distance is according to the network of walkables.
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
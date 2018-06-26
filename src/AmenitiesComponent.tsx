import { gql } from 'apollo-boost';
import * as React from 'react';
import { NearestAmenities_nearest_edges_node } from './nearest-amenities-result-types';
import { ICoordinates, NearestAmenitiesQuery } from './nearest-amenities-types';


interface IAmenitiesState {
  address: string | null,
  coordinates: ICoordinates | null,
  fetchingCoords: boolean,
  message: string | null
};

interface IButtonProps { disabled: boolean, onClick(e: React.MouseEvent<HTMLElement>): void };
interface IInputProps { onChange(e: React.ChangeEvent<HTMLInputElement>): void };

const Button: React.SFC<IButtonProps> = (props) => (
  <button {...props}>
    {props.children}
  </button>
);

const Input: React.SFC<IInputProps> = (props) => (
  <input {...props} />
);

const NEAREST_AMENITIES = gql`
  query NearestAmenities($lat: Float!, $lon: Float!) {
    nearest(lat: $lat, lon: $lon, filterByPlaceTypes: [STOP, BICYCLE_RENT, BIKE_PARK, CAR_PARK], maxResults: 50) {
      edges {
        node {
          id
          place {
            lat
            lon
          }
          distance
        }
      }
    }
  }
`;

const AmenityView = ({ amenity }: { amenity: NearestAmenities_nearest_edges_node }) => (
  <div>
    <div>
      {amenity.place!.__typename}
    </div>
    <div>
      {amenity.place!.lat}
      x
      {amenity.place!.lon}
    </div>
    <div>
      Distance: {amenity.distance}
    </div>
  </div>
);

const NearestAmenitiesList = ({ coordinates }: { coordinates: ICoordinates }) => (
  <NearestAmenitiesQuery query={NEAREST_AMENITIES} variables={coordinates}>
    {({ loading, error, data }) => {
      if (loading) {
        return <div>Loading...</div>;
      }
      if (error) {
        return <div>Error :( {error.message}</div>;
      }

      const { edges } = data!.nearest!;

      if (!edges || !edges.length) {
        return <div>It seems there's no amenities around.</div>;
      }

      return (
        <ul>
          {
            edges.map((edge: any) => {
              return (
                <li key={edge.node.id}>
                  <AmenityView amenity={edge.node} />
                </li>
              );
            })
          }
        </ul>
      );
    }}
  </NearestAmenitiesQuery>
)

const initialAmenitiesState: IAmenitiesState = {
  address: null,
  coordinates: null,
  fetchingCoords: false,
  message: null
};

class AmenitiesComponent extends React.Component<object, IAmenitiesState> {
  public readonly state: IAmenitiesState = initialAmenitiesState;

  public constructor(props: object) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.findAmenities = this.findAmenities.bind(this);
  }

  public handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
     this.setState({address: e.currentTarget.value});
  }

  public findAmenities() {
    this.setState({fetchingCoords: true});

    fetch(`https://api.digitransit.fi/geocoding/v1/search?text=${this.state.address}, Helsinky`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        const { features } = json;

        if (features.length) {
          const coords = features[0].geometry.coordinates;

          this.setState({
            coordinates: { lat: coords[1], lon: coords[0] },
            fetchingCoords: false
          });
        } else {
          this.setState({
            fetchingCoords: false,
            message: 'Address not found'
          });
        }
      }).catch(e => {
        this.setState({
          fetchingCoords: false,
          message: `Geocoding API call failed: ${e}`
        });
      });
  }

  public renderAddressForm() {
    const { address, coordinates, fetchingCoords } = this.state;

    if (!coordinates && !fetchingCoords) {
      return (
        <>
          <Input onChange={this.handleChange} />
          <Button disabled={!address} onClick={this.findAmenities}>
            Find Amenities
          </Button>
        </>
      );
    } else {
      return null;
    }
  }

  public render() {
    return (
      <>
        {this.renderAddressForm()}
        {this.state.fetchingCoords
          ? 'Fetching coordinates from API'
          : this.state.message}
        {this.state.coordinates
          ? <NearestAmenitiesList coordinates={this.state.coordinates} />
          : null}
      </>
    )
  }
}

export default AmenitiesComponent;

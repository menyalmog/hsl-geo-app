import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import AmenitiesComponent from './AmenitiesComponent';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('should mount without crashing', () => {
    expect(Enzyme.mount(<App/>).find('header').length).toBe(1);
  });

  it('should render <AmenitiesComponent /> component', () => {
    expect(Enzyme.shallow(<App />).contains(<AmenitiesComponent />)).toBe(true);
  });
});

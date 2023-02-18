import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '~screens/Home/Home';

test('HomeScreen', () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import Home from './Home';

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

test('renders correctly', () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});

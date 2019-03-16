import React from 'react';
import renderer from 'react-test-renderer';

import Navbar from '../src/components/navbar';

test('Navbar', () => {
  const component = renderer.create(
    <Navbar message='message' />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';

import Navbar from '../src/components/navbar';
import { testNameToKey } from 'jest-snapshot/build/utils';

test('Navbar', () => {
  const component = renderer.create(
    <Navbar message='message' />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapShot();
});

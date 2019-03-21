import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { configure, mount } from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';
configure({ adapter: new Adaptor() });

import Timeline from '../src/components/timeline';

describe('timeline', () => {
  it('render', () => {
    let component;
    act(() => {
      component = renderer.create(
        <Timeline />
      );
    });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import * as React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { configure, mount } from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';
configure({ adapter: new Adaptor() });

import Textbox from '../src/components/textbox';

let container;

beforeEach(() => {
  container = global.document.createElement('div');
  global.document.body.appendChild(container);
});

afterEach(() => {
  global.document.body.removeChild(container);
  container = null;
});

describe('Textbox', () => {
  it('render', () => {
    const setMessage = jest.fn(() => {});
    let component;
    act(() => {
      component = renderer.create(
        <Textbox setMessage={setMessage} />
      );
    });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('text change', () => {
    const setMessage = jest.fn(() => {});
    let wrapper;
    act(() => {
      wrapper = mount(
        <Textbox setMessage={setMessage} />,
        { attachTo: container },
      );
    });
    wrapper.update();
    expect(wrapper.find('textarea').get(0).props.value).toEqual('');

    let event = {
      target: {
        value: 'new value',
      },
    };
    act(() => {
      wrapper.find('textarea').simulate('change', event);
    });
    wrapper.update();
    expect(wrapper.find('textarea').get(0).props.value).toEqual('new value');
  });
});

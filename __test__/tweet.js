import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { configure, mount } from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';
configure({ adapter: new Adaptor() });

import Tweet from '../src/components/tweet';

const getUrls = (short_url) => {
  return {
    short_url,
    expanded_url: `${short_url}ToBeExpended`,
    display_url: `${short_url}ToBeDisplayed`,
    actual_url: `${short_url}ToBeActual`,
  };
};

const getTweetBase = () => {
  return {
    id: 0,
    tweet_url: 'tweet.url',
    created_at: '20190317-184720',
    user: {
      icon: 'user.icon',
      name: 'user.name',
      screen_name: 'user.screenName',
    },
  }
};

const getTweet = () => {
  return {
    ...getTweetBase(),
    text: 'default text',
    urls: [],
    media_urls: [],
    time: 0,
  };
};

let container;

beforeEach(() => {
  container = global.document.createElement('div');
  global.document.body.appendChild(container);
});

afterEach(() => {
  global.document.body.removeChild(container);
  container = null;
});

describe('Tweet', () => {
  it('render normal tweet', () => {
    const tweet = getTweet();
    let component;
    act(() => {
      component = renderer.create(
        <Tweet {...tweet} />
      );
    });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render retweet', () => {
    const tweet = getTweet();
    tweet.retweeter = getTweetBase();
    let component;
    act(() => {
      component = renderer.create(
        <Tweet {...tweet} />
      );
    });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render tweet with urls', () => {
    const tweet = getTweet();
    tweet.text = 'hoge url1 fuga url2 url3';
    tweet.urls = [
      getUrls('url1'),
      getUrls('url2'),
      getUrls('url3'),
    ];
    let component;
    act(() => {
      component = renderer.create(
        <Tweet {...tweet} />
      );
    });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render tweet with media', () => {
    const tweet = getTweet();
    tweet.text = 'hoge url1 fuga';
    tweet.media_urls = [
      getUrls('url1'),
      getUrls('url2'),
      getUrls('url3'),
    ];
    let component;
    act(() => {
      component = renderer.create(
        <Tweet {...tweet} />
      );
    });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

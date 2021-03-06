import * as React from 'react';
import { formatDate } from './util';

const renderRetweeter = (retweeter: ITweetBase | undefined) => {
  if (!retweeter) {
    return null;
  }

  const { tweet_url, created_at, user } = retweeter;
  const { icon, name, screen_name } = user;

  const createdAt = formatDate(new Date(created_at * 1000));

  return (
    <div className='retweeter'>
      <span className='rtby'>RTby</span>
      <span className='icon'>
        <img src={icon} />
      </span>
      <span className='name'>{name}</span>
      <span className='screenName'>@{screen_name}</span>
      <span className='createdAt'>
        <a target='_blank' href={tweet_url}>{createdAt}</a>
      </span>
    </div>
  );
};

const getRaw = (text: string): string => {
  return [
    { re: /&apos;/g, str: '\'' },
    { re: /&quot;/g, str: '"' },
    { re: /&gt;/g,   str: '>' },
    { re: /&lt;/g,   str: '<' },
    { re: /&amp;/g,  str: '&' },
  ].reduce((t, { re, str }) => t.replace(re, str), text);
};

const renderContent = (text: string, urls: IUrl[]) => {
  const contents: Array<string | JSX.Element> = [];
  const restText = urls.reduce((rest, url) => {
    const { short_url, expanded_url, display_url } = url;
    if (rest.indexOf(short_url) === -1 || !rest.length) {
      return rest;
    }
    const [head, tail] = rest.split(short_url);
    contents.push(head);
    contents.push(
      <a
        target='_blank'
        href={expanded_url}
        key={`link-${encodeURIComponent(expanded_url)}`}
      >
        {display_url}
      </a>,
    );
    return tail;
  }, getRaw(text));
  contents.push(restText);

  return <div className='text'>{contents}</div>;
};

const renderMedia = (media_urls: IUrl[]) => {
  const media = media_urls.map((media_url) => (
    <div className='medium' key={`media-${encodeURIComponent(media_url.actual_url)}`}>
      <img src={media_url.actual_url} />
    </div>
  ));
  return <div className='media'>{media}</div>;
};

export default (props: ITweet) => {
  const { id, timebase_id, text, tweet_url, created_at, user, retweeter, urls, media_urls, colorIndex } = props;
  const { icon, name, screen_name } = user;

  if (media_urls.length) {
    urls.push(media_urls[0]);
  }

  const createdAt = formatDate(new Date(created_at * 1000));

  return (
    <div className='tweet' data-id={id} data-timebase-id={timebase_id}>
      <div className='container'>
        <div className='icon'>
          <img src={icon} />
        </div>
        <div className='contents'>
          <div className='user'>
            <span className='name'>{name}</span>
            <span className='screenName'>@{screen_name}</span>
            <span className='createdAt'>
              <a target='_blank' href={tweet_url}>{createdAt}</a>
            </span>
          </div>
          {renderContent(text, urls)}
          {renderMedia(media_urls)}
          {renderRetweeter(retweeter)}
        </div>
      </div>
      <div className={`colorBar color-${colorIndex}`} />
    </div>
  );
};

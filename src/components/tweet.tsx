import * as React from "react";

const renderRetweeter = (retweeter: ITweet | undefined) => {
  if (!retweeter) {
    return null;
  }

  const { tweet_url, created_at, user } = retweeter;
  const { icon, name, screen_name } = user;

  return (
    <div className="retweeter">
      <span className="rtby">RTby</span>
      <span className="icon">
        <img src={icon} />
      </span>
      <span className="name">{name}</span>
      <span className="screenName">@{screen_name}</span>
      <span className="created_at">
        <a target="_blank" href={tweet_url}>{created_at}</a>
      </span>
    </div>
  );
};

const renderContent = (text: string, urls: IUrl[]) => {
  const contents: Array<string | JSX.Element> = [];
  contents.push(
    urls.reduce((rest, url) => {
      const { short_url, expanded_url, display_url } = url;
      if (rest.indexOf(short_url) === -1) {
        return rest;
      }
      const [head, tail] = rest.split(short_url);
      contents.push(head);
      contents.push(
        <a
          target="_blank"
          href={expanded_url}
          key={`link-${encodeURIComponent(expanded_url)}`}
        >{display_url}</a>
      );
      return tail;
    }, text)
  );
  return <div className="text">{contents}</div>;
};

const renderMedia = (media_urls: IUrl[]) => {
  const media = media_urls.map((media_url) => (
    <div className="medium" key={`media-${encodeURIComponent(media_url.actual_url)}`}>
      <img src={media_url.actual_url} />
    </div>
  ));
  return <div className="media">{media}</div>;
};

export default (props: ITweet) => {
  const { id, text, tweet_url, created_at, user, retweeter, urls, media_urls } = props;
  const { icon, name, screen_name } = user;

  if (media_urls.length) {
    urls.push(media_urls[0]);
  }

  return (
    <div className="tweet" data-id={retweeter ? retweeter.id : id}>
      <div className="icon">
        <img src={icon} />
      </div>
      <div className="contents">
        <div className="user">
          <span className="name">{name}</span>
          <span className="screenName">@{screen_name}</span>
          <span className="createdAt">
            <a target="_blank" href={tweet_url}>{created_at}</a>
          </span>
        </div>
        {renderContent(text, urls)}
        {renderMedia(media_urls)}
        {renderRetweeter(retweeter)}
      </div>
    </div>
  );
};

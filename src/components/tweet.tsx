import * as React from "react";

const renderRetweeter = (retweeter: ITweet | undefined) => {
  if (!retweeter) {
    return null;
  }

  const { id, tweet_url, created_at, user } = retweeter;
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

const replaceUrlToA = (text, urls) => {
  const contents = [];
  urls.reduce((restText, url) => {
    const { short_url, actual_url, display_url } = url;
    const [head, tail] = text.split(short_url);
    contents.push(head);
    contents.push(
      <a target="_blank" href={actual_url}">{display_uri}</a>
    );
    return tail;
  });
};

export default (props: ITweet) => {
  const { id, text, tweet_url, created_at, user, retweeter, urls, media_urls } = props;
  const { icon, name, screen_name } = user;

  const content = replaceUrlToA(text, urls);

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
        <div className="text">{content}</div>
        <div className="media">
          {media_urls.map((media_url) =>
            <div className="medium">
              <img src={media_url} />
            </div>
          )}
        </div>
        {renderRetweeter(retweeter)}
      </div>
    </div>
  );
};

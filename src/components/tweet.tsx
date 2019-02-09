import * as React from "react";

export default () => {
  return (
    <div className="tweet" data-id="<%= tweet[:retweeter] ? tweet[:retweeter][:id] : tweet[:id] %>">
      <div className="icon">
        <img src="<%= tweet[:user][:icon] %>" />
      </div>
      <div className="contents">
        <div className="user">
          <span className="name">
            {/* <%= tweet[:user][:name] %> */}
          </span>
          <span className="screenName">
            {/* @<%= tweet[:user][:screen_name] %> */}
          </span>
          <span className="createdAt">
            <a target="_blank" href="<%= tweet[:tweet_url] %>">
              {/* <%= tweet[:created_at] %> */}
            </a>
          </span>
        </div>
        <div className="text">
          {/* <%= tweet[:text] %> */}
        </div>
        <div className="media">
          {/* <% tweet[:media_urls].each do |media_url| %> */}
            <div className="medium">
              <img src="<%= media_url %>" />
            </div>
          {/* <% end %> */}
        </div>
        {/* <% if tweet[:retweeter] %> */}
          <div className="retweeter">
            <span className="rtby">RTby</span>
            <span className="icon">
              <img src="<%= tweet[:retweeter][:user][:icon] %>" />
            </span>
            <span className="name">
              {/* <%= tweet[:retweeter][:user][:name] %> */}
            </span>
            <span className="screenName">
              {/* @<%= tweet[:retweeter][:user][:screen_name] %> */}
            </span>
            <span className="created_at">
              <a target="_blank" href="<%= tweet[:retweeter][:tweet_url] %>">
                {/* <%= tweet[:retweeter][:created_at] %> */}
              </a>
            </span>
          </div>
        {/* <% end %> */}
      </div>
    </div>
  );
};

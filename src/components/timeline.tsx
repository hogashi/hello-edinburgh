import Axios from 'axios';
import * as React from 'react';
import Tweet from './tweet';

const { useState, useEffect, useCallback } = React;

const loadTimeline = (sinceId: number): Promise<{ time: number, tweets: ITweet[] }> => {
  console.log(`loading timeline, sinceId: ${sinceId}`);
  const time = new Date().getTime();
  return Axios.get(`/api/home_timeline?since_id=${sinceId || ''}`)
  .then((res) => {
    console.log(res);
    if (!res) {
      throw new Error('empty response');
    }
    return {
      time,
      tweets: res.data as ITweet[],
    };
  })
  .catch((err) => {
    console.log(err, err.response, err.response ? err.response.data : '');
    return {
      time,
      tweets: [] as ITweet[],
    };
  });
};

export default () => {
  const [isActive, setIsActive] = useState(true);
  const [second, setSecond] = useState(0);
  const [tweets, setTweets] = useState([] as ITweet[]);

  const renderTweets = useCallback(() => {
    return tweets.map((tweet) => {
      return <Tweet key={`${tweet.id}-${tweet.time}`} {...tweet} />;
    });
  }, [tweets]);

  useEffect(() => {
    if (!isActive) {
      return;
    }
    const timer = setInterval(() => {
      setSecond((sec) => {
        if (sec > 0) {
          return sec - 1;
        }
        const sinceId = tweets[0] ? tweets[0].id : 0;
        loadTimeline(sinceId).then((res) => {
          const time = res.time;
          const newTweets = res.tweets.map((newTweet) => {
            newTweet.time = time;
            return newTweet;
          });
          setTweets([...newTweets, ...tweets]);
        });
        return 60;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [tweets, isActive]);

  return (
    <div id='timeline'>
      <p>reload in: <span id='second'>{second}</span></p>
      <button onClick={() => setIsActive(!isActive)}>toggle</button>
      <div id='tweets'>
        {renderTweets()}
      </div>
    </div>
  );
};

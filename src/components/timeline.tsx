import Axios from 'axios';
import * as React from 'react';
import Tweet from './tweet';

const { useState, useEffect, useCallback } = React;

const DURALATION = 60;

const loadTimeline = (sinceId: string): Promise<ITweet[]> => {
  console.log(`loading timeline, sinceId: ${sinceId}.`);
  return Axios.get(`/api/home_timeline?since_id=${sinceId}`)
  .then((res) => {
    console.log(res);
    if (!res) {
      throw new Error('response is empty');
    }
    return res.data as ITweet[];
  })
  .catch((err) => {
    console.log(err, err.response, err.response ? err.response.data : null);
    return [] as ITweet[];
  });
};

export default () => {
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [second, setSecond] = useState(DURALATION);
  const [tweets, setTweets] = useState([] as ITweet[]);

  const renderTweets = useCallback(() => {
    return tweets.map((tweet) => {
      return <Tweet key={`${tweet.timebase_id}-${tweet.loaded_at}`} {...tweet} />;
    });
  }, [tweets]);

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    const sinceId = tweets[0] ? tweets[0].timebase_id : '';
    loadTimeline(sinceId).then((newTweets) => {
      setTweets([...newTweets, ...tweets]);
      setIsLoading(false);
    });
  }, [isLoading]);

  useEffect(() => {
    if (!isActive) {
      return;
    }
    const timer = setInterval(() => {
      setSecond((sec) => {
        if (sec > 0) {
          return sec - 1;
        }
        setIsLoading(true);
        return DURALATION;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [isActive]);

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

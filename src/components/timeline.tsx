import Axios from 'axios';
import * as React from 'react';
import Tweet from './tweet';

const { useState, useEffect } = React;

const loadTimeline = (sinceId: number) => {
  console.log(`loading timeline, sinceId: ${sinceId}`);
  return Axios.get(`/api/home_timeline?since_id=${sinceId || ''}`)
  .then((res) => {
    console.log(res);
    if (!res) {
      return [] as ITweet[];
    }
    return res.data as ITweet[];
  })
  .catch((err) => {
    console.log(err, err.response, err.response ? err.response.data : '');
    return [] as ITweet[];
  });
};

export default () => {
  const [isActive, setIsActive] = useState(true);
  const [second, setSecond] = useState(0);
  const [tweets, setTweets] = useState([] as ITweet[]);
  const [timer, setTimer] = useState(setTimeout(() => null, 1));

  const renderTweets = (): JSX.Element[] => {
    const time = new Date().getTime();
    return tweets.map((tweet) => {
      return <Tweet key={`${tweet.id}-${time}`} {...tweet} />;
    });
  };

  const toggleTimer = () => {
    if (isActive) {
      clearTimeout(timer);
      setIsActive(false);
      return;
    }
    setIsActive(true);
  };

  useEffect(() => {
    if (isActive) {
      setTimer(setTimeout(() => {
        setSecond((sec) => {
          const newSec = sec - 1;
          if (newSec >= 0) {
            return newSec;
          }
          const sinceId = tweets[0] ? tweets[0].id : 0;
          loadTimeline(sinceId).then((newTweets: ITweet[]) => {
            setTweets([...newTweets, ...tweets]);
          });
          return 60;
        });
      }, 1000));
    }
    return () => clearTimeout(timer);
  }, [second, isActive]);

  return (
    <div id='timeline'>
      <p>reload in: <span id='second'>{second}</span></p>
      <button onClick={toggleTimer}>toggle</button>
      <div id='tweets'>
        {renderTweets()}
      </div>
    </div>
  );
};

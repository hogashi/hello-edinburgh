import Axios from 'axios';
import * as React from 'react';
import Tweet from './tweet';
import { formatDate } from './util';

const { useState, useEffect, useCallback } = React;

const DURALATION = 60;
const COLOR_NUMBER = 6;

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

interface IProps {
  setMessage: (message: string) => void;
}

export default ({ setMessage }: IProps) => {
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [second, setSecond] = useState(DURALATION);
  const [tweets, setTweets] = useState([] as ITweet[]);
  const [colorIndex, setColorIndex] = useState(0);

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
    loadTimeline(sinceId).then((res) => {
      setIsLoading(false);
      const newTweets = res.map((tweet) => {
        tweet.colorIndex = colorIndex;
        return tweet;
      });
      setTweets([...newTweets, ...tweets]);
      if (newTweets.length !== 0) {
        // 新しいツイートがあったときだけ色を進める
        setColorIndex((colorIndex + 1) % COLOR_NUMBER);
      }
      setMessage(`${newTweets.length} tweets loaded at ${formatDate(new Date())}`);
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

  const barStyle = {
    // 待ち時間のバーをcss transitionでアニメーションする
    // - 100%が最大だと、0->60秒に回復するあたりで回復しきらないので、
    //   103%を最大にして計算する(cssでmax-width: 100%する)
    // - 指定した値になるまでに1秒かかるので、
    //   1秒先の値を指定することで見える量を現在値に近づけるために
    //   DURALATION + 1で剰余をとる
    width: `${Math.floor(103.0 * ((DURALATION + second) % (DURALATION + 1)) / DURALATION * 10.0) / 10.0}%`,
  };

  return (
    <div id='timeline'>
      <div className='indicators'>
        <div className='waitBar' style={barStyle} data-second={second} />
        <div className='buttons'>
          <button onClick={() => setIsActive(!isActive)}>toggle</button>
          <button onClick={() => setTweets([] as ITweet[])}>clear</button>
        </div>
      </div>
      <div id='tweets'>
        {renderTweets()}
      </div>
    </div>
  );
};

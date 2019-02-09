import * as React from "react";
import Tweet from "./tweet";

const { useState, useEffect } = React;

const renderTweets = (): JSX.Element[] => {
  return [
    <Tweet key="a" />,
    <Tweet key="b" />,
    <Tweet key="c" />,
  ];
};

export default () => {
  const [second, setSecond] = useState(60);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSecond((sec) => {
        const newSec = sec - 1;
        if (newSec >= 0) {
          return newSec;
        }
        // loadTimeline();
        return 60;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [second]);

  return (
    <div id="timeline">
      <p>reload in: <span id="second">{second}</span></p>
      <div id="tweets">
        {renderTweets()}
      </div>
    </div>
  );
};

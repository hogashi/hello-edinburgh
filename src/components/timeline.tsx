import * as React from "react";
import Tweet from "./tweet";

interface IProps {
   name: string;
}

export default class Timeline extends React.PureComponent<IProps> {
  public render() {
    return (
      <div className="timeline">
        {this.renderTweets()}
      </div>
    );
  }

  private renderTweets() {
    return [
      <Tweet key="a" name="tweet" />,
      <Tweet key="b" name="tweet" />,
      <Tweet key="c" name="tweet" />,
    ];
  }
}

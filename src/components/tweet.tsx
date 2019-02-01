import * as React from "react";

interface IProps {
   name: string;
}

export default class Tweet extends React.PureComponent<IProps> {
  public render() {
    return <div>Hello {this.props.name}</div>;
  }
}

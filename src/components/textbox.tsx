import * as React from "react";

interface IProps {
   name: string;
}

export default class Textbox extends React.PureComponent<IProps> {
  public render() {
    return <div className="textbox">Hi {this.props.name}</div>;
  }
}

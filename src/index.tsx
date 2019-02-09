import * as React from "react";
import * as ReactDOM from "react-dom";
import Textbox from "./components/textbox";
import Timeline from "./components/timeline";
import * as serviceWorker from "./serviceWorker";

import "./index.scss";

interface IProps {
   name: string;
}

class App extends React.PureComponent<IProps> {
  public render() {
    return (
      <div>
        <Textbox name="textbox" />
        <Timeline name="timeline" />
      </div>
    );
  }
}

const appElement = document.getElementById("app");
ReactDOM.render(<App name="Jane" />, appElement);

import * as React from "react";

export default () => {
  return (
    <nav>
      <div>
        <a href="/" className="home">Edinburgh</a>
        <a href="/timeline" className="timeline">timeline</a>
      </div>
      <div>
        <a href="/auth/twitter">login</a>
        <a href="/logout">logout</a>
      </div>
    </nav>
  );
};

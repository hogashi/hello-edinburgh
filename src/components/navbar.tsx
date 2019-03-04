import * as React from "react";

export default () => {
  return (
    <nav>
      <div>
        <a href="/" className="home">Edinburgh</a>
      </div>
      <div>
        <a href="/auth/twitter">login</a>
        <a href="/logout">logout</a>
      </div>
    </nav>
  );
};

import Axios from "axios";
import * as React from "react";

const { useState, useMemo, useCallback } = React;

export default () => {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const doTweet = useCallback(() => {
    console.log(text);
    if (!text.trim().length) {
      return;
    }
    const encodedText = encodeURIComponent(text.trim());
    // Axios.post('/tweet', {
    //   hoge: 123,
    //   text: text,
    // })
    Axios.get(`/api/tweet?text=${encodedText}`)
    .then((res) => {
      console.log(res);
      if (res.data !== "ng") {
        setText("");
      }
      setMessage(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [text]);

  // if (!loggedIn) {
  //   return (
  //     <div>
  //       <a href="/auth/twitter">login</a>
  //     </div>
  //   );
  // }

  const placeholder = "geo info \"from Edinburgh, Scotland, United Kingdom\" goes with";

  return (
    <div>
      <textarea
        id="text"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        id="goButton"
        onClick={doTweet}>
        Tw
      </button>
      <p id="message">{message}</p>
    </div>
  );
};

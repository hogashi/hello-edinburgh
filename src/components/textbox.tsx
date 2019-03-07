import Axios from "axios";
import * as React from "react";

const { useState, useMemo, useCallback } = React;

const LINE_HEIGHT_EM = 1.4;
const PADDING_TOP_BOTTOM_PX = 3;
const BORDER_PX = 1;

const calcHeight = (lineNum: number) => {
  return [
    'calc(',
    `  ${LINE_HEIGHT_EM * lineNum}em + `,
    `  ${PADDING_TOP_BOTTOM_PX * 2}px + `,
    `  ${BORDER_PX * 2}px`,
    ')',
  ].join('');
};

interface IProps {
  setMessage: (message: string) => void;
}

export default ({ setMessage }: IProps) => {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [text, setText] = useState("");
  const [height, setHeight] = useState(calcHeight(1));

  const onTextChange = useCallback((newText: string) => {
    setText(newText);
    const lineNum = `${newText}\n`.match(/\n/g)!.length;
    const newHeight = calcHeight(lineNum);
    setHeight(newHeight);
  }, [text]);

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
    <div id="textBox">
      <textarea
        id="text"
        style={{ height }}
        placeholder={placeholder}
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
      />
      <button
        id="goButton"
        onClick={doTweet}
      >Tw</button>
    </div>
  );
};

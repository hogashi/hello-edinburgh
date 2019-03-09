import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Navbar from './components/navbar';
import Textbox from './components/textbox';
import Timeline from './components/timeline';
import * as serviceWorker from './serviceWorker';

import './index.scss';

const { useState } = React;

export const App = () => {
  const [message, setMessage] = useState('');

  return (
    <div>
      <Navbar message={message} />
      <Textbox setMessage={setMessage} />
      <Timeline />
    </div>
  );
};

const appElement = document.getElementById('app');
ReactDOM.render(<App />, appElement);

serviceWorker.register();

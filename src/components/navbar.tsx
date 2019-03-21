import * as React from 'react';

interface IProps {
  message: string;
}

export default ({ message }: IProps) => {
  return (
    <nav>
      <div>
        <a href='/' className='home'>Edinburgh</a>
      </div>
      <div id='message'>{message}</div>
      <div>
        <a href='/auth/twitter'>login</a>
        <a href='/logout'>logout</a>
      </div>
    </nav>
  );
};

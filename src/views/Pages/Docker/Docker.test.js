import React from 'react';
import ReactDOM from 'react-dom';
import Docker from './Docker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Docker />, div);
  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';
import ReactDOM from 'react-dom';
import NodeRED from './NodeRED';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NodeRED />, div);
  ReactDOM.unmountComponentAtNode(div);
});

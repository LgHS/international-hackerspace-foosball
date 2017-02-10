require('file-loader?name=[name].[ext]!../index.html');

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello Word</h1>,
  document.getElementById('root')
);
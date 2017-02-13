require('file-loader?name=[name].[ext]!../index.html');
require('../styles/main.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import Intro from './views/intro';
import Play from './views/play';

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Intro} />
      <Route path="play" component={Play} />
    </Route>
  </Router>,
  document.getElementById('root')
);
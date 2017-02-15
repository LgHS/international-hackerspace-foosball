require('file-loader?name=[name].[ext]!../index.html');
require('../styles/main.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import Intro from './views/intro';
import Play from './views/play';
import store from './store';

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Intro} />
        <Route path="play" component={Play} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
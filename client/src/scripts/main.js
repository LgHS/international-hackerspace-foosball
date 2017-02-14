require('file-loader?name=[name].[ext]!../index.html');
require('../styles/main.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import reducers from './reducers';
import Intro from './views/intro';
import Play from './views/play';

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Play} />
        <Route path="play" component={Play} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
require('file-loader?name=[name].[ext]!../index.html');
require('../styles/main.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import Intro from './views/intro';
import Select from './views/select';
import Create from './views/create';
import Play from './views/play';
import Winning from './views/winning';

import store from './store';

import audio from './audio';

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
        <Route path="select" component={Select} />
        <Route path="create" component={Create} />
        <Route path="play" component={Play} />
        <Route path="winning" component={Winning} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);